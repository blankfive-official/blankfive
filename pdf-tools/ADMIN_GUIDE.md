# Blank Five PDF Tools — Admin Guide

Complete guide for installation, deployment, maintenance, and customization.

---

## Table of Contents

1. [Quick Start (Local Development)](#1-quick-start-local-development)
2. [Deployment to Hostinger](#2-deployment-to-hostinger)
3. [Project Structure](#3-project-structure)
4. [Adding a New Tool](#4-adding-a-new-tool)
5. [Customizing the Design](#5-customizing-the-design)
6. [SEO Customization](#6-seo-customization)
7. [Performance Optimization](#7-performance-optimization)
8. [Troubleshooting](#8-troubleshooting)
9. [Maintenance Checklist](#9-maintenance-checklist)

---

## 1. Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Setup
```bash
# Navigate to the project directory
cd pdf-tools

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Building for Production
```bash
npm run build
```

This generates the `dist/` folder with all optimized, minified, and hashed assets.

### Preview Production Build
```bash
npm run preview
```

---

## 2. Deployment to Hostinger

### Step-by-Step

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Access Hostinger File Manager** (or use FTP):
   - Go to hPanel → Files → File Manager
   - Navigate to `public_html/`

3. **Upload the build output:**
   - Upload all contents of the `dist/` folder into `public_html/`
   - This includes `index.html`, `assets/`, and `.htaccess`

4. **Upload the PHP API:**
   - Create a folder `public_html/api/`
   - Upload `api/config.php`, `api/compress.php`, and `api/.htaccess`

5. **Verify `.htaccess` is in place:**
   - The `.htaccess` file from `public/` should be in `public_html/` (root)
   - The `api/.htaccess` should be inside `public_html/api/`

6. **Enable SSL (if not already):**
   - Go to hPanel → Security → SSL
   - Enable free SSL certificate
   - Uncomment the HTTPS redirect lines in `.htaccess`

7. **Verify the site:**
   - Visit your domain
   - Test each tool with a sample PDF
   - Check mobile responsiveness

### Final Directory Structure on Hostinger
```
public_html/
├── .htaccess            ← SPA routing + caching + security
├── index.html           ← Vite build output
├── assets/              ← JS/CSS bundles (hashed filenames)
│   ├── index-abc123.js
│   ├── index-def456.css
│   ├── pdf-lib-xyz789.js
│   └── ...
├── favicon.svg
└── api/                 ← PHP backend
    ├── .htaccess
    ├── config.php
    └── compress.php
```

---

## 3. Project Structure

```
pdf-tools/
├── index.html                      # HTML entry point with SEO meta
├── package.json                    # Dependencies
├── vite.config.js                  # Build configuration
├── tailwind.config.js              # Design tokens (colors, fonts)
├── public/
│   ├── .htaccess                   # Deployment routing rules
│   └── favicon.svg                 # Site favicon
├── src/
│   ├── main.jsx                    # React entry
│   ├── App.jsx                     # Router + lazy loading
│   ├── index.css                   # Global design system
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer, Layout
│   │   ├── home/                   # Hero, ToolGrid, Features
│   │   └── tools/                  # FileDropzone, FileList, etc.
│   ├── pages/                      # One page per tool
│   │   ├── Home.jsx
│   │   ├── MergePdf.jsx
│   │   ├── SplitPdf.jsx
│   │   └── ...
│   └── lib/                        # PDF processing engines
│       ├── pdf-engine.js           # Merge, split, rotate
│       ├── pdf-renderer.js         # PDF → JPG
│       ├── image-to-pdf.js         # JPG → PDF
│       ├── compressor.js           # PDF compression
│       ├── unlocker.js             # PDF unlock
│       └── file-utils.js           # Download/zip helpers
└── api/                            # PHP backend
    ├── config.php
    ├── compress.php
    └── .htaccess
```

---

## 4. Adding a New Tool

Follow these steps to add a new PDF tool (e.g., "Watermark PDF"):

### Step 1: Create the processing logic
Create `src/lib/watermark.js` with the core functionality.

### Step 2: Create the page component
Create `src/pages/WatermarkPdf.jsx` following the pattern of existing tools:
- Import `ToolHero`, `FileDropzone`, `ProgressBar`, `DownloadButton`
- Implement the upload → process → download flow

### Step 3: Add the route
In `src/App.jsx`, add the lazy import and route:
```jsx
const WatermarkPdf = lazy(() => import("@/pages/WatermarkPdf"));

// Inside <Routes>:
<Route path="/watermark-pdf" element={<WatermarkPdf />} />
```

### Step 4: Add to the tool registry
In `src/components/home/ToolCard.jsx`, add to the `TOOLS` array:
```js
{
  id: "watermark-pdf",
  label: "Watermark PDF",
  description: "Add text or image watermarks to your PDF pages.",
  icon: Stamp,    // from lucide-react
  color: "#06b6d4",
  colorClass: "tool-watermark",
  path: "/watermark-pdf",
}
```

### Step 5: Update Tailwind config
Add the new color to `tailwind.config.js`:
```js
'tool-watermark': '#06b6d4',
```

### Step 6: Update navigation
The Navbar and Footer automatically pick up tools from the `TOOLS` array and tool links array respectively. Update the `tools` array in `Navbar.jsx` and the `toolLinks` array in `Footer.jsx`.

### Step 7: Build and deploy
```bash
npm run build
# Upload dist/ to Hostinger
```

---

## 5. Customizing the Design

### Colors
All colors are defined in two places:
1. **CSS Variables** in `src/index.css` (`:root` block)
2. **Tailwind Config** in `tailwind.config.js`

To change the brand color, update both:
```css
/* index.css */
--brand: #ff4d00;  /* Change this */
```
```js
// tailwind.config.js
brand: '#ff4d00',  // And this
```

### Typography
Fonts are loaded via Google Fonts and Fontshare in `index.html`:
- **Clash Display** — Headings (`.font-display`)
- **Manrope** — Body text
- **IBM Plex Mono** — Labels, mono text (`.font-mono`)

To change fonts, update the `<link>` tags in `index.html` and the `fontFamily` section in `tailwind.config.js`.

### Logo
The logo is an inline SVG in `Navbar.jsx` and `Footer.jsx`. To use a custom logo image:
```jsx
<img src="/logo.png" alt="Your Logo" className="h-8 w-auto" />
```
Upload `logo.png` to `public/` and it will be included in the build.

---

## 6. SEO Customization

### Page-Level SEO
Each tool page updates its `<title>` and meta description in its `useEffect`:
```jsx
useEffect(() => {
  document.title = "Your Page Title | Brand Name";
  document.querySelector('meta[name="description"]')
    ?.setAttribute("content", "Your description here");
}, []);
```

### Global SEO
Update these in `index.html`:
- `<title>` tag
- `<meta name="description">`
- `<meta name="keywords">`
- `<link rel="canonical">`
- Open Graph tags (`og:*`)
- Twitter Card tags
- JSON-LD structured data

### Sitemap
Create a `public/sitemap.xml` for search engines:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yourdomain.com/</loc></url>
  <url><loc>https://yourdomain.com/merge-pdf</loc></url>
  <url><loc>https://yourdomain.com/split-pdf</loc></url>
  <!-- Add all tool URLs -->
</urlset>
```

---

## 7. Performance Optimization

### Already Implemented
- **Code splitting** — Each tool page is lazy-loaded
- **Library splitting** — pdf-lib and pdfjs-dist are separate chunks
- **Font preloading** — Critical fonts loaded with `<link rel="preload">`
- **Gzip compression** — Enabled via `.htaccess`
- **Long-term caching** — Vite hashes filenames; `.htaccess` sets 1-year cache
- **Tree shaking** — Vite removes unused code automatically

### Additional Optimizations
1. **Cloudflare CDN** (free):
   - Sign up at cloudflare.com
   - Point your domain's nameservers to Cloudflare
   - Enable "Auto Minify" for HTML/CSS/JS
   - Enable Brotli compression

2. **Image optimization**:
   - Use WebP format for any raster images
   - Keep SVG icons (already done)

3. **Preconnect to external resources**:
   - Already done for Google Fonts in `index.html`

---

## 8. Troubleshooting

### "Page not found" on direct URL access
The `.htaccess` SPA rewrite rule isn't working. Ensure:
- `mod_rewrite` is enabled on Hostinger
- The `.htaccess` file is in `public_html/` root
- The `RewriteEngine On` directive is present

### PDF tools not working
- Check browser console for JavaScript errors
- Ensure the browser supports ES2020+ (all modern browsers do)
- Very large PDFs (>100MB) may cause browser memory issues

### PHP API returning errors
- Check PHP version: requires 7.4+
- Verify file upload limits in `api/.htaccess`
- Check `error_log` in hPanel for PHP errors
- Ensure `public_html/api/` directory has correct permissions (755)

### Fonts not loading
- Check that font CDN URLs are accessible
- Verify `<link>` tags in `index.html` are correct
- Check for mixed content issues (HTTP fonts on HTTPS site)

---

## 9. Maintenance Checklist

### Monthly
- [ ] Check for npm dependency updates: `npm outdated`
- [ ] Run `npm update` for patch/minor versions
- [ ] Test all 7 tools with sample files
- [ ] Check Hostinger disk space usage

### Quarterly
- [ ] Review and update SEO meta tags
- [ ] Check Google Search Console for crawl errors
- [ ] Update structured data if tools change
- [ ] Review browser compatibility (test on latest Chrome, Firefox, Safari, Edge)

### When Adding Features
- [ ] Follow the "Adding a New Tool" guide above
- [ ] Update the sitemap
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit (aim for 90+ on all scores)
- [ ] Deploy and verify on staging before production
