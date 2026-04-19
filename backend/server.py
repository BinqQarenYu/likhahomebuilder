import logging
import os
import time
from collections import defaultdict
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, Request, Response
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.cors import CORSMiddleware

from database import close_db_connection, init_db
from routes import contact, newsletter, purchase

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handle application lifespan events.
    ⚡ Bolt Optimization: Initialize database indexes on startup for faster queries.
    """
    try:
        await init_db()
        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")

    yield

    close_db_connection()
    logger.info("Database connection closed.")

# Create the main app
app = FastAPI(
    title="Likha Home Builders API",
    version="1.0.0",
    lifespan=lifespan
)

# ⚡ Bolt Optimization: Add GZip compression for responses > 500 bytes
app.add_middleware(GZipMiddleware, minimum_size=500)

# ⚡ Bolt Optimization: Efficient Rate Limiting
# Simple rate limit: 5 requests per minute per IP for sensitive POST endpoints
RATE_LIMIT = 5
RATE_LIMIT_PERIOD = 60
ip_tracker = defaultdict(list)
last_cleanup_time = time.time()

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        global last_cleanup_time

        if request.method == "POST" and request.url.path in ["/api/contact", "/api/newsletter", "/api/purchase"]:
            client_ip = request.client.host if request.client else "unknown"
            current_time = time.time()

            # Clean up old timestamps for this IP
            ip_tracker[client_ip] = [t for t in ip_tracker[client_ip] if current_time - t < RATE_LIMIT_PERIOD]

            if len(ip_tracker[client_ip]) >= RATE_LIMIT:
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Too many requests. Please try again later."}
                )

            ip_tracker[client_ip].append(current_time)

            # ⚡ Bolt Optimization: Periodically clean up the tracker to prevent memory leaks
            # We only run global cleanup every 10 minutes OR if the tracker grows too large,
            # avoiding expensive O(N) dict scans on every request.
            if current_time - last_cleanup_time > 600 or len(ip_tracker) > 2000:
                keys_to_delete = [
                    ip for ip, timestamps in ip_tracker.items()
                    if not [t for t in timestamps if current_time - t < RATE_LIMIT_PERIOD]
                ]
                for key in keys_to_delete:
                    del ip_tracker[key]
                last_cleanup_time = current_time

        return await call_next(request)

app.add_middleware(RateLimitMiddleware)

# 🛡️ Sentinel + Bolt: Optimized Security Headers Middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:; "
            "connect-src 'self' https:;"
        )
        return response

app.add_middleware(SecurityHeadersMiddleware)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {
        "message": "Likha Home Builders API",
        "status": "active",
        "version": "1.0.0",
    }

# Include routers
api_router.include_router(contact.router)
api_router.include_router(newsletter.router)
api_router.include_router(purchase.router)

# Include the router in the main app
app.include_router(api_router)

# ⚡ Bolt Optimization: Cache static files for long-term browser storage
class CachedStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope: dict) -> Response:
        response = await super().get_response(path, scope)
        if response.status_code == 200:
            response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
        return response

# Mount static files for carousel images
carousel_dir = ROOT_DIR.parent / "frontend" / "public" / "carousel"
if carousel_dir.exists():
    app.mount(
        "/carousel", CachedStaticFiles(directory=str(carousel_dir)), name="carousel"
    )

# Configure CORS
allowed_origins_str = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
)
allowed_origins = [
    origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)
