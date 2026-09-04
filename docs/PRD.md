# Product Requirements Document (PRD)

**Product:** MobileStore  
**Repo:** `khaleelii/Mobile_Store`  
**Status:** MVP live (demo checkout)  
**Last updated:** 2026-09-04

---

## 1. Problem

Buyers need a simple way to browse smartphones, configure options (color / storage), and complete checkout with a clear order confirmation — without requiring a full commerce platform for the first version.

## 2. Goals

| Priority | Goal |
|----------|------|
| P0 | Browse a curated phone catalog |
| P0 | Configure color, storage, quantity and add to cart |
| P0 | Persist cart across page reloads (same browser) |
| P0 | Checkout with contact, shipping address, shipping method, and payment fields |
| P0 | Server-side validation and order creation |
| P0 | Order confirmation page with receipt details |
| P1 | Transparent pricing (storage uplift, tax, shipping) |
| P2 | Real payment processor (Stripe) — **out of current MVP** |
| P2 | Auth, inventory sync DB, admin panel — **out of current MVP** |

## 3. Non-goals (MVP)

- User accounts / login
- Real card charging or PCI-compliant payment gateway
- Multi-currency, multi-warehouse inventory
- Returns / refunds workflows
- CMS for catalog editing
- Email / SMS receipt delivery

## 4. Personas

1. **Shopper** — picks a phone, configures it, pays with demo card, sees confirmation.
2. **Developer / agent** — extends catalog, checkout rules, or UI using docs + source-of-truth files.

## 5. User journeys

### 5.1 Happy path — purchase

1. Land on `/` → see brand hero + catalog.
2. Open `/products/{slug}` → choose color, storage, qty → **Add to cart** or **Buy now**.
3. Review `/cart` → adjust qty → **Proceed to checkout**.
4. Complete `/checkout` (contact, address, shipping, card) → submit.
5. Cart clears → `/order/{orderId}` shows paid receipt.

### 5.2 Empty cart

- Visiting `/checkout` with no items shows empty state + link back to shop.

### 5.3 Validation failure

- Invalid fields return field-level errors; order is not created; cart is retained.

## 6. Functional requirements

| ID | Requirement | Acceptance |
|----|-------------|------------|
| FR-01 | Catalog lists all products from `src/lib/products.ts` | Home `#catalog` shows every product |
| FR-02 | PDP supports color + storage + qty within stock | Cannot exceed `product.stock` |
| FR-03 | Cart line key = productId + color + storage | Same config merges quantities |
| FR-04 | Cart persists in `localStorage` key `mobile-store-cart-v1` | Reload keeps items |
| FR-05 | Checkout validates email, phone, address, ZIP, card (Luhn), expiry, CVC | Invalid → 400 + messages |
| FR-06 | Shipping methods: standard $0, express $14.99, overnight $29.99 | Summary updates live |
| FR-07 | Tax = 8% of merchandise subtotal (not shipping) | Matches `calcTax` |
| FR-08 | Successful POST creates order id `MS-XXXXXXXX` status `paid` | Written under `.data/orders.json` |
| FR-09 | Confirmation page loads order by id via API | Shows items, totals, ship-to, last4 |
| FR-10 | Demo card `4242 4242 4242 4242` must pass Luhn | Documented in README |

## 7. Non-functional requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | Next.js App Router + TypeScript |
| NFR-02 | Responsive layout (mobile + desktop) |
| NFR-03 | No secrets in git; `.data/` gitignored |
| NFR-04 | Agents must follow `docs/AGENT_CONTEXT.md` and `.cursor/rules/` |
| NFR-05 | Order store is local filesystem — not for multi-instance production without replacement |

## 8. Success metrics (MVP)

- Developer can run `npm run dev` and complete a demo purchase in &lt; 3 minutes.
- Checkout rejects known-bad cards and empty carts.
- Documentation enables a second developer to add a product without reading all source.

## 9. Open decisions / future

- Replace `.data/orders.json` with Supabase / Postgres.
- Integrate Stripe Payment Intents.
- Add admin order list and stock decrement.
- Deploy to Vercel with durable storage.
