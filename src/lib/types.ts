export type Product = {
  id: string;
  name: string;
  brand: string;
  slug: string;
  price: number;
  compareAt?: number;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  colors: { name: string; hex: string }[];
  storage: string[];
  stock: number;
  imageGradient: string;
  badge?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  color: string;
  storage: string;
};

export type ShippingMethod = "standard" | "express" | "overnight";

export type CheckoutPayload = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shippingMethod: ShippingMethod;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  items: CartItem[];
};

export type OrderItem = {
  productId: string;
  name: string;
  brand: string;
  color: string;
  storage: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  email: string;
  phone: string;
  customerName: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shippingMethod: ShippingMethod;
  shippingCost: number;
  tax: number;
  subtotal: number;
  total: number;
  paymentLast4: string;
  items: OrderItem[];
  status: "paid" | "processing" | "shipped";
};
