import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <BrandLogo />
          <p className="footer-note">
            Curated phones, transparent pricing, and checkout that ships and confirms.
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
