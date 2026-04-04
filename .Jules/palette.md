## 2024-05-24 - Missing ARIA labels on Icon-only Buttons
**Learning:** Found a pattern of missing `aria-label` attributes on icon-only interactive elements (like the mobile menu button in `Header.jsx` and social media links in `Footer.jsx`). These elements are inaccessible to screen readers without proper labels.
**Action:** Always verify that buttons and links containing only icons include an explicit `aria-label` attribute to ensure accessibility.

## 2024-05-25 - Carousel Accessibility and Keyboard Interaction
**Learning:** Hiding carousel navigation controls until hover completely prevents keyboard users from discovering and using them. Additionally, static `div` indicator dots deny random access to specific slides, forcing users to click through sequentially.
**Action:** Always ensure that interactive elements (like carousel arrows) are visible and focusable using keyboard navigation (e.g., `focus-visible:opacity-100`). Furthermore, make visual indicators interactive, transforming them into `button` elements with proper `aria-label` and focus styling, allowing users direct access to content.

## 2024-05-23 - Carousel Mobile & Auto-Play Enhancements
**Learning:** Carousels on mobile that rely solely on small navigation arrows provide a poor UX, as users naturally expect to swipe between images. Additionally, static carousels without auto-play can cause users to miss out on content hidden behind the first slide. Auto-play needs to pause on hover/focus to remain accessible.
**Action:** Always implement touch event handlers (`onTouchStart`, `onTouchMove`, `onTouchEnd`) for swipe gestures on carousels to improve mobile UX. Introduce auto-play with a `setInterval` to encourage discovery, but strictly ensure the interval is cleared when the carousel is hovered or focused to respect user control and accessibility guidelines.

## 2024-05-26 - Form Inputs Lacking Explicit Labels or ARIA Attributes
**Learning:** Found cases where form inputs lacked explicit `<label>` association via `htmlFor`/`id` pairs, or standalone inputs like a newsletter email field missed an `aria-label`. This makes it difficult or impossible for screen reader users to identify the purpose of the input.
**Action:** Always explicitly link a visible `<label>` to an input using `htmlFor` and `id`. If an input does not have a visible label (e.g., a newsletter sign-up with just a placeholder), provide an `aria-label` attribute to ensure the purpose is clear to assistive technologies.

## 2024-05-27 - Missing Loading States on Async Submit Buttons
**Learning:** Found instances where buttons triggering asynchronous operations (like form submissions or newsletter sign-ups) lacked a clear, active visual indicator (such as a spinning icon) alongside the "Loading..." text. While the button was disabled, the absence of an animated indicator reduces user confidence that the system is actively processing their request, potentially leading to confusion or frustration.
**Action:** Use a combination of a descriptive text change (e.g., "Sending...") and an animated visual indicator (like the `Loader2` component from `lucide-react` with a spinning animation) on buttons during async operations. This clearly signals system status and provides a better UX.

## 2025-04-04 - Missing Focus Indicators on Custom Interactive Elements
**Learning:** In Likha Home Builders' frontend, many custom interactive elements, such as rounded icon-only social links inside standard HTML anchor (`<a>`) tags, lacked proper `:focus-visible` states. By default, browsers might apply a subtle outline or, depending on global resets like Tailwind's Preflight, remove it entirely, leading to poor keyboard navigation accessibility.
**Action:** When using non-standard buttons or links (e.g. `<a>` or `<div>` acting as buttons) styled heavily with background colors and border radii, explicitly apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` (adjusted for dark/light mode with e.g. `focus-visible:ring-offset-black`) to ensure clear, high-contrast focus indicators.
