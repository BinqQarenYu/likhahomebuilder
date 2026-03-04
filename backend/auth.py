import os
import secrets
from fastapi import Header, HTTPException, status

def verify_admin_token(x_admin_token: str = Header(None)):
    """
    Verify the admin token provided in the X-Admin-Token header.
    Uses secrets.compare_digest to prevent timing attacks.
    """
    admin_token = os.getenv("ADMIN_SECRET_TOKEN", "default_secret_token_change_me")

    if not x_admin_token or not secrets.compare_digest(x_admin_token, admin_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Invalid or missing admin token"
        )
    return x_admin_token
