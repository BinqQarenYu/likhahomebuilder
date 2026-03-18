import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

logger = logging.getLogger(__name__)


async def get_database():
    """Get database instance"""
    return db


async def init_db():
    """
    Initialize database indexes to optimize query performance and ensure data integrity.
    This helps avoid O(n) collection scans for sorted queries and enforces unique emails for newsletter.
    """
    try:
        # Newsletter subscribers indexes
        await db.newsletter_subscribers.create_index("email", unique=True)
        await db.newsletter_subscribers.create_index([("subscribed_at", -1)])

        # Contact form indexes
        await db.contacts.create_index([("created_at", -1)])

        # Purchase inquiry indexes
        await db.purchase_inquiries.create_index([("created_at", -1)])

        logger.info("Database indexes initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database indexes: {e}")


def close_db_connection():
    """Close database connection"""
    client.close()
