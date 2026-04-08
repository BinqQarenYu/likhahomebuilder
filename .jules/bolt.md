## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.## 2024-04-08 - [Frontend React Route Lazy Loading]
**Learning:** Replacing static imports of React components with `React.lazy()` for route definitions successfully implements code splitting and reduces initial payload size significantly without regressions.
**Action:** Always prioritize route-level lazy loading when dealing with multiple top-level pages to improve frontend application performance.
