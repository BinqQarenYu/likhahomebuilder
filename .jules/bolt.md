## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.

## 2026-04-08 - [Optimize High-Frequency UI Interactions]
**Learning:** React state updates during high-frequency events (mouse move, drag, tilt) cause significant reconciliation overhead. Using CSS variables updated via direct DOM manipulation (`style.setProperty`) allows 60fps smoothness by bypassing the React render cycle.
**Action:** For animations or 3D effects driven by mouse/touch positions, use CSS variables and direct DOM updates instead of React state.