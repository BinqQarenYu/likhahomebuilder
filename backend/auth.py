import os
import secrets
import uuid

from fastapi import Header, HTTPException, status

# Generate a random fallback token once at startup to ensure the system
# fails securely if ADMIN_SECRET_TOKEN is not configured.
FALLBACK_TOKEN = str(uuid.uuid4())


def verify_admin_token(x_admin_token: str = Header(None)):
    """
    Verify the admin token provided in the X-Admin-Token header.
    Uses secrets.compare_digest to prevent timing attacks.
    """
    admin_token = os.getenv("ADMIN_SECRET_TOKEN", FALLBACK_TOKEN)

    if not x_admin_token or not secrets.compare_digest(x_admin_token, admin_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Invalid or missing admin token",
        )
    return x_admin_token
