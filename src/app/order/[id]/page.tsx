"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";
import type { Order } from "@/lib/types";
import { formatMoney, SHIPPING_OPTIONS } from "@/lib/format";

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/orders/${params.id}`);
        if (!res.ok) {
          if (!cancelled) setError("We couldn’t find that order.");
          return;
        }
        const data = (await res.json()) as Order;
        if (!cancelled) setOrder(data);
      } catch {
        if (!cancelled) setError("Failed to load order details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (loading) return <p className="muted">Loading order…</p>;

  if (error || !order) {
    return (
      <div className="empty-state">
        <h2>Order not found</h2>
        <p>{error || "This confirmation link may have expired."}</p>
        <Link href="/" className="btn btn-primary">
          Back to shop
        </Link>
      </div>
    );
  }

  const shipLabel =
    SHIPPING_OPTIONS.find((o) => o.id === order.shippingMethod)?.label ??
    order.shippingMethod;

  return (
    <>
      <div className="order-hero">
        <div className="success-check" aria-hidden>
          <Check size={28} strokeWidth={2.5} />
        </div>
        <h1>Order confirmed</h1>
        <p className="muted">
          Thanks, {order.customerName}. A receipt was prepared for {order.email}.
        </p>
        <span className="order-id">Order {order.id}</span>
      </div>

      <div className="order-grid">
        <section className="panel">
          <h2>Items</h2>
          <ul className="summary-lines">
            {order.items.map((item) => (
              <li key={`${item.productId}-${item.color}-${item.storage}`}>
                <div>
                  <strong>
                    {item.brand} {item.name}
                  </strong>
                  <span>
                    {item.color} · {item.storage} · ×{item.quantity}
                  </span>
                </div>
                <span>{formatMoney(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatMoney(order.subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping ({shipLabel})</dt>
              <dd>
                {order.shippingCost === 0
                  ? "Free"
                  : formatMoney(order.shippingCost)}
              </dd>
            </div>
            <div>
              <dt>Tax</dt>
              <dd>{formatMoney(order.tax)}</dd>
            </div>
            <div className="grand">
              <dt>Total paid</dt>
              <dd>{formatMoney(order.total)}</dd>
            </div>
          </dl>
        </section>

        <section className="panel">
          <h2>Details</h2>
          <dl>
            <div>
              <dt>Ship to</dt>
              <dd>
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zip}
                <br />
                {order.shippingAddress.country}
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                {order.email}
                <br />
                {order.phone}
              </dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>Card ending in {order.paymentLast4}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd style={{ textTransform: "capitalize" }}>{order.status}</dd>
            </div>
          </dl>
          <Link
            href="/"
            className="btn btn-primary btn-block"
            style={{ marginTop: "1.25rem" }}
          >
            Continue shopping
          </Link>
        </section>
      </div>
    </>
  );
}
