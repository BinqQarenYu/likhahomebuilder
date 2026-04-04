## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.

## 2025-05-15 - High-frequency interaction optimization in React
**Learning:** Using React state for high-frequency events (like `onMouseMove` or `onDrag`) triggers the full reconciliation cycle for every pixel moved, causing significant CPU overhead and frame drops.
**Action:** Offload high-frequency UI updates to CSS variables and direct DOM manipulation via `useRef` to bypass React's render loop and utilize the browser's compositor for smoother animations.
