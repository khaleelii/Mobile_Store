import Link from "next/link";
import { ProductCard, PhoneVisual } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  const featured = products[0];

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>MobileStore</h1>
          <p>
            Flagship phones with clear pricing — configure, cart, and check out
            in one flow.
          </p>
          <div className="hero-actions">
            <Link href="#catalog" className="btn btn-primary">
              Shop phones
            </Link>
            <Link href={`/products/${featured.slug}`} className="btn btn-ghost">
              See {featured.name}
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <PhoneVisual product={featured} size="lg" />
        </div>
      </section>

      <section id="catalog">
        <div className="section-head">
          <div>
            <h2>The lineup</h2>
            <p>Pick color and storage, then check out when you&apos;re ready.</p>
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
