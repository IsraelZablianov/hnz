---
name: gh-pages-vite-deploy
description: Deploy Vite apps (React, Vue, Svelte) to GitHub Pages with GitHub Actions. Handles custom domains, CNAME setup, base path config, and corporate/mixed registry issues. Use when deploying a Vite project to GitHub Pages, setting up a custom domain, or fixing GitHub Pages deployment issues.
---

# Deploy Vite to GitHub Pages

## Quick Setup

### 1. GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org/
      - run: npm install --registry https://registry.npmjs.org/
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 2. Vite Base Path

**Without custom domain** (served at `username.github.io/repo-name/`):

```javascript
export default defineConfig({
  base: "/repo-name/",
});
```

**With custom domain** (served at root):

```javascript
export default defineConfig({
  base: "/",
});
```

### 3. Enable GitHub Pages

```bash
gh api repos/OWNER/REPO/pages -X POST -f build_type=workflow
gh repo edit OWNER/REPO --homepage "https://OWNER.github.io/REPO/"
```

## Custom Domain Setup

### Steps

1. **DNS**: Add a CNAME record at your DNS provider
   - Host: `subdomain` (e.g., `card`)
   - Value: `OWNER.github.io`

2. **CNAME file**: Create `public/CNAME` containing the domain

   ```
   subdomain.example.com
   ```

3. **Vite config**: Set `base: "/"`

4. **GitHub API**: Configure domain and HTTPS

   ```bash
   gh api repos/OWNER/REPO/pages -X PUT -f cname="subdomain.example.com" -F https_enforced=true
   gh repo edit OWNER/REPO --homepage "https://subdomain.example.com"
   ```

5. Wait for DNS propagation (5-30 min) and HTTPS cert provisioning

### Removing Custom Domain

1. Delete `public/CNAME`
2. Set `base: "/repo-name/"` in `vite.config.js`
3. Run: `gh api repos/OWNER/REPO/pages -X PUT -f cname=""`

## Corporate Registry Workaround

If the developer uses a corporate/private npm registry locally (e.g., Wix, Artifactory):

- **Do NOT** add a project `.npmrc` (breaks local installs)
- **Do** set registry explicitly in the CI workflow:
  ```yaml
  registry-url: https://registry.npmjs.org/
  ```
  ```yaml
  run: npm install --registry https://registry.npmjs.org/
  ```
- **Consider** gitignoring `package-lock.json` if it contains corporate registry URLs

## Common Issues

| Problem                 | Fix                                                                |
| ----------------------- | ------------------------------------------------------------------ |
| 404 on assets           | Check `base` in `vite.config.js` matches your URL path             |
| `npm ci` fails          | Lock file has corporate registry URLs; use `npm install` instead   |
| HTTPS not working       | Wait 30 min for cert; enforce with `gh api -F https_enforced=true` |
| Custom domain 404       | Verify CNAME DNS record: `dig subdomain.example.com`               |
| devDependencies missing | Ensure `vite` is in `devDependencies`, not just installed globally |
