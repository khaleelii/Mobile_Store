import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-orb" aria-hidden />
        <div className="hero-content">
          <h1>MobileStore</h1>
          <p>
            Flagship phones, clear pricing, and a checkout that validates payment,
            ships your order, and confirms it — end to end.
          </p>
          <div className="hero-actions">
            <Link href="#catalog" className="btn btn-primary">
              Shop phones
            </Link>
            <Link href="/cart" className="btn btn-ghost">
              View cart
            </Link>
          </div>
        </div>
      </section>

      <section id="catalog">
        <div className="section-head">
          <div>
            <h2>The lineup</h2>
            <p>Six devices. Pick color and storage, then check out when you&apos;re ready.</p>
          </div>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
