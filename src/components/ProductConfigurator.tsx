"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { getUnitPrice } from "@/lib/products";
import { formatMoney } from "@/lib/format";
import { useCart } from "./CartProvider";

export function ProductConfigurator({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [color, setColor] = useState(product.colors[0].name);
  const [storage, setStorage] = useState(product.storage[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const unit = getUnitPrice(product, storage);
  const selectedColor = product.colors.find((c) => c.name === color);

  function handleAdd() {
    addItem({ productId: product.id, color, storage, quantity: qty });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem({ productId: product.id, color, storage, quantity: qty });
    router.push("/checkout");
  }

  return (
    <div className="configurator">
      <div className="config-block">
        <p className="config-label">
          Color — <strong>{color}</strong>
        </p>
        <div className="swatches" role="radiogroup" aria-label="Color">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={color === c.name}
              className={`swatch ${color === c.name ? "selected" : ""}`}
              style={{ background: c.hex }}
              title={c.name}
              onClick={() => setColor(c.name)}
            />
          ))}
        </div>
      </div>

      <div className="config-block">
        <p className="config-label">Storage</p>
        <div className="chip-row" role="radiogroup" aria-label="Storage">
          {product.storage.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={storage === s}
              className={`chip ${storage === s ? "selected" : ""}`}
              onClick={() => setStorage(s)}
            >
              {s}
              {s !== product.storage[0] ? (
                <span className="chip-delta">
                  +{formatMoney(getUnitPrice(product, s) - product.price)}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="config-block qty-row">
        <p className="config-label">Quantity</p>
        <div className="qty-controls">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span>{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
          >
            +
          </button>
        </div>
        <p className="stock-note">{product.stock} in stock</p>
      </div>

      <p className="config-total">
        {formatMoney(unit * qty)}
        <span>
          {selectedColor?.name} · {storage}
        </span>
      </p>

      <div className="config-actions">
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          {added ? "Added to cart" : "Add to cart"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={handleBuyNow}>
          Buy now
        </button>
      </div>
    </div>
  );
}
