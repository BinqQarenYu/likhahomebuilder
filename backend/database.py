from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import pymongo

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]


async def init_db_indexes():
    """Initialize database indexes for performance optimization"""
    # Create indexes for newsletter subscribers
    await db.newsletter_subscribers.create_index(
        [("email", pymongo.ASCENDING)], unique=True
    )
    await db.newsletter_subscribers.create_index(
        [("subscribed_at", pymongo.DESCENDING)]
    )

    # Create indexes for contacts
    await db.contacts.create_index([("created_at", pymongo.DESCENDING)])

    # Create indexes for purchase inquiries
    await db.purchase_inquiries.create_index([("created_at", pymongo.DESCENDING)])


async def get_database():
    """Get database instance"""
    return db


def close_db_connection():
    """Close database connection"""
    client.close()
