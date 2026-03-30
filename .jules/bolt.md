## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.

## 2024-05-20 - [Optimize high-frequency interactions with CSS variables]
**Learning:** Updating React state (like `mouseY`) inside high-frequency event handlers (like `onMouseMove`) triggers expensive component re-renders for every pixel of movement. Using a CSS variable (`--tilt-y`) updated directly on the DOM element's style property (`e.currentTarget.style.setProperty`) allows the browser to handle the visual update (e.g., `rotateX`) during the style/layout phase without a full React render cycle.
**Action:** For continuous interactions like mouse tracking, tilt effects, or custom cursors, manipulate CSS variables on the DOM instead of using React state to eliminate main-thread blocking re-renders.