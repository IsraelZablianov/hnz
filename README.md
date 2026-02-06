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

This project deploys to **GitHub Pages** automatically via GitHub Actions on every push to `main`.

### Manual Deploy

```bash
npm run build
npm run deploy
```

### GitHub Pages Setup

1. Go to **Settings > Pages** in your GitHub repo
2. Set **Source** to "GitHub Actions"
3. Push to `main` — the workflow handles the rest

## Project Structure

```
hnz/
├── .cursor/rules/          # AI agent rules (Cursor IDE)
├── .github/workflows/      # CI/CD pipelines
│   └── deploy.yml          # GitHub Pages deployment
├── public/
│   └── vcard.vcf           # Contact card file
├── src/
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # React entry point
│   └── styles.css          # All styles (CSS custom properties)
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
