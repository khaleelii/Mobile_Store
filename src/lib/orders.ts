import { randomUUID } from "crypto";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import type { CheckoutPayload, Order, OrderItem } from "./types";
import { getProduct, getUnitPrice } from "./products";
import {
  calcTax,
  getShippingCost,
  isValidCardNumber,
  isValidEmail,
  isValidExpiry,
  isValidPhone,
  isValidZip,
  onlyDigits,
} from "./format";

const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function ensureStore() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(ORDERS_FILE)) writeFileSync(ORDERS_FILE, "[]", "utf8");
}

function readOrders(): Order[] {
  ensureStore();
  try {
    return JSON.parse(readFileSync(ORDERS_FILE, "utf8")) as Order[];
  } catch {
    return [];
  }
}

function writeOrders(orders: Order[]) {
  ensureStore();
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
}

export function getOrder(id: string): Order | undefined {
  return readOrders().find((o) => o.id === id);
}

export type CheckoutError = { field?: string; message: string };

export function validateCheckout(payload: CheckoutPayload): CheckoutError[] {
  const errors: CheckoutError[] = [];

  if (!isValidEmail(payload.email)) {
    errors.push({ field: "email", message: "Enter a valid email address." });
  }
  if (!isValidPhone(payload.phone)) {
    errors.push({ field: "phone", message: "Enter a valid phone number." });
  }
  if (!payload.firstName.trim()) {
    errors.push({ field: "firstName", message: "First name is required." });
  }
  if (!payload.lastName.trim()) {
    errors.push({ field: "lastName", message: "Last name is required." });
  }
  if (payload.address.trim().length < 5) {
    errors.push({ field: "address", message: "Enter a full street address." });
  }
  if (!payload.city.trim()) {
    errors.push({ field: "city", message: "City is required." });
  }
  if (!payload.state.trim() || payload.state.trim().length < 2) {
    errors.push({ field: "state", message: "State / province is required." });
  }
  if (!isValidZip(payload.zip)) {
    errors.push({ field: "zip", message: "Enter a valid ZIP / postal code." });
  }
  if (!payload.country.trim()) {
    errors.push({ field: "country", message: "Country is required." });
  }
  if (!["standard", "express", "overnight"].includes(payload.shippingMethod)) {
    errors.push({ field: "shippingMethod", message: "Choose a shipping method." });
  }
  if (!payload.cardName.trim()) {
    errors.push({ field: "cardName", message: "Name on card is required." });
  }
  if (!isValidCardNumber(payload.cardNumber)) {
    errors.push({
      field: "cardNumber",
      message: "Enter a valid card number. Try 4242 4242 4242 4242 for demo.",
    });
  }
  if (!isValidExpiry(payload.cardExpiry)) {
    errors.push({ field: "cardExpiry", message: "Enter a valid future expiry (MM/YY)." });
  }
  if (!/^\d{3,4}$/.test(onlyDigits(payload.cardCvc))) {
    errors.push({ field: "cardCvc", message: "Enter a valid CVC (3–4 digits)." });
  }
  if (!payload.items?.length) {
    errors.push({ message: "Your cart is empty." });
  }

  return errors;
}

export function createOrder(payload: CheckoutPayload): {
  order?: Order;
  errors?: CheckoutError[];
} {
  const errors = validateCheckout(payload);
  if (errors.length) return { errors };

  const orderItems: OrderItem[] = [];
  let subtotal = 0;

  for (const item of payload.items) {
    const product = getProduct(item.productId);
    if (!product) {
      return { errors: [{ message: `Product not found: ${item.productId}` }] };
    }
    if (item.quantity < 1) {
      return { errors: [{ message: `Invalid quantity for ${product.name}.` }] };
    }
    if (item.quantity > product.stock) {
      return {
        errors: [
          {
            message: `Only ${product.stock} left in stock for ${product.name}.`,
          },
        ],
      };
    }
    if (!product.colors.some((c) => c.name === item.color)) {
      return { errors: [{ message: `Invalid color for ${product.name}.` }] };
    }
    if (!product.storage.includes(item.storage)) {
      return { errors: [{ message: `Invalid storage for ${product.name}.` }] };
    }

    const unitPrice = getUnitPrice(product, item.storage);
    subtotal += unitPrice * item.quantity;
    orderItems.push({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      color: item.color,
      storage: item.storage,
      unitPrice,
      quantity: item.quantity,
    });
  }

  const shippingCost = getShippingCost(payload.shippingMethod);
  const tax = calcTax(subtotal);
  const total = Math.round((subtotal + shippingCost + tax) * 100) / 100;
  const digits = onlyDigits(payload.cardNumber);

  const order: Order = {
    id: `MS-${randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    customerName: `${payload.firstName.trim()} ${payload.lastName.trim()}`,
    shippingAddress: {
      address: payload.address.trim(),
      city: payload.city.trim(),
      state: payload.state.trim(),
      zip: payload.zip.trim(),
      country: payload.country.trim(),
    },
    shippingMethod: payload.shippingMethod,
    shippingCost,
    tax,
    subtotal: Math.round(subtotal * 100) / 100,
    total,
    paymentLast4: digits.slice(-4),
    items: orderItems,
    status: "paid",
  };

  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);

  return { order };
}
