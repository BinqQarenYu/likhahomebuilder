## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.

## 2024-05-20 - [Optimize MongoDB with Indexes on Startup]
**Learning:** Database queries that include sorting (e.g., `.sort("created_at", -1)`) result in O(n) collection scans if the relevant fields are not indexed. Adding unique indexes for fields like email also provides an extra layer of data integrity at the database level.
**Action:** Ensure all frequently queried or sorted fields have appropriate indexes initialized during the application startup event.