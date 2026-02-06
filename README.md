# HNZ - Digital Business Card

A sleek, mobile-first digital business card for **Hila Nach Zevlianov (HNZ)**, Certified Public Accountant.

Built with React 19 + Vite, optimized for instant loading and native-like interactions on mobile devices. Full Hebrew RTL support.

## Features

- **One-tap actions** — Call, WhatsApp, email, save contact, visit website, share
- **Lead capture form** — Collects name & phone, sends via WhatsApp
- **vCard download** — Add to contacts instantly
- **Web Share API** — Native sharing with clipboard fallback
- **Smooth animations** — Fade-in, staggered reveals, subtle hover effects
- **PWA-ready** — Mobile-first responsive design
- **Accessible** — Reduced motion support, semantic HTML

## Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Framework | React 19                |
| Build     | Vite 5                  |
| Styling   | CSS (custom properties) |
| Font      | Rubik (Google Fonts)    |
| Deploy    | GitHub Pages + Actions  |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

Live at **[card.hnz-cpa.com](https://card.hnz-cpa.com)**

Deploys to GitHub Pages automatically via GitHub Actions on every push to `main`.

### Custom Domain

The site is served from `card.hnz-cpa.com` via:
- DNS CNAME record (managed in Wix)
- `public/CNAME` file in the repo
- HTTPS enforced by GitHub

### Manual Deploy

```bash
npm run build
npm run deploy
```

See [docs/deployment.md](docs/deployment.md) for full deployment details, custom domain management, and troubleshooting.

## Project Structure

```
hnz/
├── .cursor/rules/          # AI agent rules (Cursor IDE)
├── .github/workflows/      # CI/CD pipelines
│   └── deploy.yml          # GitHub Pages deployment
├── docs/                   # Documentation
│   ├── deployment.md       # Deployment & infrastructure
│   ├── development.md      # Development guide & conventions
│   └── animations.md       # CSS animations reference
├── public/
│   ├── CNAME               # Custom domain (card.hnz-cpa.com)
│   └── vcard.vcf           # Contact card file
├── src/
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # React entry point
│   └── styles.css          # All styles (CSS custom properties)
├── AGENTS.md               # AI agent guidelines
├── index.html              # HTML entry (RTL, Hebrew)
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies & scripts
```

## Customization

All contact information is centralized as constants at the top of `src/App.jsx`:

```javascript
const PHONE = "0555582369";
const EMAIL = "hila@hnz-cpa.com";
const SITE = "https://www.hnz-cpa.com";
const NAME_HE = "הילה נח זבליאנוב";
```

Update these values and the `public/vcard.vcf` file to customize for a different person.

## License

Private project. All rights reserved.
