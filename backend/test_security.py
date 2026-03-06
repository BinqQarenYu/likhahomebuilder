from fastapi.testclient import TestClient
import sys
import os
import asyncio
from unittest.mock import patch, MagicMock

# Mock database before importing app
sys.modules['database'] = MagicMock()
import database

# Mock get_database as an async function
async def mock_get_db():
    mock_db = MagicMock()
    # Mock the find operation for contacts to be awaitable
    mock_contacts = MagicMock()
    mock_db.contacts = mock_contacts

    mock_cursor = MagicMock()
    mock_contacts.find.return_value = mock_cursor
    mock_cursor.sort.return_value = mock_cursor

    # to_list must be an async function
    async def mock_to_list(limit):
        return []
    mock_cursor.to_list = mock_to_list

    return mock_db

database.get_database = mock_get_db

from server import app

client = TestClient(app)

def test_security_headers():
    """Verify that essential security headers are present in responses"""
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["Referrer-Policy"] == "strict-origin-when-cross-origin"
    assert "Strict-Transport-Security" in response.headers
    assert "Content-Security-Policy" in response.headers

def test_admin_auth_no_token():
    """Verify that admin endpoints are protected (no token)"""
    # Admin endpoints: GET /contact, GET /newsletter, GET /purchase
    endpoints = ["/api/contact", "/api/newsletter", "/api/purchase"]
    for endpoint in endpoints:
        response = client.get(endpoint)
        assert response.status_code == 401
        assert "Unauthorized" in response.json()["detail"]

def test_admin_auth_invalid_token():
    """Verify that admin endpoints reject invalid tokens"""
    endpoints = ["/api/contact", "/api/newsletter", "/api/purchase"]
    for endpoint in endpoints:
        response = client.get(endpoint, headers={"X-Admin-Token": "invalid-token"})
        assert response.status_code == 401
        assert "Unauthorized" in response.json()["detail"]

def test_admin_auth_valid_token():
    """Verify that admin endpoints accept valid tokens"""
    with patch("auth.ADMIN_TOKEN", "test-admin-token"):
        response = client.get("/api/contact", headers={"X-Admin-Token": "test-admin-token"})
        assert response.status_code == 200
