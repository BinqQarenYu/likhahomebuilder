## 2024-05-24 - Missing ARIA labels on Icon-only Buttons
**Learning:** Found a pattern of missing `aria-label` attributes on icon-only interactive elements (like the mobile menu button in `Header.jsx` and social media links in `Footer.jsx`). These elements are inaccessible to screen readers without proper labels.
**Action:** Always verify that buttons and links containing only icons include an explicit `aria-label` attribute to ensure accessibility.
