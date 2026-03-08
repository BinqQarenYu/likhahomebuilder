from fastapi.testclient import TestClient
import sys
import os

# Add the backend directory to sys.path to import server
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from server import app

client = TestClient(app)

def test_security_headers():
    response = client.get("/api/")
    assert response.status_code == 200

    # Check for security headers
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["Referrer-Policy"] == "strict-origin-when-cross-origin"
    assert "Strict-Transport-Security" in response.headers
    assert "Content-Security-Policy" in response.headers

    csp = response.headers["Content-Security-Policy"]
    assert "default-src 'self'" in csp
    assert "https://cdn.jsdelivr.net" in csp
    assert "https://images.unsplash.com" in csp
    assert "https://images.pexels.com" in csp
    assert "https://www.facebook.com" in csp
