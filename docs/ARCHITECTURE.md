# System Architecture

## 1. Context (C4-style)

```mermaid
C4Context
  title MobileStore system context
  Person(shopper, "Shopper", "Browses phones and checks out")
  System(store, "MobileStore", "Next.js storefront + order API")
  System_Ext(browser, "Browser storage", "localStorage cart")
  SystemDb(disk, "Local filesystem", ".data/orders.json")
  Rel(shopper, store, "HTTPS")
  Rel(store, browser, "Read/write cart via JS")
  Rel(store, disk, "Read/write orders")
```

> If the C4 renderer is unavailable, use the component diagram below.

## 2. Container / component view

```mermaid
flowchart TB
  subgraph Browser
    Pages["Pages<br/>/ · /products · /cart · /checkout · /order"]
    Components["Components<br/>Header · ProductCard · Configurator · CheckoutForm"]
    CartCtx["CartProvider<br/>localStorage"]
  end

  subgraph NextApp["Next.js 16 App"]
    Layout["layout.tsx<br/>fonts · providers · chrome"]
    API_POST["POST /api/orders"]
    API_GET["GET /api/orders/:id"]
    Products["lib/products.ts"]
    Orders["lib/orders.ts"]
    Format["lib/format.ts"]
    Types["lib/types.ts"]
  end

  subgraph Persistence
    LS[(localStorage)]
    JSON[(".data/orders.json")]
  end

  Pages --> Components
  Components --> CartCtx
  CartCtx --> LS
  Pages --> Layout
  CheckoutForm -->|fetch JSON| API_POST
  OrderPage -->|fetch JSON| API_GET
  API_POST --> Orders
  API_GET --> Orders
  Orders --> Products
  Orders --> Format
  Orders --> JSON
  Products --> Types
  Orders --> Types
```

## 3. Layering

| Layer | Responsibility | Location |
|-------|----------------|----------|
| Presentation | Routes, layout, CSS | `src/app/**`, `globals.css` |
| UI components | Reusable interactive pieces | `src/components/**` |
| Domain / lib | Catalog, pricing, validation, order write | `src/lib/**` |
| Transport | HTTP handlers | `src/app/api/**` |
| Persistence | Cart + orders | localStorage + `.data/` |

## 4. Runtime topology

```
Developer machine / single Node process
└── next dev | next start
    ├── Static / SSG pages (home, PDPs via generateStaticParams)
    ├── Client islands ("use client" cart, checkout, order)
    └── Route handlers (orders API) → filesystem
```

**Not** a multi-service architecture. One deployable unit.

## 5. Deployment shape (recommended later)

```mermaid
flowchart LR
  User --> CDN[Vercel Edge / CDN]
  CDN --> App[Next.js on Vercel]
  App --> DB[(Supabase / Postgres)]
  App --> Stripe[Stripe API]
```

Current MVP stops at **App + local JSON**.

## 6. Cross-cutting concerns

| Concern | Approach today |
|---------|----------------|
| Styling | Design tokens in `globals.css` + component class names |
| Icons | `lucide-react` |
| Fonts | `next/font` — Figtree + Bricolage Grotesque |
| Errors | Field map from API → CheckoutForm; empty/404 states on pages |
| Typing | Shared types in `src/lib/types.ts` |
