# MobileStore

A Next.js storefront for smartphones with a working cart and checkout.

## Features

- Browse phones with color & storage options (includes **iPhone 17 Pro Max** 256GB / 512GB / 1TB)
- Persistent cart (localStorage)
- Checkout with contact, shipping, tax, and card validation (Luhn)
- Order API that creates and stores confirmed orders
- Order confirmation page with receipt details

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/README.md](./docs/README.md) | Documentation index |
| [docs/PRD.md](./docs/PRD.md) | Product requirements |
| [docs/SYSTEM_DESIGN.md](./docs/SYSTEM_DESIGN.md) | Design decisions & ADRs |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System architecture diagrams |
| [docs/DATA_FLOW.md](./docs/DATA_FLOW.md) | Sequence & data-flow diagrams |
| [docs/DOMAIN_MODEL.md](./docs/DOMAIN_MODEL.md) | Entities & pricing |
| [docs/API.md](./docs/API.md) | HTTP API contract |
| [docs/SOURCE_OF_TRUTH.md](./docs/SOURCE_OF_TRUTH.md) | Canonical files map |
| [docs/AGENT_CONTEXT.md](./docs/AGENT_CONTEXT.md) | Shared context for coding agents |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Contributor guide |

Cursor rules for agents: [`.cursor/rules/`](./.cursor/rules/)

## Demo payment

Use card number `4242 4242 4242 4242`, any future expiry (e.g. `12/30`), and any 3-digit CVC. No real charges.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
