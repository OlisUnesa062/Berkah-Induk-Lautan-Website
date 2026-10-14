# Berkah Induk Lautan

Company website for Berkah Induk Lautan, a full service maritime agency from Indonesia.
Built with React, Vite and Tailwind CSS.

## Development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
pnpm preview
```

`pnpm build` also prerenders one static HTML page per language (`dist/index.html` and
`dist/en/index.html`) and writes `sitemap.xml` and `robots.txt`, so search engines can read
the content without running JavaScript.

## Languages & SEO

- Bahasa Indonesia is the default at `/`, English is at `/en`. Visitors switch with the
  **ID | EN** toggle in the header.
- All copy outside the hero lives in `src/i18n.ts` (the `id` and `en` objects share one shape).
- Title, description, canonical, `hreflang`, Open Graph and JSON-LD come from `src/seo.ts`.
- Canonical/hreflang URLs and the sitemap need the production domain. On Vercel it is picked up
  automatically from `VERCEL_PROJECT_PRODUCTION_URL`; to set it explicitly, add an environment
  variable `SITE_URL=https://your-domain.com`.

## Deployment

Deployed on Vercel. Every push to `main` triggers a new deployment.
