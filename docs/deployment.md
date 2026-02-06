# Deployment Guide

## Overview

The site is deployed to **GitHub Pages** at [card.hnz-cpa.com](https://card.hnz-cpa.com) via a GitHub Actions workflow that runs on every push to `main`.

```
Push to main → GitHub Actions builds → Uploads dist/ → GitHub Pages serves
```

---

## GitHub Actions Workflow

The workflow lives at `.github/workflows/deploy.yml` and has two jobs:

### Build Job

1. Checks out the code
2. Sets up Node.js 20 with the **public npm registry** (see [Registry Configuration](#registry-configuration))
3. Runs `npm install` to fetch dependencies
4. Runs `npm run build` (Vite produces output in `dist/`)
5. Uploads `dist/` as a Pages artifact

### Deploy Job

- Depends on a successful build
- Deploys the artifact to the `github-pages` environment
- Outputs the live URL

---

## Custom Domain

The site uses a custom domain: **card.hnz-cpa.com**

### How It Works

Three pieces make the custom domain work:

1. **DNS**: A CNAME record for `card` pointing to `israelzablianov.github.io`
2. **`public/CNAME`**: Contains `card.hnz-cpa.com` -- Vite copies this to `dist/` on build, and GitHub Pages reads it to configure the domain
3. **GitHub Pages settings**: Custom domain set via API with HTTPS enforced

### Vite Base Path

With a custom domain, Vite's `base` is set to `"/"` in `vite.config.js` because assets are served from the root.

If you ever remove the custom domain and go back to the default `username.github.io/repo/` URL, change `base` back to `"/hnz/"`.

### Changing the Custom Domain

1. Update the DNS record at your provider
2. Update `public/CNAME` with the new domain
3. Run: `gh api repos/IsraelZablianov/hnz/pages -X PUT -f cname="new.domain.com"`
4. Push to `main` to trigger a redeploy

### Removing the Custom Domain

1. Delete `public/CNAME`
2. Change `base` in `vite.config.js` back to `"/hnz/"`
3. Run: `gh api repos/IsraelZablianov/hnz/pages -X PUT -f cname=""`
4. Push to `main`

---

## Registry Configuration

### The Problem

The developer's machine uses a corporate npm registry configured in the global `~/.npmrc`. GitHub Actions runners can't access this private registry.

### The Solution

The CI workflow explicitly sets the public registry in two places:

```yaml
# In deploy.yml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20
    registry-url: https://registry.npmjs.org/

- name: Install dependencies
  run: npm install --registry https://registry.npmjs.org/
```

This way:

- **Locally**: `npm install` uses the registry from `~/.npmrc` (no project `.npmrc` needed)
- **CI**: `npm install` uses the public registry via the `--registry` flag

### Lock File

`package-lock.json` is gitignored because it contains registry-specific URLs. The CI generates a fresh lock file on each build. This is a trade-off for working with mixed registries.

---

## Troubleshooting

### Build fails with "module not found"

Ensure `vite` and `@vitejs/plugin-react` are listed in `devDependencies` in `package.json`. These were initially missing and caused CI failures.

### npm install hangs on CI

Check that the workflow uses `--registry https://registry.npmjs.org/`. Without this, npm may try to reach an unreachable corporate registry if a lock file with corporate URLs is committed.

### Custom domain shows 404

1. Verify the CNAME DNS record is propagated: `dig card.hnz-cpa.com`
2. Check that `public/CNAME` exists and contains the correct domain
3. Verify GitHub Pages is configured: `gh api repos/IsraelZablianov/hnz/pages`

### HTTPS not working

GitHub provisions a Let's Encrypt certificate after DNS propagates. This can take up to 30 minutes. Enable enforcement with:

```bash
gh api repos/IsraelZablianov/hnz/pages -X PUT -f cname="card.hnz-cpa.com" -F https_enforced=true
```
