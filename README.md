# GoCadence — Setup and Operations Guide

This document captures every step we took to launch `gocadence.tech` using GitHub Pages, including exact buttons, tabs, and values. Save it for future reference or to repeat the setup for another site.

## Live URLs
- Primary: https://gocadence.tech
- Alternate: https://www.gocadence.tech

## Repository
Local path: `c:\Users\vital\OneDrive\Documents\GitHub\GoCadence`

Files we created/edited:
- `index.html` — single‑file responsive site (header/nav, hero, features, about, contact, footer, small JS)
- `robots.txt` — allows indexing and points to sitemap
- `sitemap.xml` — basic sitemap listing the homepage
- `favicon.svg` — site icon
- `og-image.svg` — social preview image (Open Graph/Twitter)
- `404.html` — friendly not‑found page for GitHub Pages

---

## 1) Create/Publish the GitHub Repository
You can do this either on the web or entirely in GitHub Desktop.

Option A — GitHub Desktop (what you used)
1. Open GitHub Desktop.
2. Menu `File` → `Add local repository…` → Choose `c:\Users\vital\OneDrive\Documents\GitHub\GoCadence`.
3. If prompted, click `Publish repository` to push it to GitHub.
4. When you see changes:
   - Summary: e.g., `Initial site`
   - Click `Commit to main`
   - Click `Push origin`

Option B — GitHub Web
1. Go to https://github.com/new → Create a public repo (e.g., `GoCadence`).
2. Push with CLI: `git init`, `git branch -M main`, `git add .`, `git commit -m "Initial site"`, `git remote add origin https://github.com/USERNAME/REPO.git`, `git push -u origin main`.

---

## 2) Enable GitHub Pages
1. On GitHub, open your repo → `Settings` → `Pages` (left sidebar).
2. Build and deployment → `Source`: `Deploy from a branch`.
3. Branch: `main`  |  Folder: `/ (root)` → `Save`.
4. Wait ~1–2 minutes for the site URL to appear (temporary Pages URL). Confirm it loads.

---

## 3) Configure Custom Domain in GitHub Pages
1. Repo → `Settings` → `Pages`.
2. In `Custom domain`, enter: `gocadence.tech` → `Save`.
3. A `CNAME` file is created/used with content `gocadence.tech`.

If you see DNS errors here, that’s expected until DNS is configured in your registrar.

---

## 4) DNS at .TECH Domains (Registrar)
Open your .TECH Admin Area → `DNS Management (Free)`.

A Records (apex `@`)
- Click `A Records` → `Add A Record` four times with these values:
  - Host Name: `@` → Destination IPv4: `185.199.108.153` → Save
  - Host Name: `@` → Destination IPv4: `185.199.109.153` → Save
  - Host Name: `@` → Destination IPv4: `185.199.110.153` → Save
  - Host Name: `@` → Destination IPv4: `185.199.111.153` → Save
- TTL: default (or `3600`) is fine.

CNAME (www)
- Click `CNAME Records` → `Add CNAME Record`.
  - Host Name: `www`
  - Value: `elgniston.github.io`
  - Save

Why these IPs?
- `185.199.108/109/110/111.153` are GitHub Pages anycast edge IPs (redundant, globally routed). Using all four improves availability/performance.

Optional IPv6 (AAAA for `@`)
- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

---

## 5) Enable HTTPS
1. Go back to GitHub → Repo → `Settings` → `Pages`.
2. Click `Check again` under Custom domain.
3. When DNS is verified, enable `Enforce HTTPS`.

Notes
- GitHub automatically provisions a TLS certificate from Let’s Encrypt for `gocadence.tech` and `www.gocadence.tech` (SANs).
- Certificate is served from GitHub’s edge; nothing to install locally.

---

## 6) Verify the Live Site
- Visit `https://gocadence.tech` and `https://www.gocadence.tech` — both should load over HTTPS and show the site.

---

## 7) Branding & SEO in `index.html`
Head tags include:
- `<title>GoCadence</title>`
- `<meta name="description" content="GoCadence — a simple, fast project site.">`
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`
- `<meta name="theme-color" content="#0b0f14">`
- `<link rel="canonical" href="https://gocadence.tech/">`
- Open Graph: `og:title`, `og:description`, `og:type`, `og:url`
- Social image: `og:image` → `https://gocadence.tech/og-image.svg`
- Twitter: `summary_large_image` and `twitter:image`

Branding text in header/footer is set to `GoCadence`.

Contact email (Contact section)
- Mail link: `mailto:gotskostudy@gmail.com` (visible text: `gotskostudy@gmail.com`).

---

## 8) robots.txt and sitemap.xml
- `robots.txt` (site root):
  ```
  User-agent: *
  Allow: /
  Sitemap: https://gocadence.tech/sitemap.xml
  ```
- `sitemap.xml` (basic URL set containing the homepage, `changefreq=weekly`).

Check live:
- `https://gocadence.tech/robots.txt`
- `https://gocadence.tech/sitemap.xml`

---

## 9) Google Search Console
1. Go to https://search.google.com/search-console
2. `Add property` → `Domain` → enter `gocadence.tech` → `Continue`.
3. Copy the DNS TXT token (example used during setup):
   - `google-site-verification=pRM1joFTy2ZFRjXoTMsvA_Vkjk8m9hXULDDPMB5YxS4`
4. In .TECH DNS panel → `TXT Records` → `Add TXT Record`:
   - Host/Name: `@`
   - Value: paste the token → Save
5. Back in Search Console → `Verify` → success.
6. Submit sitemap: left sidebar `Sitemaps` → add `sitemap.xml` (or full URL) → `Submit`.
7. Request indexing for homepage: `URL Inspection` → paste `https://gocadence.tech/` → `Test live URL` → `Request indexing`.

Indexing is a background process; first appearances can take hours to a few days.

---

## 10) Social Preview & 404 Page
- `og-image.svg` — Open Graph/Twitter image (1200×630); referenced by `og:image` and `twitter:image`.
- `404.html` — custom not‑found page used automatically by GitHub Pages for bad URLs.

To refresh social previews, use platform debuggers (they may cache for a while).

---

## 11) Everyday Maintenance (GitHub Desktop)
- Make changes locally → In GitHub Desktop:
  1. Enter a `Summary` (short commit message)
  2. Click `Commit to main`
  3. Click `Push origin`
- If the live site shows old content, hard refresh (Ctrl+F5) or open in incognito. You can also append a cache buster, e.g., `?v=2`.

---

## 12) Troubleshooting
DNS check fails in GitHub Pages
- Apex `@`: only the four A records listed above.
- `www`: only a CNAME to `elgniston.github.io`.
- Avoid extra/duplicate A/AAAA on `www`.
- If using a proxy (e.g., Cloudflare), set DNS to `DNS only` until after the certificate is issued.

`Enforce HTTPS` is grayed out
- Wait 5–30 minutes; click `Check again`.
- Confirm DNS is exactly as above; remove conflicting CAA records if present.

Email still shows old value on the live site
- Ensure you `Push origin` in GitHub Desktop.
- Hard refresh the browser or use `?v=2`.

---

## 13) Optional Enhancements
- Add an Apple touch icon and `site.webmanifest` for better mobile icons.
- Add a header “Email us” button with prefilled subject: `mailto:gotskostudy@gmail.com?subject=Hello%20from%20GoCadence`.
- Privacy‑friendly analytics (Plausible) or GA4.
- Registrar redirect `www →` apex (or vice versa) if you want a single canonical hostname (you already set a canonical tag).

---

## Quick References
GitHub Pages A records (apex `@`)
- `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

GitHub Pages AAAA (IPv6, optional)
- `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`

Primary files to edit
- `index.html` — content, branding, meta tags
- `robots.txt` — crawl rules
- `sitemap.xml` — page discovery

Commit & push (Desktop)
- Summary → `Commit to main` → `Push origin`

That’s it — you now have a complete record of how `gocadence.tech` was launched and how to keep it running smoothly.

