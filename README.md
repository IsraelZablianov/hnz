# HNZ - Digital Business Card

A sleek, mobile-first digital business card for **Hila Noah Zablianov (HNZ)**, Certified Public Accountant.

Built with React 19 + Vite, optimized for instant loading and native-like interactions on mobile devices. Full Hebrew RTL support.

## Features

- **One-tap actions** — Call, WhatsApp, save contact, Facebook, Instagram, share
- **Lead capture form** — Collects name & phone, saves to Google Sheet and sends via WhatsApp
- **vCard download** — Add to contacts instantly
- **Social links** — Direct links to Facebook and Instagram profiles
- **Web Share API** — Native sharing with clipboard fallback
- **Smooth animations** — Fade-in, staggered reveals, subtle hover effects
- **SEO optimized** — Open Graph, Twitter Cards, JSON-LD structured data, sitemap
- **PWA-ready** — Mobile-first responsive design with favicons and web manifest
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

- DNS CNAME record
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
├── .cursor/
│   ├── rules/              # AI agent rules (Cursor IDE)
│   └── skills/             # AI agent skills
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages deployment
├── docs/
│   ├── animations.md       # CSS animations reference
│   ├── deployment.md       # Deployment & infrastructure
│   └── development.md      # Development guide & conventions
├── public/
│   ├── android-chrome-*.png # Android icons (192, 512)
│   ├── apple-touch-icon.png # iOS icon
│   ├── CNAME               # Custom domain (card.hnz-cpa.com)
│   ├── favicon-*.png       # Favicons (16, 32)
│   ├── favicon.svg         # SVG favicon
│   ├── og-image.png        # Open Graph social preview image
│   ├── robots.txt          # Search engine crawl rules
│   ├── site.webmanifest    # PWA manifest
│   ├── sitemap.xml         # Sitemap for SEO
│   └── vcard.vcf           # Contact card file
├── src/
│   ├── assets/
│   │   └── hila-hero.png   # Hero profile image
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # React entry point
│   └── styles.css          # All styles (CSS custom properties)
├── AGENTS.md               # AI agent guidelines
├── index.html              # HTML entry (RTL, Hebrew, JSON-LD)
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies & scripts
```

## Customization

All contact information is centralized as constants at the top of `src/App.jsx`:

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
```

Update these values, `public/vcard.vcf`, and the structured data in `index.html` to customize for a different person.

## Google Sheets Lead Integration

The contact form saves every submission to a Google Sheet via Google Apps Script, then opens WhatsApp with the lead details.

**How it works:**
1. User fills in name + phone, clicks "שלח"
2. Form POSTs data to a Google Apps Script web app (URL stored in `GOOGLE_SCRIPT_URL` constant)
3. The script appends a row to the [HNZ Leads spreadsheet](https://docs.google.com/spreadsheets/d/1XezCmGaLsQM72HL3kgjl8jhzkdoG6T3XOet4L5g_7eI) with name, phone, and timestamp
4. WhatsApp opens with the lead message (regardless of whether the sheet write succeeded)

**Sheet columns:** שם | טלפון | תאריך

**Cost:** Free (Google Apps Script free tier — up to 20,000 requests/day)

**If the Apps Script URL changes** (e.g. after redeploying), update the `GOOGLE_SCRIPT_URL` constant in `src/App.jsx`.

## License

Private project. All rights reserved.
