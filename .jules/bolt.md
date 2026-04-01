## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.

## 2024-05-20 - [Offload High-Frequency UI Interactions to CSS Variables]
**Learning:** Updating React state on high-frequency events like `onMouseMove` or `onDrag` can cause performance degradation by triggering component re-renders (up to 60fps) for every pixel moved. Using `useRef` to access the DOM and `style.setProperty` to update CSS variables allows the browser to handle the visual transform updates directly, bypassing the React reconciliation cycle.
**Action:** For continuous animations or interactions (tilt, parallax, drag), use CSS variables and direct DOM updates via refs instead of React state.