# Data Flow

## 1. Browse → configure → cart

```mermaid
sequenceDiagram
  actor U as Shopper
  participant Home as / (catalog)
  participant PDP as /products/[id]
  participant Cart as CartProvider
  participant LS as localStorage

  U->>Home: Open store
  Home-->>U: Product grid from products[]
  U->>PDP: Select phone
  PDP-->>U: Specs + configurator
  U->>PDP: Color / storage / qty
  U->>Cart: addItem(CartItem)
  Cart->>LS: Persist mobile-store-cart-v1
  Cart-->>U: Header badge updates
```

## 2. Checkout → order → confirmation

```mermaid
sequenceDiagram
  actor U as Shopper
  participant Form as CheckoutForm
  participant Cart as CartProvider
  participant API as POST /api/orders
  participant Ord as createOrder
  participant FS as .data/orders.json
  participant Conf as /order/[id]

  U->>Form: Fill contact, ship, pay
  Form->>Form: Client format helpers
  U->>Form: Submit
  Form->>API: JSON CheckoutPayload + items
  API->>Ord: validateCheckout + stock/SKU
  alt Invalid
    Ord-->>API: errors[]
    API-->>Form: 400
    Form-->>U: Field errors (cart kept)
  else Valid
    Ord->>Ord: Price lines, tax, shipping
    Ord->>FS: Append Order
    Ord-->>API: order
    API-->>Form: 201 { orderId }
    Form->>Cart: clearCart()
    Form->>Conf: router.push
    Conf->>API: GET /api/orders/:id
    API->>FS: Read
    API-->>Conf: Order JSON
    Conf-->>U: Receipt UI
  end
```

## 3. Money calculation pipeline

```mermaid
flowchart TD
  A[Cart items] --> B[Resolve product via getProduct]
  B --> C[unit = getUnitPrice product, storage]
  C --> D[subtotal = Σ unit × qty]
  D --> E[shipping = getShippingCost method]
  D --> F[tax = round subtotal × 0.08]
  E --> G[total = round subtotal + shipping + tax]
  F --> G
  G --> H[Persist on Order]
```

**Important:** Client summary is UX only. **Authoritative totals** are computed in `src/lib/orders.ts` at create time.

## 4. Cart line identity

```mermaid
flowchart LR
  P[productId] --- C[color] --- S[storage]
  P --- C
  C --- S
  S --> K[Cart line key]
  K -->|match| Merge[Increase quantity]
  K -->|no match| New[New line]
```

## 5. Persistence boundaries

| Data | Written by | Read by | Lifetime |
|------|------------|---------|----------|
| Catalog | Developer (git) | Server + client imports | Until deploy |
| Cart | Browser | Browser | Until clear / successful checkout |
| Order | Server API | Server API → confirmation page | Until `.data` deleted |

## 6. State machine — order

```mermaid
stateDiagram-v2
  [*] --> paid: createOrder success
  paid --> processing: (future)
  processing --> shipped: (future)
```

MVP only creates **`paid`**. Other statuses exist on the type for forward compatibility.
