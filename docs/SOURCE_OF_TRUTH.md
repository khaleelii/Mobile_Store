# Source of Truth

When docs and code disagree, **code wins** — then update docs in the same PR.

| Concern | Canonical file(s) | Notes |
|---------|-------------------|-------|
| Product catalog & storage premiums | `src/lib/products.ts` | Edit here to add phones |
| Domain types | `src/lib/types.ts` | Shared TS contracts |
| Checkout validation & order write | `src/lib/orders.ts` | Server authority |
| Money / shipping / tax / card helpers | `src/lib/format.ts` | |
| Cart behavior & storage key | `src/components/CartProvider.tsx` | `mobile-store-cart-v1` |
| Checkout UX | `src/components/CheckoutForm.tsx` | |
| Visual design tokens / layout CSS | `src/app/globals.css` | Includes phone wallpapers + payment badges |
| Brand logo | `src/components/BrandLogo.tsx` | Header + footer |
| Phone display mock | `src/components/ProductCard.tsx` (`PhoneVisual`) | Sizes: `sm` \| `md` \| `lg` |
| Payment method badges | `src/components/PaymentBrands.tsx` | Checkout UX only |
| App chrome / fonts / providers | `src/app/layout.tsx` | |
| HTTP contracts | `src/app/api/orders/**` | Keep `docs/API.md` aligned |
| Product requirements | `docs/PRD.md` | Goals & acceptance |
| Architecture & flows | `docs/ARCHITECTURE.md`, `docs/DATA_FLOW.md` | |
| Agent operating context | `docs/AGENT_CONTEXT.md` + `.cursor/rules/` | Shared with all agents |
| Next.js version caveats | `AGENTS.md` (generated block) | Read Next dist docs |
| Dependencies / scripts | `package.json` | |
| Ignore rules (orders dir, env) | `.gitignore` | `.data` must stay ignored |

## Do not treat as source of truth

| Artifact | Why |
|----------|-----|
| Client-rendered price summary alone | Recalculated on server at order time |
| Chat history / agent transcripts | Ephemeral; capture decisions in docs |
| `.data/orders.json` | Runtime data, not schema |
| Stale screenshots | Prefer live routes |

## Change protocol

1. Change code (canonical file).
2. Update matching `docs/*` section.
3. If behavior affects agents, update `docs/AGENT_CONTEXT.md` and `.cursor/rules/`.
4. Commit docs with the feature (same PR when possible).
