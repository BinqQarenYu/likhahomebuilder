## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.
## 2026-03-21 - [Implement MongoDB indexes and modern lifespan manager]
**Learning:** Adding indexes to frequently queried fields (e.g., email, created_at) significantly improves database performance. Transitioning to FastAPI's `lifespan` context manager ensures that these startup tasks and shutdown cleanups (like closing DB connections) are handled reliably and follow modern best practices.
**Action:** Use `lifespan` for app startup/shutdown logic and always ensure critical query paths are supported by appropriate database indexes.
