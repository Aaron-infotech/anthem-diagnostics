# Anthem Diagnostics Private Limited — Corporate Website

A modern, responsive corporate website built with React + Vite, Tailwind CSS,
React Router, Framer Motion, Swiper.js and AOS.

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── assets/            Images, logos, icons (add real brand assets here)
├── components/
│   ├── Navbar/         Sticky, scroll-aware navigation
│   ├── HeroSlider/      Swiper-based hero banner
│   ├── ProductCard/     Reusable product card ("sample card" styling)
│   ├── PartnerSlider/   Infinite-scroll partner logo marquee
│   ├── ClientSlider/    Infinite-scroll corporate client marquee
│   ├── Counter/         Animated count-up statistic
│   ├── Footer/          Site footer
│   ├── ContactForm/     Validated enquiry form
│   └── Common/          PageBanner, Breadcrumb, ScrollToTop, Spinner
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── NotFound.jsx
│   └── home-sections/   Individual Home page sections
├── data/               Product catalog, partners, clients, directors —
│                        edit these files to update site content
└── styles/index.css     Tailwind + design tokens
```

## Content management

All product, partner, client and leadership content lives in `src/data/`.
To add a new product, add an entry to `src/data/products.js` — it will
automatically appear on the Products page and in category filters.

## Design notes

- Brand colors are defined as CSS variables and Tailwind tokens
  (`primary` #005BAC, `accent` #EAF5FF, `ink` #1F2937).
- Typography: Space Grotesk (display), Inter (body), IBM Plex Mono (data
  labels / reference tags) — evoking lab requisition slips and instrument
  read-outs, in keeping with a diagnostics brand.
- Replace the Unsplash placeholder images in `src/data/products.js`,
  `src/data/directors.js` and the home sections with your own photography
  before launch.
- Replace `public/logo-placeholder.svg` references in `src/data/partners.js`
  and `src/data/clients.js` with real partner/client logos.
- The Google Map on the Contact page uses a generic embed for the
  Ekkatuthangal, Chennai area — swap in your exact Google Maps place
  embed link for a pinpoint location.
- The enquiry form currently logs a success state client-side only —
  connect `ContactForm.jsx`'s `handleSubmit` to your backend or an email
  service (e.g. Formspree, EmailJS) to receive real submissions.

## SEO & performance

- Semantic headings, descriptive alt text, and meta tags are set in
  `index.html` and per-page via `document.title`.
- Images use `loading="lazy"` except the first hero slide.
- Routes are code-split with `React.lazy` for faster initial load.
- `public/robots.txt` is included — update the sitemap URL once deployed.
