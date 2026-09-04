import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";

type PhoneSize = "sm" | "md" | "lg";

export function PhoneVisual({
  product,
  className = "",
  size = "md",
}: {
  product: Product;
  className?: string;
  size?: PhoneSize;
}) {
  return (
    <div
      className={`phone-visual phone-stage size-${size} ${className}`}
      style={{ background: product.imageGradient }}
      aria-hidden
    >
      <div className="phone-stage-glow" />
      <div className="phone-stage-ring" />
      <div className="phone-bezel">
        <div className="phone-island" />
        <div className={`phone-screen wallpaper-${product.wallpaper}`}>
          <div className="wallpaper-layers">
            <span className="wall-orb wall-orb-a" />
            <span className="wall-orb wall-orb-b" />
            <span className="wall-orb wall-orb-c" />
            <span className="wall-mesh" />
          </div>
          <div className="phone-lock">
            <span className="phone-time">9:41</span>
            <span className="phone-brand">{product.brand}</span>
            <span className="phone-model">{product.name}</span>
          </div>
          <div className="phone-home-bar" />
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
          From {formatMoney(product.price)}
          {product.compareAt ? (
            <span className="compare">{formatMoney(product.compareAt)}</span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
