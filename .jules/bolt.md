## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.

## 2025-02-23 - [Route-Level Code Splitting]
**Learning:** The React application's initial bundle was unnecessarily large because all pages were imported statically in `App.js`. This is an architectural bottleneck for first-page-load performance.
**Action:** Use `React.lazy()` and `Suspense` for all top-level routes in `App.js` to split the JavaScript payload, ensuring users only download the code they need for the page they visit.