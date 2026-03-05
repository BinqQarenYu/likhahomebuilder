from unittest.mock import MagicMock, AsyncMock
import sys
import os
import uuid
import pytest
from fastapi import HTTPException

# Mock the database before importing auth and server
sys.modules['database'] = MagicMock()
import database
database.get_database = AsyncMock()
database.close_db_connection = MagicMock()

from auth import verify_admin_token
import server

def test_verify_admin_token_no_env():
    # Test when ADMIN_SECRET_TOKEN is not set, it should use a random UUID
    # We can't easily check the random UUID, but we can check that it fails with a wrong one
    with pytest.raises(HTTPException) as excinfo:
        verify_admin_token("wrong-token")
    assert excinfo.value.status_code == 401

def test_security_headers():
    from fastapi.testclient import TestClient
    client = TestClient(server.app)
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert "Content-Security-Policy" in response.headers

if __name__ == "__main__":
    # Simple manual test if pytest is not available
    try:
        test_security_headers()
        print("✅ Security headers test passed")
    except Exception as e:
        print(f"❌ Security headers test failed: {e}")
