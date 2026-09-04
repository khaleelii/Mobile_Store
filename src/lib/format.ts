import type { ShippingMethod } from "./types";

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export const SHIPPING_OPTIONS: {
  id: ShippingMethod;
  label: string;
  detail: string;
  price: number;
  days: string;
}[] = [
  {
    id: "standard",
    label: "Standard",
    detail: "Tracked ground shipping",
    price: 0,
    days: "5–7 business days",
  },
  {
    id: "express",
    label: "Express",
    detail: "Priority handling",
    price: 14.99,
    days: "2–3 business days",
  },
  {
    id: "overnight",
    label: "Overnight",
    detail: "Next business day",
    price: 29.99,
    days: "1 business day",
  },
];

export function getShippingCost(method: ShippingMethod): number {
  return SHIPPING_OPTIONS.find((o) => o.id === method)?.price ?? 0;
}

export function calcTax(subtotal: number): number {
  return Math.round(subtotal * 0.08 * 100) / 100;
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatCardNumber(value: string): string {
  const digits = onlyDigits(value).slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/** Luhn check for card numbers */
export function isValidCardNumber(cardNumber: string): boolean {
  const digits = onlyDigits(cardNumber);
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function isValidExpiry(expiry: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(expiry.trim());
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const exp = new Date(year, month); // first day of next month
  return exp > now;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip.trim());
}

export function isValidPhone(phone: string): boolean {
  const digits = onlyDigits(phone);
  return digits.length >= 10 && digits.length <= 15;
}
