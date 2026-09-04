"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { BrandLogo } from "./BrandLogo";

const links = [
  { href: "/", label: "Phones" },
  { href: "/#catalog", label: "Shop" },
  { href: "/cart", label: "Cart" },
];

export function Header() {
  const { itemCount, ready } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandLogo onNavigate={() => setOpen(false)} />

        <nav className={`nav ${open ? "open" : ""}`} aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/cart" className="cart-btn" aria-label="Open cart">
            <ShoppingBag size={20} strokeWidth={1.75} />
            {ready && itemCount > 0 ? (
              <span className="cart-count">{itemCount}</span>
            ) : null}
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
