import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware

# Import routes
from routes import contact, newsletter, purchase

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

# Configure CORS - Get from environment variable or use defaults
# In production, ALLOWED_ORIGINS should be set in the .env file
# e.g., ALLOWED_ORIGINS=https://yourdomain.com
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_db_client():
    import pymongo

    from database import get_database

    db = await get_database()
    # ⚡ Bolt: Add indexes for performance optimization
    # email index makes subscribe upsert O(1) instead of O(n) scan
    await db.newsletter_subscribers.create_index("email", unique=True)
    # sort indexes speed up admin dashboard queries
    await db.newsletter_subscribers.create_index([("subscribed_at", pymongo.DESCENDING)])
    await db.contacts.create_index([("created_at", pymongo.DESCENDING)])
    await db.purchase_inquiries.create_index([("created_at", pymongo.DESCENDING)])


@app.on_event("shutdown")
async def shutdown_db_client():
    from database import close_db_connection

    close_db_connection()
