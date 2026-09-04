/** Stylized payment brand marks for checkout UX (demo — not official logos). */

export function PaymentBrandRow() {
  return (
    <div className="payment-brands" aria-label="Accepted payment methods">
      <span className="pay-badge visa" title="Visa">
        <svg viewBox="0 0 48 16" aria-hidden>
          <text x="2" y="12" className="pay-text visa-text">
            VISA
          </text>
        </svg>
      </span>
      <span className="pay-badge mastercard" title="Mastercard">
        <svg viewBox="0 0 36 22" aria-hidden>
          <circle cx="13" cy="11" r="8" className="mc-left" />
          <circle cx="23" cy="11" r="8" className="mc-right" />
        </svg>
      </span>
      <span className="pay-badge amex" title="American Express">
        <svg viewBox="0 0 48 16" aria-hidden>
          <text x="1" y="12" className="pay-text amex-text">
            AMEX
          </text>
        </svg>
      </span>
      <span className="pay-badge apple-pay" title="Apple Pay">
        <svg viewBox="0 0 54 18" aria-hidden>
          <path
            className="ap-logo"
            d="M9.2 3.4c-.6.7-1.5 1.2-2.4 1.1-.1-.9.3-1.9.9-2.5.6-.7 1.6-1.2 2.4-1.2.1.9-.3 1.9-.9 2.6zm.9 1.4c-1.3-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-.1.2-1.4 3.9.9 6.4.6.7 1.4 1.5 2.4 1.5.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.7-.7 2.3-1.4.7-.8 1-1.6 1-1.6s-1.9-.7-1.9-2.8c0-1.8 1.4-2.6 1.5-2.7-.8-1.2-2.1-1.4-2.2-1.4z"
          />
          <text x="16" y="13" className="pay-text ap-text">
            Pay
          </text>
        </svg>
      </span>
      <span className="pay-badge gpay" title="Google Pay">
        <svg viewBox="0 0 56 18" aria-hidden>
          <text x="2" y="13" className="pay-text g-text">
            G
          </text>
          <text x="14" y="13" className="pay-text gpay-text">
            Pay
          </text>
        </svg>
      </span>
      <span className="pay-badge discover" title="Discover">
        <svg viewBox="0 0 56 16" aria-hidden>
          <text x="1" y="12" className="pay-text disc-text">
            DISCOVER
          </text>
        </svg>
      </span>
    </div>
  );
}

export function CardNetworkHint({ number }: { number: string }) {
  const digits = number.replace(/\D/g, "");
  let network = "Card";
  if (/^4/.test(digits)) network = "Visa";
  else if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) network = "Mastercard";
  else if (/^3[47]/.test(digits)) network = "Amex";
  else if (/^6(?:011|5)/.test(digits)) network = "Discover";

  if (digits.length < 1) return null;
  return <span className="card-network-chip">{network}</span>;
}
