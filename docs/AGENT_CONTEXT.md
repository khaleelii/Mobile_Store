# Agent Context — MobileStore

**Audience:** Cursor agents, Copilot, human developers onboarding via GitHub.  
**Keep updated** when architecture or checkout rules change.

## What this project is

A **Next.js 16 + React 19 + TypeScript + Tailwind 4** smartphone storefront with:

- Static catalog in code
- Client cart (localStorage)
- Demo checkout (Luhn validation, no Stripe)
- File-backed orders (`.data/orders.json`, gitignored)

Repo: https://github.com/khaleelii/Mobile_Store

## Before coding

1. Read `docs/PRD.md` for scope (what is / isn’t in MVP).
2. Read `docs/SOURCE_OF_TRUTH.md` for which file owns which fact.
3. For Next.js APIs, read `node_modules/next/dist/docs/` — this Next version differs from older training data (`AGENTS.md`).
4. Prefer small, focused diffs; match existing patterns in `src/`.

## Hard rules for agents

- **Do not** invent a database, auth, or Stripe unless the user asks.
- **Do not** commit `.env*`, `.data/`, or real card numbers.
- **Server is authority** for totals and validation (`src/lib/orders.ts`).
- **Catalog changes** go in `src/lib/products.ts` with unique `id`/`slug`.
- **Types** stay in `src/lib/types.ts` — import, don’t copy.
- **UI styles** primarily live in `src/app/globals.css` (design tokens + classes). Preserve the cobalt visual system unless redesign is requested.
- Demo payment card for docs/tests: `4242 4242 4242 4242`.

## Primary routes

| Path | Role |
|------|------|
| `/` | Hero + catalog |
| `/products/[id]` | PDP (slug) |
| `/cart` | Cart |
| `/checkout` | Checkout form |
| `/order/[id]` | Confirmation |
| `POST /api/orders` | Create order |
| `GET /api/orders/[id]` | Fetch order |

## Cart line key

`productId` + `color` + `storage` — merging and removals must use all three.

## Pricing reminder

`getUnitPrice(product, storage)` is **relative to `product.storage[0]`**. Don’t assume 128GB is always base.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Docs map

Start at [`docs/README.md`](./README.md).

## Out of scope unless requested

Auth, Stripe, Supabase, admin UI, email receipts, inventory sync, multi-currency.
