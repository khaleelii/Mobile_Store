import Link from "next/link";

export function BrandLogo({
  href = "/",
  onNavigate,
  compact = false,
}: {
  href?: string;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  return (
    <Link href={href} className={`brand ${compact ? "compact" : ""}`} onClick={onNavigate}>
      <span className="brand-mark" aria-hidden>
        <svg viewBox="0 0 32 32" fill="none" className="brand-mark-svg">
          <rect
            x="9"
            y="4"
            width="14"
            height="24"
            rx="3.5"
            className="brand-phone-body"
          />
          <rect x="12" y="7" width="8" height="14" rx="1.5" className="brand-phone-screen" />
          <circle cx="16" cy="25" r="1.2" className="brand-phone-dot" />
          <path
            d="M22.5 11.5c2.2 0 4 1.8 4 4s-1.8 4-4 4"
            className="brand-signal"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="brand-text">
        Mobile<span>Store</span>
      </span>
    </Link>
  );
}
