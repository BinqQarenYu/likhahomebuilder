import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logger = logging.getLogger(__name__)

# MongoDB connection with safe fallbacks
mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017")
db_name = os.getenv("DB_NAME", "likha_db")

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]


async def get_database():
    """Get database instance"""
    return db


async def init_db():
    """Initialize database indexes"""
    try:
        # Contacts indexes
        await db.contacts.create_index([("created_at", DESCENDING)])

        # Newsletter subscribers indexes
        await db.newsletter_subscribers.create_index(
            [("email", ASCENDING)], unique=True
        )
        await db.newsletter_subscribers.create_index([("subscribed_at", DESCENDING)])

        # Purchase inquiries indexes
        await db.purchase_inquiries.create_index([("created_at", DESCENDING)])

        logger.info("Database indexes initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database indexes: {e}")


def close_db_connection():
    """Close database connection"""
    client.close()
    logger.info("Database connection closed")
