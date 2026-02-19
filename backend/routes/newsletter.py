from fastapi import APIRouter, HTTPException, status
from typing import List
import logging
from models import NewsletterSubscriber, NewsletterSubscriberCreate
from database import get_database

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/newsletter", tags=["newsletter"])


@router.post("", response_model=NewsletterSubscriber, status_code=status.HTTP_201_CREATED)
async def subscribe_newsletter(subscriber_data: NewsletterSubscriberCreate):
    """
    Subscribe to newsletter
    """
    try:
        db = await get_database()
        
        # Check if email already exists
        existing = await db.newsletter_subscribers.find_one(
            {"email": subscriber_data.email}
        )
        
        if existing:
            # If exists but inactive, reactivate
            if not existing.get("is_active", False):
                await db.newsletter_subscribers.update_one(
                    {"email": subscriber_data.email},
                    {"$set": {"is_active": True}}
                )
                return NewsletterSubscriber(**existing)
            
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already subscribed to newsletter"
            )
        
        # Create new subscriber
        subscriber = NewsletterSubscriber(**subscriber_data.dict())
        
        # Insert into database
        result = await db.newsletter_subscribers.insert_one(subscriber.dict())
        
        if not result.inserted_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to subscribe to newsletter"
            )
        
        logger.info(f"New newsletter subscriber: {subscriber.email}")
        return subscriber
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to subscribe to newsletter"
        )


@router.get("", response_model=List[NewsletterSubscriber])
async def get_all_subscribers():
    """
    Get all newsletter subscribers (Admin endpoint)
    """
    try:
        db = await get_database()
        subscribers = await db.newsletter_subscribers.find(
            {"is_active": True}
        ).sort("subscribed_at", -1).to_list(1000)
        
        return [NewsletterSubscriber(**sub) for sub in subscribers]
    
    except Exception as e:
        logger.error(f"Error fetching subscribers: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch subscribers"
        )