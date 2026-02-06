# Development Guide

## Prerequisites

- Node.js 18+
- npm 9+

## Quick Start

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

---

## Architecture

Single-page React app with no routing, no state management library, and no API calls. Everything is client-side.

```
index.html                → HTML shell (RTL, Hebrew, Google Fonts)
  └─ src/main.jsx         → React root in StrictMode
       └─ src/App.jsx     → All UI and logic in one component
            └─ src/styles.css → All styles (variables, layout, animations)
```

### Supporting Files

| File | Purpose |
|------|---------|
| `public/vcard.vcf` | vCard for "Add to Contacts" button |
| `public/CNAME` | Custom domain for GitHub Pages |
| `vite.config.js` | Vite build config (base path, React plugin) |
| `.github/workflows/deploy.yml` | CI/CD pipeline |

---

## Project Structure

```
hnz/
├── .cursor/rules/           # Cursor IDE AI rules
├── .github/workflows/       # CI/CD
│   └── deploy.yml
├── docs/                    # Documentation
│   ├── deployment.md        # Deployment & infrastructure
│   ├── development.md       # This file
│   └── animations.md        # CSS animations reference
├── public/
│   ├── CNAME                # Custom domain config
│   └── vcard.vcf            # Contact card
├── src/
│   ├── App.jsx              # Main component
│   ├── main.jsx             # React entry point
│   └── styles.css           # All styles
├── AGENTS.md                # AI agent guidelines
├── README.md                # Project overview
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
└── vite.config.js           # Vite configuration
```

---

## Code Conventions

### Contact Constants

All contact info is defined as constants at the top of `src/App.jsx`:

```javascript
const PHONE = "0555582369";
const PHONE_DISPLAY = "055-5582369";
const PHONE_INTL = "972555582369";
const EMAIL = "hila@hnz-cpa.com";
const SITE = "https://www.hnz-cpa.com";
const NAME_HE = "הילה נח זבליאנוב";
```

Never hardcode contact details anywhere else. To customize for a different person, update these constants and `public/vcard.vcf`.

### Components

- Functional components only (no class components)
- Sub-components like `ActionIcon` live in the same file as `App`
- Inline SVG icons -- no icon libraries
- `useState` for local state -- no external state management

### CSS

- **BEM-like naming**: `.block__element` (e.g., `.top-header__logo`)
- **CSS custom properties** in `:root` for theming
- **Mobile-first**: Base styles target mobile; `@media (min-width: 500px)` for desktop
- **No CSS frameworks**: Plain CSS only

### RTL Support

- `index.html` sets `dir="rtl"` and `lang="he"`
- Phone numbers and emails use `direction: ltr`
- Animations that use `translateX` are mirrored for RTL context

---

## Customizing for Another Business

1. Update the constants in `src/App.jsx` (name, phone, email, website)
2. Update `public/vcard.vcf` with new contact details
3. Update `index.html` meta tags (title, description, keywords)
4. Replace the hero image in `public/` if applicable
5. Adjust the services text in the Hebrew sections of `App.jsx`
6. Update `public/CNAME` if using a different domain
