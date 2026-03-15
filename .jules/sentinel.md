## 2024-05-23 - [API Authorization & CORS Security]
**Vulnerability:** Admin endpoints (GET /contact, GET /newsletter, GET /purchase) were publicly accessible, exposing Personally Identifiable Information (PII) of customers and subscribers. Additionally, CORS was configured with `allow_origins=["*"]` while `allow_credentials=True`, which is insecure and often rejected by modern browsers for authenticated requests.
**Learning:** Initial development often focuses on functionality, leaving "admin" endpoints unprotected under the assumption they are "internal" or "hidden". Wildcard CORS is often a default that persists into production.
**Prevention:** Always apply at least a basic API key or Bearer token authentication to any endpoint that returns user data. Use environment variables for CORS origins instead of wildcards.

## 2024-05-24 - [Hardcoded Admin Secret Fallback]
**Vulnerability:** The admin authentication middleware `verify_admin_token` used a hardcoded fallback secret (`"default_secret_token_change_me"`) if the `ADMIN_SECRET_TOKEN` environment variable was missing.
**Learning:** Using default fallbacks for security secrets creates a risk where unconfigured environments fail open securely instead of failing closed, allowing unauthorized access using a known default token.
**Prevention:** Never provide fallback values for cryptographic secrets or authentication tokens. Applications should fail to start or reject access securely if required secrets are not configured in the environment.
