import os
import secrets
import logging
from fastapi import Header, HTTPException, status

logger = logging.getLogger(__name__)

# Generate a random token at startup if not provided in environment
# This ensures that even if someone forgets to set the environment variable,
# it won't use a known default value.
ADMIN_SECRET_TOKEN = os.getenv("ADMIN_SECRET_TOKEN")
if not ADMIN_SECRET_TOKEN:
    ADMIN_SECRET_TOKEN = secrets.token_urlsafe(32)
    logger.warning("ADMIN_SECRET_TOKEN not set in environment. Generating a random token for this session.")

def verify_admin_token(x_admin_token: str = Header(None)):
    """
    Verify the admin token provided in the X-Admin-Token header.
    Uses secrets.compare_digest to prevent timing attacks.
    """
    if not x_admin_token or not secrets.compare_digest(x_admin_token, ADMIN_SECRET_TOKEN):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Invalid or missing admin token"
        )
    return x_admin_token
