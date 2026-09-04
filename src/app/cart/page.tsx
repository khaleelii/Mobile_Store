"use client";

import Link from "next/link";
import { PhoneVisual } from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";
import { getProduct, getUnitPrice } from "@/lib/products";
import { calcTax, formatMoney } from "@/lib/format";

export default function CartPage() {
  const { items, ready, updateQuantity, removeItem, subtotal, itemCount } =
    useCart();
  const tax = calcTax(subtotal);
  const estimated = Math.round((subtotal + tax) * 100) / 100;

  if (!ready) {
    return <p className="muted">Loading cart…</p>;
  }

  if (!items.length) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <p>Browse the lineup and add a phone to get started.</p>
        <Link href="/" className="btn btn-primary">
          Shop phones
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-title">Cart ({itemCount})</h1>
      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            const unit = getUnitPrice(product, item.storage);
            return (
              <li
                key={`${item.productId}-${item.color}-${item.storage}`}
                className="cart-item"
              >
                <div className="cart-item-thumb">
                  <PhoneVisual product={product} />
                </div>
                <div>
                  <h3>
                    {product.brand} {product.name}
                  </h3>
                  <p>
                    {item.color} · {item.storage}
                  </p>
                  <p>{formatMoney(unit)} each</p>
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.color,
                            item.storage,
                            item.quantity - 1,
                          )
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.color,
                            item.storage,
                            item.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() =>
                        removeItem(item.productId, item.color, item.storage)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <span>
                  <strong>{formatMoney(unit * item.quantity)}</strong>
                </span>
              </li>
            );
          })}
        </ul>

        <aside className="panel sticky-panel">
          <h2>Summary</h2>
          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatMoney(subtotal)}</dd>
            </div>
            <div>
              <dt>Est. tax</dt>
              <dd>{formatMoney(tax)}</dd>
            </div>
            <div className="grand">
              <dt>Estimated</dt>
              <dd>{formatMoney(estimated)}</dd>
            </div>
          </dl>
          <p className="muted" style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>
            Shipping is calculated at checkout.
          </p>
          <Link href="/checkout" className="btn btn-primary btn-block">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </>
  );
}
