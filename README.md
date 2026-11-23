# Chaitanya Vibhute – Portfolio

React 18 + Vite + Tailwind CSS (JavaScript only). Four routes: `/`, `/about`, `/experience`, `/contact`.

## Run

```bash
npm install
cp .env.example .env   # fill in EmailJS values
npm run dev
npm run build          # production build in dist/
```

## Before you deploy

1. **Resume** – put your PDF at `public/resume.pdf` (the Download Resume buttons point there).
2. **EmailJS** – create a service and template at emailjs.com. Template variables used:
   `from_name`, `reply_to`, `subject`, `message`. Put the three public IDs in `.env`
   (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`).
   On Vercel/Netlify, add the same variables in the project settings.
3. **Social links** – set `VITE_LINKEDIN_URL` and `VITE_GITHUB_URL`. Until then, placeholders are shown.
4. **Domain** – set `VITE_SITE_URL`, and replace `YOUR-DOMAIN.com` in `public/sitemap.xml` and `public/robots.txt`.
5. **Experience figure** – "3+ years" is used as supplied. Your listed role starts February 2024, so confirm the
   figure against your full history (earlier roles, internships) or adjust it in `src/data/profile.js` and the
   few literal strings in pages.

## Deploy

- **Vercel**: import the repo; `vercel.json` handles SPA route fallback.
- **Netlify**: `netlify.toml` and `public/_redirects` handle SPA fallback.

## Architecture notes

- One scroll engine: `src/animations/ScrollEngine.jsx` (Lenis driven by GSAP's ticker, synced with ScrollTrigger).
- 3D (three.js / react-three-fiber) lives in a lazy chunk with a CSS fallback if WebGL is unavailable.
- Particles are a small custom canvas component instead of a particle library.
- Custom cursor is disabled on touch devices and with `prefers-reduced-motion`.
- All content lives in `src/data/profile.js`.

## Libraries intentionally not used

AOS, Lottie, tsParticles, OGL, Swiper and @use-gesture were left out: Framer Motion, GSAP and a small canvas
cover those needs, and extra overlapping animation systems would add weight and scroll conflicts.
