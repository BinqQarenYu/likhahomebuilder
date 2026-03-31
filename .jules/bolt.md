## 2024-05-18 - [Add lazy loading to React images]
**Learning:** Adding `loading="lazy"` to images below the fold saves initial bandwidth and improves load time on image-heavy React pages. The `fetchpriority="high"` and `loading="eager"` can be used on the hero/LCP image above the fold for maximum speed.
**Action:** Always add `loading="lazy"` for unoptimized remote images that are not immediately visible on page load.
## 2024-05-21 - [Use CSS variables for high-frequency React interactions]
**Learning:** For interactions that update rapidly (e.g., mouse-driven tilt or parallax), using React state triggers excessive re-renders. Manipulating a CSS variable directly on the DOM element (`e.currentTarget.style.setProperty`) allows for smooth 60fps+ animations by bypassing React's reconciliation cycle and letting the GPU handle the transforms.
**Action:** Always prefer CSS variables over React state for frequent, high-velocity UI updates.
