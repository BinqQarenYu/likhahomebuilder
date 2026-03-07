## 2024-05-23 - [API Authorization & CORS Security]
**Vulnerability:** Admin endpoints (GET /contact, GET /newsletter, GET /purchase) were publicly accessible, exposing Personally Identifiable Information (PII) of customers and subscribers. Additionally, CORS was configured with `allow_origins=["*"]` while `allow_credentials=True`, which is insecure and often rejected by modern browsers for authenticated requests.
**Learning:** Initial development often focuses on functionality, leaving "admin" endpoints unprotected under the assumption they are "internal" or "hidden". Wildcard CORS is often a default that persists into production.
**Prevention:** Always apply at least a basic API key or Bearer token authentication to any endpoint that returns user data. Use environment variables for CORS origins instead of wildcards.

## 2026-03-07 - [Insecure Default Admin Token & Missing Security Headers]
**Vulnerability:** The admin token had an insecure default value ("default_secret_token_change_me") in the code, and essential security headers (X-Frame-Options, CSP, etc.) were missing from API responses.
**Learning:** Hardcoded default secrets are a common pitfall that makes applications "vulnerable by default". Missing security headers leave the application exposed to well-known attacks like clickjacking and XSS.
**Prevention:** Never use hardcoded default values for secrets. Generate a random token at startup if no configuration is provided. Implement a centralized middleware to enforce essential security headers across all responses.
