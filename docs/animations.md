# CSS Animations Reference

All animations live in `src/styles.css` under the "Superpower Animations" section.

---

## Keyframe Animations

| Animation | Effect | Duration | Used On |
|-----------|--------|----------|---------|
| `fadeInUp` | Fade in + slide up 22px | 0.45-0.6s | Sections, action tiles, lead form |
| `fadeIn` | Simple opacity fade | 0.4-0.6s | Header, share bar, call bar |
| `slideInFromRight` | Fade in + slide from logical start (RTL-aware) | 0.5s | Dark section name |
| `shimmer` | Metallic shimmer sweep across background | 3s infinite | HNZ logo initials |
| `subtlePulse` | Expanding box-shadow ring | 2.5s infinite | Submit button (attention grab) |
| `float` | Gentle vertical bob (4px) | 2s infinite | Logo on hover |
| `growWidth` | Width grows from 0 to 60px | 0.6s | About section divider |

---

## Staggered Reveal System

Sections cascade in on page load with timed delays:

```
0.0s  Header background fades in
0.1s  Logo slides up
0.25s Services text slides up
0.35s Contact info slides up
0.4s  Share bar fades in
0.3s  Action tile 1 slides up
0.38s Action tile 2
0.46s Action tile 3
0.54s Action tile 4
0.62s Action tile 5
0.70s Action tile 6
0.6s  Dark section fades in
0.7s  Name slides in from right
0.85s About section slides up
0.9s  Lead form slides up
0.95s Divider grows
1.0s  Call bar fades in
```

Each action tile uses an 80ms offset (`nth-child` selectors) for a waterfall effect across the 3-column grid.

The `both` fill mode on all animations means elements start invisible and remain in their final state after animation.

---

## Micro-Interactions

### Action Tiles

```css
/* Hover: lift up with shadow */
.action:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

/* Press: spring-back scale */
.action:active {
  transform: scale(0.93) translateY(0);
}
```

Uses a bouncy cubic-bezier: `cubic-bezier(0.34, 1.56, 0.64, 1)` for the spring feel on hover.

### Form Inputs

Focus state adds a soft glow ring:

```css
.lead__form input:focus {
  border-color: var(--dark);
  box-shadow: 0 0 0 3px rgba(58, 58, 58, 0.1);
}
```

### Submit Button

- Pulse animation draws attention (stops on hover)
- Lifts slightly on hover with shadow
- Uses `animation: none` on hover to stop the pulse

### Call Bar Phone Link

Scales up slightly and turns green on hover.

---

## Glassmorphism

Action tiles use frosted glass styling:

```css
.action {
  background: linear-gradient(145deg,
    rgba(200, 200, 200, 0.55) 0%,
    rgba(180, 180, 180, 0.4) 50%,
    rgba(160, 160, 160, 0.45) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

The `inset` shadow creates a subtle highlight on the top edge, and the semi-transparent border adds depth.

---

## Logo Shimmer

The HNZ initials box uses a gradient background that sweeps across:

```css
.top-header__initials {
  background: linear-gradient(110deg, var(--dark) 30%, #555 50%, var(--dark) 70%);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
  animation-delay: 1.5s;
}
```

The 1.5s delay ensures it starts after the initial reveal animations complete.

---

## Accessibility: Reduced Motion

All animations are disabled for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is a blanket rule that effectively disables all animations and transitions site-wide. The `0.01ms` duration (rather than `0s`) ensures animation end states are still applied.

---

## Adding New Animations

When adding new animations:

1. Define the `@keyframes` in the "Keyframes" section of `styles.css`
2. Apply with `animation: name duration easing delay fill-mode`
3. Use `both` as fill mode so the element stays invisible until its delay
4. Fit the delay into the existing stagger timeline
5. Use only `transform` and `opacity` for performance (GPU-accelerated)
6. The `prefers-reduced-motion` rule covers new animations automatically
