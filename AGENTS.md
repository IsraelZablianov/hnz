# AGENTS.md — AI Agent Guidelines for HNZ

## Project Overview

Digital business card for **Hila Noah Zablianov (HNZ)**, a Certified Public Accountant.  
Single-page React 19 + Vite 5 app, mobile-first, Hebrew RTL, deployed to GitHub Pages.

---

## Tech Stack

| Layer     | Choice                        |
| --------- | ----------------------------- |
| Framework | React 19 (functional, hooks)  |
| Build     | Vite 5 (ESM)                  |
| Styling   | Plain CSS + custom properties |
| Font      | Rubik (Google Fonts)          |
| Language  | JavaScript / JSX              |
| Deploy    | GitHub Pages + Actions        |

---

## Architecture

```
index.html               → RTL entry point (lang="he", dir="rtl", JSON-LD)
  └─ src/main.jsx        → React root (StrictMode)
       └─ src/App.jsx    → Single component with all UI + logic
            ├─ src/styles.css         → All styles (variables, layout, animations)
            └─ src/assets/hila-hero.png → Hero profile image
public/vcard.vcf         → Contact card download
public/og-image.png      → Social sharing preview image
public/robots.txt        → Search engine crawl rules
public/sitemap.xml       → Sitemap for SEO
public/site.webmanifest  → PWA manifest
```

- **No routing** — single-page app
- **No state management** — `useState` only
- **No API calls** — fully client-side
- **No TypeScript** — plain JS/JSX

---

## Code Conventions

### Constants

All contact info lives as `const` at the top of `App.jsx`. Never hardcode contact details elsewhere.

```javascript
const PHONE = "0555582369";
const PHONE_DISPLAY = "055-5582369";
const PHONE_INTL = "972555582369";
const EMAIL = "hila@hnz-cpa.com";
const FACEBOOK = "https://www.facebook.com/hylh.nh/";
const INSTAGRAM = "https://www.instagram.com/hila_noah_zablianov/";
const NAME_HE = "הילה נח זבליאנוב";
const NAME_EN = "Hila Noah Zablianov";
const TITLE_HE = "משרד רואי חשבון";
const WA_TEXT = "היי, אשמח לשמוע פרטים על השירותים שלך";
```

### Components

- Functional components only
- Sub-components (e.g. `ActionIcon`) stay in the same file
- Inline SVG icons — no icon libraries
- Hero image imported from `src/assets/` (bundled by Vite)

### CSS

- BEM-like naming: `.block__element`
- CSS custom properties in `:root` for theming
- Mobile-first, desktop breakpoint at `min-width: 500px`
- Animations use `@keyframes` with `prefers-reduced-motion` fallback
- Glassmorphism via `backdrop-filter: blur()`

### RTL

- `index.html` sets `dir="rtl"` and `lang="he"`
- Use `direction: ltr` for phone numbers and email
- Mirror `translateX` values for RTL animations

---

## File Map

| File                           | Purpose                                                    |
| ------------------------------ | ---------------------------------------------------------- |
| `src/App.jsx`                  | Main component — header, actions, about, lead form, footer |
| `src/styles.css`               | All styles — variables, layout, animations, responsiveness |
| `src/main.jsx`                 | React entry point                                          |
| `src/assets/hila-hero.png`     | Hero profile image (imported, bundled by Vite)             |
| `index.html`                   | HTML shell with RTL, meta tags, JSON-LD, Google Fonts      |
| `public/vcard.vcf`             | vCard for "Add to Contacts" action                         |
| `public/CNAME`                 | Custom domain config for GitHub Pages                      |
| `public/og-image.png`          | Open Graph / social sharing preview image                  |
| `public/robots.txt`            | Search engine crawl rules                                  |
| `public/site.webmanifest`      | PWA web app manifest                                       |
| `public/sitemap.xml`           | Sitemap for SEO                                            |
| `public/favicon.svg`           | SVG favicon                                                |
| `vite.config.js`               | Vite config with `base` for custom domain                  |
| `.github/workflows/deploy.yml` | CI/CD — build & deploy to GitHub Pages                     |
| `docs/deployment.md`           | Deployment, custom domain, registry, troubleshooting       |
| `docs/development.md`          | Local dev setup, architecture, conventions                 |
| `docs/animations.md`           | CSS animations reference and patterns                      |

---

## Deployment

- **Live URL**: [card.hnz-cpa.com](https://card.hnz-cpa.com)
- **Auto-deploy**: Push to `main` triggers GitHub Actions workflow
- **Custom domain**: `public/CNAME` contains `card.hnz-cpa.com`; DNS via Some registrar
- **Base path**: `vite.config.js` sets `base: "/"` (root, because custom domain)
- **Build output**: `dist/` directory (gitignored)
- **Registry**: CI uses public npm; local uses other registry from `~/.npmrc`
- **Full details**: See [docs/deployment.md](docs/deployment.md)

---

## Do's and Don'ts

### Do

- Keep it a single-page app — no routing needed
- Use CSS animations with `prefers-reduced-motion` support
- Test on mobile viewport (480px max-width)
- Keep the WhatsApp integration for lead capture
- Maintain RTL support in all new elements

### Don't

- Don't add TypeScript — keep it simple JS
- Don't add CSS frameworks (Tailwind, Bootstrap, etc.)
- Don't add state management libraries
- Don't add server-side logic — this is a static site
- Don't commit `node_modules/` or `dist/`
- Don't hardcode contact info outside the constants block
