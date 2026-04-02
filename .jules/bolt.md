## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.
## 2026-04-02 - [Bypassing React re-renders for high-frequency UI interactions]
**Learning:** Updating React state on every 'mousemove' or 'touchmove' event (e.g., for 3D tilt or custom drag effects) causes the entire component tree to re-render, leading to jank and high CPU usage. By using 'useRef' to access the DOM directly and updating CSS variables via 'style.setProperty', we can achieve 60fps animations while completely bypassing the React reconciliation cycle.
**Action:** Use CSS variables and direct DOM manipulation for performance-critical, high-frequency UI updates.
