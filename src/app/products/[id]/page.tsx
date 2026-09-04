import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PhoneVisual } from "@/components/ProductCard";
import { ProductConfigurator } from "@/components/ProductConfigurator";
import { getProduct, products } from "@/lib/products";
import { formatMoney } from "@/lib/format";

type Props = PageProps<"/products/[id]">;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product" };
  return {
    title: `${product.brand} ${product.name}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <article className="product-detail">
      <div className="product-detail-media">
        <PhoneVisual product={product} size="lg" />
      </div>
      <div className="product-detail-copy">
        <p className="eyebrow">{product.brand}</p>
        <h1>{product.name}</h1>
        <p className="product-price" style={{ marginBottom: "0.75rem" }}>
          From {formatMoney(product.price)}
          {product.compareAt ? (
            <span className="compare">{formatMoney(product.compareAt)}</span>
          ) : null}
        </p>
        <p className="lead">{product.description}</p>
        <ul className="highlights">
          {product.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ProductConfigurator product={product} />
        <dl className="specs">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
