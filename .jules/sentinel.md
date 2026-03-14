## 2024-05-23 - [API Authorization & CORS Security]
**Vulnerability:** Admin endpoints (GET /contact, GET /newsletter, GET /purchase) were publicly accessible, exposing Personally Identifiable Information (PII) of customers and subscribers. Additionally, CORS was configured with `allow_origins=["*"]` while `allow_credentials=True`, which is insecure and often rejected by modern browsers for authenticated requests.
**Learning:** Initial development often focuses on functionality, leaving "admin" endpoints unprotected under the assumption they are "internal" or "hidden". Wildcard CORS is often a default that persists into production.
**Prevention:** Always apply at least a basic API key or Bearer token authentication to any endpoint that returns user data. Use environment variables for CORS origins instead of wildcards.

## 2024-05-24 - [Defense in Depth - Security Headers]
**Vulnerability:** The backend FastAPI application was not returning any HTTP security headers, leaving clients susceptible to attacks such as Clickjacking, MIME-sniffing, and certain types of Cross-Site Scripting (XSS).
**Learning:** Even though modern browsers have built-in defenses, relying solely on them without explicit directives is risky. A framework's defaults rarely include comprehensive security headers.
**Prevention:** Always implement a middleware or use a dedicated library (e.g., `secure`) to inject strict security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, `Content-Security-Policy`, etc.) into all HTTP responses.
