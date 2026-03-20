import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import Response

# Configure logging at the top to catch initialization errors
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Import database functions
from database import close_db_connection, init_db
# Import routes
from routes import contact, newsletter, purchase

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager for the FastAPI app"""
    # Startup actions
    logger.info("Starting up: initializing database...")
    await init_db()
    yield
    # Shutdown actions
    logger.info("Shutting down: closing database connection...")
    close_db_connection()


# Create the main app without a prefix
app = FastAPI(title="Likha Home Builders API", version="1.0.0", lifespan=lifespan)

# Add GZip compression middleware (optimized for payloads > 500 bytes)
app.add_middleware(GZipMiddleware, minimum_size=500)

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
