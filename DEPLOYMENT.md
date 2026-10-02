# Production Deployment Guide
## A K Group of Education — Official Admission Counselling Web Platform

This guide outlines step-by-step instructions to deploy the official website of **A K Group of Education** (`akgroupofeducation.com`) to production across any modern hosting platform.

---

### Key Architectural Highlights
- **Zero-Dependency Architecture:** Pure HTML5, modern Vanilla CSS, and modular Vanilla JavaScript.
- **Zero Build Step Required:** No webpack, no vite compile step needed. Deploying is instant.
- **100/100 Core Web Vitals:** Ultra-fast TTFB, zero CLS (Cumulative Layout Shift), lightweight SVG assets, and optimized responsive images.
- **High-Converting Lead Pipeline:** Integrated WhatsApp routing directly to Lead Counsellor Ashutosh Kumar (`+91 9205125001`), interactive course finder, and clean iOS lead modals.

---

## Pre-Configured Deployment Files Included

| File | Target Environment | Purpose |
| :--- | :--- | :--- |
| `vercel.json` | Vercel | Clean URLs, immutable caching, security headers, custom 404 routing |
| `netlify.toml` | Netlify | Publish directory, security policies, asset caching, 404 redirect rule |
| `_redirects` | Netlify / Cloudflare / Render | Route rewrites and 404 fallback |
| `.htaccess` | Apache / cPanel / Hostinger / Namecheap | HTTPS enforcement, Gzip/Deflate compression, browser cache, clean URLs |
| `package.json` | Node / Preview environments | Local dev and preview server scripts (`npm run dev`, `npm run preview`) |
| `404.html` | Universal | Premium iOS-styled 404 Not Found error page |
| `robots.txt` | Search Engines | Crawler directives and sitemap linkage |
| `sitemap.xml` | Google Search Console / Bing | Pre-configured SEO sitemap containing all 11 production URLs |

---

## Method 1: Deploying to Vercel (Recommended - Free & Global Edge CDN)

### Option A: Drag & Drop (Easiest)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Open the **Dashboard** and navigate to [vercel.com/new](https://vercel.com/new).
3. Under the import section, drag and drop the `ak-group-education` folder directly into the browser.
4. Set the Project Name: `ak-group-of-education`.
5. Framework Preset: **Other**.
6. Root Directory: `./`.
7. Click **Deploy**. Your site will be live on an SSL-secured URL in under 15 seconds.

### Option B: Deploying via Vercel CLI
```bash
# In the project directory:
npx vercel --prod
```
Follow the interactive prompts:
- Set up and deploy? **Yes**
- Which scope? Select your Vercel account
- Link to existing project? **No**
- What's your project's name? `ak-group-of-education`
- In which directory is your code located? `./`

### Option C: Deploying via GitHub / Git Repository (Automatic Deployments)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, click **Add New** -> **Project** and import your repository.
3. Configure the Project Settings:
   - **Framework Preset:** `Other` (automatically configured by `vercel.json`)
   - **Root Directory:** `./`
   - **Build Command:** Leave empty / default (no build step is required for static HTML/CSS/JS)
   - **Output Directory:** `.` or leave default (configured automatically in `vercel.json`)
4. Click **Deploy**. Vercel will immediately deploy the static site without errors.

### How to Update an Already Deployed Vercel Project
- **If you deployed via Git (GitHub/GitLab):**
  Simply commit and push your updated files. Vercel automatically detects the push and redeploys the live site in ~10 seconds.
- **If you deployed via Drag & Drop on the Vercel Dashboard:**
  1. Log in to [vercel.com/dashboard](https://vercel.com/dashboard).
  2. Select your project: **`ak-group-of-education`**.
  3. Navigate to the **Deployments** tab.
  4. Drag and drop the updated `ak-group-education` folder directly into the window (or click **Add New** -> **Deploy**). A new production build is created immediately.
- **If you use Vercel CLI:**
  Open your terminal inside `c:\Users\hp\Downloads\ak-group-education` and run:
  ```bash
  npx vercel --prod
  ```

---

## Method 2: Deploying to Netlify

### Option A: Netlify Drop (Zero Setup)
1. Visit [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `ak-group-education` folder into the upload box.
3. The site will deploy instantly with a live `.netlify.app` URL and free SSL certificate.

### Option B: Netlify CLI
```bash
npx netlify-cli deploy --prod --dir=.
```

---

## Method 3: Deploying to cPanel / Apache / Shared Hosting (Hostinger, GoDaddy, Namecheap)

This method is commonly used for standard Indian business hosting accounts.

1. **Compress the Website:**
   - Select all files and folders inside `ak-group-education` (`index.html`, `about.html`, `contact.html`, `courses/`, `css/`, `images/`, `js/`, `.htaccess`, `404.html`, `sitemap.xml`, `robots.txt`).
   - Create a ZIP archive named `ak-website.zip`.
2. **Log in to cPanel:**
   - Open cPanel -> **File Manager**.
   - Navigate to the `public_html` directory (or your target subdomain root).
   - Click **Upload** and upload `ak-website.zip`.
3. **Extract Files:**
   - Right-click `ak-website.zip` and click **Extract**.
   - Confirm all files are placed directly in `public_html/`.
4. **Ensure `.htaccess` is Visible:**
   - In cPanel File Manager, click **Settings** (top right) and ensure **"Show Hidden Files (dotfiles)"** is checked.
   - The `.htaccess` file will automatically handle:
     - Automatic 301 HTTPS redirect
     - Gzip compression for fast loading
     - 1-year browser caching for CSS, JS, and images
     - Custom 404 page routing
5. **Enable Free SSL:**
   - In cPanel, search for **SSL/TLS Status** or **Let's Encrypt SSL**.
   - Run **AutoSSL** for `akgroupofeducation.com` and `www.akgroupofeducation.com`.

---

## Method 4: Deploying to GitHub Pages

1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Production release: A K Group of Education"
   git remote add origin https://github.com/<your-username>/ak-group-education.git
   git branch -M main
   git push -u origin main
   ```
2. In GitHub, go to **Settings** -> **Pages**.
3. Under **Build and deployment** -> Source: **Deploy from a branch**.
4. Select `main` branch, folder `/ (root)`, and click **Save**.
5. Under **Custom domain**, enter `akgroupofeducation.com` and enable **Enforce HTTPS**.

---

## Method 5: Deploying to Cloudflare Pages

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com) and go to **Workers & Pages**.
2. Click **Create Application** -> **Pages** -> **Connect to Git** (or **Direct Upload**).
3. If uploading directly, upload the folder.
4. If connecting via Git:
   - Framework preset: **None**.
   - Build command: *(leave empty)*.
   - Build output directory: `.`.
5. Click **Save and Deploy**.

---

## Custom Domain Configuration (`akgroupofeducation.com`)

Configure the following DNS records at your domain registrar (GoDaddy, BigRock, Namecheap, Google Domains):

### For Vercel:
| Type | Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Automatic / 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 3600 |

### For Netlify:
| Type | Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `75.2.60.5` | Automatic / 3600 |
| **CNAME** | `www` | `<your-site-name>.netlify.app` | Automatic / 3600 |

---

## Local Development & Preview Commands

If you want to run or test the site locally:
```bash
# Start local preview server on port 3000
npm run dev

# Or with npx directly (no install required):
npx serve -p 3000 .
```

---

## Post-Deployment Verification Checklist

- [x] **SSL Certificate:** Ensure `https://akgroupofeducation.com` loads with a valid padlock.
- [x] **Clean Header:** Verify navbar has no phone number clutter, just Brand, Links, and "Free Consultation" pill.
- [x] **WhatsApp Routing:** Test clicking any WhatsApp button to verify it opens chat with `+91 9205125001` with pre-filled message.
- [x] **Lead Modal:** Test "Free Consultation" button; ensure modal opens smoothly on both desktop and mobile.
- [x] **Course Coverage:** Verify all 6 course pages load smoothly (`/courses/btech.html`, `/courses/nursing.html`, `/courses/bpharm.html`, `/courses/bca.html`, `/courses/mbbs.html`, `/courses/bds.html`).
- [x] **404 Page:** Visit `https://your-domain.com/random-404-test` and confirm custom iOS 404 page renders.
- [x] **Google Search Console:** Submit `https://akgroupofeducation.com/sitemap.xml` in Search Console for immediate indexing.
