import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, Request, Response
# Import routes
from routes import contact, newsletter, purchase
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Create the main app without a prefix
app = FastAPI(title="Likha Home Builders API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Health check endpoint
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


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Strict-Transport-Security"] = (
            "max-age=31536000; includeSubDomains"
        )
        # Content Security Policy - basic version
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.facebook.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data: https://images.unsplash.com https://images.pexels.com https://via.placeholder.com; "
            "frame-src https://www.facebook.com; "
            "connect-src 'self' http://localhost:8000 http://127.0.0.1:8000;"
        )
        return response


# Add security headers middleware
app.add_middleware(SecurityHeadersMiddleware)

# Configure CORS - Get from environment variable or use defaults
# In production, ALLOWED_ORIGINS should be set in the .env file
# e.g., ALLOWED_ORIGINS=https://yourdomain.com
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

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    from database import close_db_connection

    close_db_connection()
