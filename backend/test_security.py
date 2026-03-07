import os
import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch, AsyncMock

# Set environment variables for testing
os.environ["MONGO_URL"] = "mongodb://localhost:27017"
os.environ["DB_NAME"] = "test_db"

# Mock database before importing app
mock_db = MagicMock()
mock_db.contacts.find.return_value.sort.return_value.to_list = AsyncMock(return_value=[])

with patch('motor.motor_asyncio.AsyncIOMotorClient', return_value=MagicMock()):
    with patch('database.get_database', AsyncMock(return_value=mock_db)):
        from server import app

client = TestClient(app)

def test_security_headers():
    """Verify that security headers are present"""
    response = client.get("/api/")
    assert response.status_code == 200

    # These are currently likely missing
    assert "X-Content-Type-Options" in response.headers
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert "X-Frame-Options" in response.headers
    assert response.headers["X-Frame-Options"] in ["DENY", "SAMEORIGIN"]
    assert "Referrer-Policy" in response.headers
    assert "Content-Security-Policy" in response.headers

def test_admin_token_security():
    """Verify that default admin token is NOT usable if not explicitly set"""
    # Ensure environment variable is NOT set
    if "ADMIN_SECRET_TOKEN" in os.environ:
        del os.environ["ADMIN_SECRET_TOKEN"]

    # Try to use the known insecure default token
    default_token = "default_secret_token_change_me"
    response = client.get("/api/contact", headers={"X-Admin-Token": default_token})

    # If it returns 200, it means the default token worked! (VULNERABLE)
    # If it returns 401, it's secured.
    assert response.status_code == 401, f"Admin endpoint should not be accessible with default token, got {response.status_code}"

def test_admin_unauthorized():
    """Verify that admin endpoint requires a token"""
    response = client.get("/api/contact")
    assert response.status_code == 401
