# API Reference

Base URL (local): `http://localhost:3000`

## POST `/api/orders`

Creates a validated order and persists it.

### Request body

```json
{
  "email": "ada@example.com",
  "phone": "5551234567",
  "firstName": "Ada",
  "lastName": "Lovelace",
  "address": "123 Market Street",
  "city": "San Francisco",
  "state": "CA",
  "zip": "94105",
  "country": "United States",
  "shippingMethod": "express",
  "cardName": "Ada Lovelace",
  "cardNumber": "4242424242424242",
  "cardExpiry": "12/30",
  "cardCvc": "123",
  "items": [
    {
      "productId": "iphone-17-pro-max",
      "quantity": 1,
      "color": "Black Titanium",
      "storage": "256GB"
    }
  ]
}
```

### Responses

| Status | Body |
|--------|------|
| **201** | `{ "orderId": "MS-XXXXXXXX" }` |
| **400** | `{ "errors": [{ "field?": "email", "message": "..." }] }` or `{ "message": "Invalid JSON body." }` |

### Validation (summary)

See PRD FR-05 and `validateCheckout` / `createOrder` in `src/lib/orders.ts`.

Demo card: `4242 4242 4242 4242` (Luhn-valid).

---

## GET `/api/orders/[id]`

Returns a single order.

### Responses

| Status | Body |
|--------|------|
| **200** | Full `Order` JSON (includes items, totals, address, `paymentLast4`) |
| **404** | `{ "message": "Order not found." }` |

### Security note

No auth. Treat order IDs as capability URLs. Do not expose listing endpoints without auth.

---

## Implementation map

| Endpoint | File |
|----------|------|
| POST | `src/app/api/orders/route.ts` |
| GET | `src/app/api/orders/[id]/route.ts` |
| Domain | `src/lib/orders.ts` |
