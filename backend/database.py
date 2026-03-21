import logging
import os
from pathlib import Path

import pymongo
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]


async def get_database():
    """Get database instance"""
    return db


async def init_db():
    """Initialize database indexes for performance and constraints."""
    logger = logging.getLogger(__name__)
    try:
        # Newsletter subscribers: unique email and sorted by date
        await db.newsletter_subscribers.create_index("email", unique=True)
        await db.newsletter_subscribers.create_index(
            [("subscribed_at", pymongo.DESCENDING)]
        )

        # Contacts and purchase inquiries: sorted by date for admin dashboard
        await db.contacts.create_index([("created_at", pymongo.DESCENDING)])
        await db.purchase_inquiries.create_index([("created_at", pymongo.DESCENDING)])

        logger.info("Database indexes initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database indexes: {str(e)}")


def close_db_connection():
    """Close database connection"""
    client.close()
