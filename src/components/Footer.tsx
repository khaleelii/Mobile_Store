import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">MobileStore</p>
          <p className="footer-note">
            Curated phones, transparent pricing, and a checkout that actually works.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/">Shop phones</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} MobileStore. Demo storefront.</p>
    </footer>
  );
}
