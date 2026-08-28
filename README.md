# Stelike Exclusives — Demo

Pitch demo for Stelike Exclusives, a furniture and interior pieces business
in Accra, Ghana (also serving Achimota and East Legon). Built with React,
TypeScript and Vite, deployed on Cloudflare Workers. Put together by
[Noven Digital](https://noven-digital.mensahtonton.workers.dev/).

Rebranded from an earlier demo repo (iDeals GH) — same app-shell
architecture (mobile-first, top nav + bottom nav, product grid, cart),
re-skinned and re-populated for furniture.

## What's real vs placeholder

- All product images are placeholders. Swap them in `src/data/products.ts`
  once real photos are available.
- All prices and stock counts are placeholder numbers for the demo.
- Only the Home page is fully built. Shop, Orders, About Us, Profile and
  Cart are placeholder pages ready to be filled in.
- The favicon is a simple lettermark, not the real logo — Stelike's actual
  logo is a raster wordmark (no vector/icon-only mark to trace from yet).

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Cloudflare Workers

Requires a Cloudflare account. Log in once with:

```bash
npx wrangler login
```

Then deploy:

```bash
npm run deploy
```

This builds the app and pushes the `dist` folder to Cloudflare Workers as
static assets (configured in `wrangler.toml`).

## Project structure

```
src/
  components/   Reusable UI: TopNav, HeroBanner, CategoryCircles, ProductCard, NewDeals, Footer, BottomNav
  pages/        Route-level pages: Home is fully built, others are placeholders
  data/         Mock product and category data
  types.ts      Shared TypeScript types
```
