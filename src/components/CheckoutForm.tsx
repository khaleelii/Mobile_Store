"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { getProduct, getUnitPrice } from "@/lib/products";
import {
  SHIPPING_OPTIONS,
  calcTax,
  formatCardNumber,
  formatExpiry,
  formatMoney,
  getShippingCost,
  onlyDigits,
} from "@/lib/format";
import type { ShippingMethod } from "@/lib/types";
import { Lock, Loader2 } from "lucide-react";
import { CardNetworkHint, PaymentBrandRow } from "./PaymentBrands";

type FormState = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shippingMethod: ShippingMethod;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

const initial: FormState = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  shippingMethod: "standard",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

export function CheckoutForm() {
  const { items, subtotal, clearCart, ready } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initial);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const shipping = getShippingCost(form.shippingMethod);
  const tax = calcTax(subtotal);
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return {
            ...item,
            product,
            unit: getUnitPrice(product, item.storage),
          };
        })
        .filter(Boolean),
    [items],
  );

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items,
        }),
      });
      const data = (await res.json()) as {
        orderId?: string;
        errors?: { field?: string; message: string }[];
        message?: string;
      };

      if (!res.ok) {
        const map: Record<string, string> = {};
        for (const err of data.errors ?? []) {
          if (err.field) map[err.field] = err.message;
          else setFormError(err.message);
        }
        setFieldErrors(map);
        if (!data.errors?.length && data.message) setFormError(data.message);
        return;
      }

      clearCart();
      router.push(`/order/${data.orderId}`);
    } catch {
      setFormError("Could not place order. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!ready) {
    return <p className="muted">Loading checkout…</p>;
  }

  if (!items.length) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <p>Add a phone before checking out.</p>
        <a href="/" className="btn btn-primary">
          Browse phones
        </a>
      </div>
    );
  }

  return (
    <form className="checkout-grid" onSubmit={onSubmit} noValidate>
      <div className="checkout-main">
        <section className="panel">
          <h2>Contact</h2>
          <div className="field-grid">
            <Field
              label="Email"
              error={fieldErrors.email}
              id="email"
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Phone" error={fieldErrors.phone} id="phone">
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </Field>
          </div>
        </section>

        <section className="panel">
          <h2>Shipping address</h2>
          <div className="field-grid">
            <Field label="First name" error={fieldErrors.firstName} id="firstName">
              <input
                id="firstName"
                autoComplete="given-name"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
              />
            </Field>
            <Field label="Last name" error={fieldErrors.lastName} id="lastName">
              <input
                id="lastName"
                autoComplete="family-name"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
              />
            </Field>
            <Field
              label="Address"
              error={fieldErrors.address}
              id="address"
              full
            >
              <input
                id="address"
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="123 Market Street"
              />
            </Field>
            <Field label="City" error={fieldErrors.city} id="city">
              <input
                id="city"
                autoComplete="address-level2"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </Field>
            <Field label="State" error={fieldErrors.state} id="state">
              <input
                id="state"
                autoComplete="address-level1"
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
              />
            </Field>
            <Field label="ZIP" error={fieldErrors.zip} id="zip">
              <input
                id="zip"
                autoComplete="postal-code"
                value={form.zip}
                onChange={(e) => set("zip", e.target.value)}
              />
            </Field>
            <Field label="Country" error={fieldErrors.country} id="country">
              <input
                id="country"
                autoComplete="country-name"
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
              />
            </Field>
          </div>
        </section>

        <section className="panel">
          <h2>Shipping method</h2>
          <div className="shipping-list" role="radiogroup" aria-label="Shipping">
            {SHIPPING_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`shipping-option ${
                  form.shippingMethod === opt.id ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={form.shippingMethod === opt.id}
                  onChange={() => set("shippingMethod", opt.id)}
                />
                <span className="ship-copy">
                  <strong>{opt.label}</strong>
                  <span>
                    {opt.detail} · {opt.days}
                  </span>
                </span>
                <span className="ship-price">
                  {opt.price === 0 ? "Free" : formatMoney(opt.price)}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Payment</h2>
          <PaymentBrandRow />
          <p className="payment-hint">
            Demo checkout — use card <code>4242 4242 4242 4242</code>, any future
            expiry, any CVC. No real charge.
          </p>
          <div className="field-grid">
            <Field
              label="Name on card"
              error={fieldErrors.cardName}
              id="cardName"
              full
            >
              <input
                id="cardName"
                autoComplete="cc-name"
                value={form.cardName}
                onChange={(e) => set("cardName", e.target.value)}
              />
            </Field>
            <Field
              label="Card number"
              error={fieldErrors.cardNumber}
              id="cardNumber"
              full
            >
              <div className="card-number-wrap">
                <input
                  id="cardNumber"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={form.cardNumber}
                  onChange={(e) => set("cardNumber", formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                />
                <CardNetworkHint number={form.cardNumber} />
              </div>
            </Field>
            <Field label="Expiry" error={fieldErrors.cardExpiry} id="cardExpiry">
              <input
                id="cardExpiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={form.cardExpiry}
                onChange={(e) => set("cardExpiry", formatExpiry(e.target.value))}
                placeholder="MM/YY"
              />
            </Field>
            <Field label="CVC" error={fieldErrors.cardCvc} id="cardCvc">
              <input
                id="cardCvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={form.cardCvc}
                onChange={(e) =>
                  set("cardCvc", onlyDigits(e.target.value).slice(0, 4))
                }
                placeholder="123"
              />
            </Field>
          </div>
        </section>
      </div>

      <aside className="checkout-summary panel sticky-panel">
        <h2>Order summary</h2>
        <ul className="summary-lines">
          {lines.map((line) =>
            line ? (
              <li key={`${line.productId}-${line.color}-${line.storage}`}>
                <div>
                  <strong>
                    {line.product.brand} {line.product.name}
                  </strong>
                  <span>
                    {line.color} · {line.storage} · ×{line.quantity}
                  </span>
                </div>
                <span>{formatMoney(line.unit * line.quantity)}</span>
              </li>
            ) : null,
          )}
        </ul>
        <dl className="totals">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatMoney(subtotal)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? "Free" : formatMoney(shipping)}</dd>
          </div>
          <div>
            <dt>Tax (8%)</dt>
            <dd>{formatMoney(tax)}</dd>
          </div>
          <div className="grand">
            <dt>Total</dt>
            <dd>{formatMoney(total)}</dd>
          </div>
        </dl>

        {formError ? <p className="form-error">{formError}</p> : null}

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="spin" size={18} /> Placing order…
            </>
          ) : (
            <>
              <Lock size={16} /> Pay {formatMoney(total)}
            </>
          )}
        </button>
      </aside>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
  full,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`field ${full ? "full" : ""} ${error ? "invalid" : ""}`}>
      <span>{label}</span>
      {children}
      {error ? <em className="field-error">{error}</em> : null}
    </label>
  );
}
