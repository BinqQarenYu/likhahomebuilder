## 2024-05-23 - [API Authorization & CORS Security]
**Vulnerability:** Admin endpoints (GET /contact, GET /newsletter, GET /purchase) were publicly accessible, exposing Personally Identifiable Information (PII) of customers and subscribers. Additionally, CORS was configured with `allow_origins=["*"]` while `allow_credentials=True`, which is insecure and often rejected by modern browsers for authenticated requests.
**Learning:** Initial development often focuses on functionality, leaving "admin" endpoints unprotected under the assumption they are "internal" or "hidden". Wildcard CORS is often a default that persists into production.
**Prevention:** Always apply at least a basic API key or Bearer token authentication to any endpoint that returns user data. Use environment variables for CORS origins instead of wildcards.

## 2024-05-24 - [Hardened API Security & Random Token Generation]
**Vulnerability:** Admin authentication relied on a hardcoded default token (`default_secret_token_change_me`) if the environment variable was missing. Additionally, the API lacked essential security headers (HSTS, CSP, XFO, etc.).
**Learning:** Hardcoded defaults are a major risk as they are often never changed. Security headers provide defense-in-depth but are easily missed.
**Prevention:** Implement a "fail-secure" mechanism that generates a cryptographically secure random token at startup if secrets are missing. Use middleware to globally enforce security headers.
