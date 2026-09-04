# Contributing

## Setup

```bash
git clone https://github.com/khaleelii/Mobile_Store.git
cd Mobile_Store
npm install
npm run dev
```

Read [docs/README.md](./README.md) for the documentation set.

## Branching

1. Branch from `main` (`feature/…` or `fix/…`).
2. Keep PRs focused (one concern).
3. Update docs when behavior or architecture changes.
4. Do not commit `.data/` or secrets.

## Adding a product

1. Append a `Product` in `src/lib/products.ts`.
2. Set `storage[0]` to the base-priced tier.
3. Verify PDP at `/products/{slug}` and a checkout with that SKU.

## Changing checkout rules

1. Update validators in `src/lib/format.ts` / `src/lib/orders.ts`.
2. Mirror acceptance criteria in `docs/PRD.md` and `docs/API.md`.
3. Exercise `POST /api/orders` with valid + invalid payloads.

## Agent / AI contributors

Follow `docs/AGENT_CONTEXT.md` and `.cursor/rules/`. Prefer the same PR to update code + docs.

## Commit style

Imperative mood, why-focused when possible:

- `Add iPhone 17 Pro Max storage tiers to catalog`
- `Document checkout data flow and API contract`
