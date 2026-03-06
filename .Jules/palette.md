## 2024-05-24 - Missing ARIA labels on Icon-only Buttons
**Learning:** Found a pattern of missing `aria-label` attributes on icon-only interactive elements (like the mobile menu button in `Header.jsx` and social media links in `Footer.jsx`). These elements are inaccessible to screen readers without proper labels.
**Action:** Always verify that buttons and links containing only icons include an explicit `aria-label` attribute to ensure accessibility.

## 2024-05-25 - Carousel Accessibility and Keyboard Interaction
**Learning:** Hiding carousel navigation controls until hover completely prevents keyboard users from discovering and using them. Additionally, static `div` indicator dots deny random access to specific slides, forcing users to click through sequentially.
**Action:** Always ensure that interactive elements (like carousel arrows) are visible and focusable using keyboard navigation (e.g., `focus-visible:opacity-100`). Furthermore, make visual indicators interactive, transforming them into `button` elements with proper `aria-label` and focus styling, allowing users direct access to content.
