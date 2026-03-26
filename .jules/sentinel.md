## 2024-05-23 - [API Authorization & CORS Security]
**Vulnerability:** Admin endpoints (GET /contact, GET /newsletter, GET /purchase) were publicly accessible, exposing Personally Identifiable Information (PII) of customers and subscribers. Additionally, CORS was configured with `allow_origins=["*"]` while `allow_credentials=True`, which is insecure and often rejected by modern browsers for authenticated requests.
**Learning:** Initial development often focuses on functionality, leaving "admin" endpoints unprotected under the assumption they are "internal" or "hidden". Wildcard CORS is often a default that persists into production.
**Prevention:** Always apply at least a basic API key or Bearer token authentication to any endpoint that returns user data. Use environment variables for CORS origins instead of wildcards.

## 2024-05-23 - [Hardcoded Admin Secret Token]
**Vulnerability:** The `ADMIN_SECRET_TOKEN` environment variable had a hardcoded default fallback (`"default_secret_token_change_me"`) in `backend/auth.py`. If the environment variable was missing, anyone knowing this default string could gain full admin access to the application endpoints.
**Learning:** Default fallbacks for authentication secrets completely undermine the security of environment variables. It's better for the application to fail to start or explicitly return a server error than to silently use a known, insecure secret.
**Prevention:** Always raise an explicit error or fail securely if critical security configuration is missing during initialization or execution, rather than providing fallback credentials.

## 2024-05-23 - [Missing HTTP Security Headers]
**Vulnerability:** The FastAPI application was missing critical HTTP security headers on its responses. This left the application vulnerable to basic attacks like clickjacking (missing X-Frame-Options), MIME-type sniffing (missing X-Content-Type-Options), and basic XSS attacks that browsers could otherwise block (missing X-XSS-Protection). Furthermore, HSTS (Strict-Transport-Security) was missing, which is essential to enforce HTTPS usage.
**Learning:** Default framework setups (like FastAPI) often don't enforce security headers out-of-the-box. Security headers are a crucial layer of defense-in-depth and must be explicitly configured via middleware.
**Prevention:** Always implement a security headers middleware early in the development lifecycle to ensure all endpoints automatically inherit these basic protections.
