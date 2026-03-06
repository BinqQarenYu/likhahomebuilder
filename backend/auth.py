import os
import secrets
import logging
from fastapi import Header, HTTPException, status

logger = logging.getLogger(__name__)

# Generate a secure random token if not provided in environment
# This is more secure than a hardcoded default string
ADMIN_TOKEN = os.getenv("ADMIN_SECRET_TOKEN")
if not ADMIN_TOKEN:
    ADMIN_TOKEN = secrets.token_urlsafe(32)
    logger.warning("ADMIN_SECRET_TOKEN not set in environment. A random token has been generated for this session.")

def verify_admin_token(x_admin_token: str = Header(None)):
    """
    Verify the admin token provided in the X-Admin-Token header.
    Uses secrets.compare_digest to prevent timing attacks.
    """
    if not x_admin_token or not secrets.compare_digest(x_admin_token, ADMIN_TOKEN):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Invalid or missing admin token"
        )
    return x_admin_token
