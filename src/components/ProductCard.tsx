import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";

export function PhoneVisual({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={`phone-visual ${className}`}
      style={{ background: product.imageGradient }}
      aria-hidden
    >
      <div className="phone-bezel">
        <div className="phone-notch" />
        <div className="phone-screen">
          <span className="phone-brand">{product.brand}</span>
          <span className="phone-model">{product.name}</span>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className="product-card-media">
        {product.badge ? <span className="product-badge">{product.badge}</span> : null}
        <PhoneVisual product={product} />
      </div>
      <div className="product-card-body">
        <p className="product-brand">{product.brand}</p>
        <h3>{product.name}</h3>
        <p className="product-price">
          {formatMoney(product.price)}
          {product.compareAt ? (
            <span className="compare">{formatMoney(product.compareAt)}</span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
