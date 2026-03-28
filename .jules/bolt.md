## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.

## 2024-05-19 - [Optimize high-frequency UI with CSS variables]
**Learning:** React state updates on high-frequency events (like mousemove) cause excessive re-renders of large component trees. Using direct DOM manipulation via `element.style.setProperty('--var', value)` for visual effects like 3D tilt eliminates re-renders while keeping the UI responsive.
**Action:** Use CSS variables for interaction-heavy animations instead of React state to maintain 60fps.