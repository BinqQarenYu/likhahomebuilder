import os
import secrets
import logging
from fastapi import Header, HTTPException, status

logger = logging.getLogger(__name__)

# Generate a unique random token for this session if not provided in environment
# This prevents unauthorized access via a known default token
_runtime_admin_token = os.getenv("ADMIN_SECRET_TOKEN")
if not _runtime_admin_token:
    _runtime_admin_token = secrets.token_urlsafe(32)
    logger.warning("ADMIN_SECRET_TOKEN not set in environment. Using a randomly generated token for this session.")

def verify_admin_token(x_admin_token: str = Header(None)):
    """
    Verify the admin token provided in the X-Admin-Token header.
    Uses secrets.compare_digest to prevent timing attacks.
    """
    if not x_admin_token or not secrets.compare_digest(x_admin_token, _runtime_admin_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Invalid or missing admin token"
        )
    return x_admin_token
