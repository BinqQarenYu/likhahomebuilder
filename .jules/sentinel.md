## 2024-05-23 - [API Authorization & CORS Security]
**Vulnerability:** Admin endpoints (GET /contact, GET /newsletter, GET /purchase) were publicly accessible, exposing Personally Identifiable Information (PII) of customers and subscribers. Additionally, CORS was configured with `allow_origins=["*"]` while `allow_credentials=True`, which is insecure and often rejected by modern browsers for authenticated requests.
**Learning:** Initial development often focuses on functionality, leaving "admin" endpoints unprotected under the assumption they are "internal" or "hidden". Wildcard CORS is often a default that persists into production.
**Prevention:** Always apply at least a basic API key or Bearer token authentication to any endpoint that returns user data. Use environment variables for CORS origins instead of wildcards.

## 2024-05-23 - [Hardcoded Admin Secret Token]
**Vulnerability:** The `ADMIN_SECRET_TOKEN` environment variable had a hardcoded default fallback (`"default_secret_token_change_me"`) in `backend/auth.py`. If the environment variable was missing, anyone knowing this default string could gain full admin access to the application endpoints.
**Learning:** Default fallbacks for authentication secrets completely undermine the security of environment variables. It's better for the application to fail to start or explicitly return a server error than to silently use a known, insecure secret.
**Prevention:** Always raise an explicit error or fail securely if critical security configuration is missing during initialization or execution, rather than providing fallback credentials.

## 2024-05-23 - [Missing Global Security Headers]
**Vulnerability:** The FastAPI backend did not enforce global HTTP security headers, leaving it vulnerable to various attacks like clickjacking (missing `X-Frame-Options`), MIME sniffing (missing `X-Content-Type-Options`), Cross-Site Scripting (missing `X-XSS-Protection`), and lack of strict transport security (`Strict-Transport-Security`).
**Learning:** Frameworks like FastAPI do not include HTTP security headers by default. It is the responsibility of the developer to explicitly enforce them globally.
**Prevention:** Implement a global middleware (`BaseHTTPMiddleware` in FastAPI) to ensure all API responses include standard HTTP security headers such as `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, and `Strict-Transport-Security`.
