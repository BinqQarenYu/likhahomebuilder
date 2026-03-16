## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.

## 2024-05-18 - [MongoDB Indexing for Performance]
**Learning:** Initializing MongoDB indexes during application startup prevents O(n) collection scans for common operations like unique lookups (emails) and descending sorts (timestamps). This is especially critical for admin dashboards that list historical data.
**Action:** Use the `@app.on_event("startup")` handler in FastAPI to ensure critical indexes exist, keeping the operations idempotent.