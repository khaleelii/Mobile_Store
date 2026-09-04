import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    slug: "iphone-17-pro-max",
    price: 1199,
    compareAt: 1299,
    description:
      "Apple’s largest Pro Max — A19 Pro power, a 6.9\" Super Retina XDR display, and a pro camera system tuned for low light and zoom. Choose 256GB, 512GB, or 1TB.",
    highlights: [
      '6.9" Super Retina XDR, 120Hz ProMotion',
      "A19 Pro chip with advanced neural engine",
      "Pro camera system with 5x optical telephoto",
      "Titanium design · USB-C · IP68",
    ],
    specs: {
      Display: '6.9" Super Retina XDR 120Hz',
      Chip: "A19 Pro",
      Camera: "48MP Fusion + 48MP ultrawide + 12MP 5x tele",
      Battery: "Up to 33 hours video playback",
      Weight: "227 g",
    },
    colors: [
      { name: "Cosmic Orange", hex: "#c45c26" },
      { name: "Deep Blue", hex: "#1e3a5f" },
      { name: "Silver", hex: "#d4d4d8" },
      { name: "Black Titanium", hex: "#1c1c1e" },
    ],
    storage: ["256GB", "512GB", "1TB"],
    stock: 30,
    imageGradient:
      "linear-gradient(145deg, #1c1917 0%, #44403c 40%, #c45c26 100%)",
    badge: "New",
  },
  {
    id: "atlas-one",
    name: "Atlas One",
    brand: "ATLAS",
    slug: "atlas-one",
    price: 899,
    compareAt: 999,
    description:
      "Flagship speed in a thin aluminum frame. Pro cameras, all-day battery, and a display that stays sharp outdoors.",
    highlights: [
      "6.7\" LTPO OLED, 120Hz",
      "Triple camera with 5x optical zoom",
      "All-day battery + 45W charge",
      "IP68 water resistance",
    ],
    specs: {
      Display: "6.7\" LTPO OLED 120Hz",
      Chip: "A19 Pro",
      Camera: "48MP + 12MP ultrawide + 12MP tele",
      Battery: "4,600 mAh",
      Weight: "189 g",
    },
    colors: [
      { name: "Obsidian", hex: "#1a1c1e" },
      { name: "Silver Mist", hex: "#c5c9ce" },
      { name: "Pacific Blue", hex: "#1e4d6b" },
    ],
    storage: ["128GB", "256GB", "512GB"],
    stock: 24,
    imageGradient: "linear-gradient(145deg, #0f172a 0%, #1e3a5f 45%, #0ea5e9 100%)",
    badge: "Best seller",
  },
  {
    id: "atlas-air",
    name: "Atlas Air",
    brand: "ATLAS",
    slug: "atlas-air",
    price: 649,
    description:
      "Lightweight everyday phone with a bright display and reliable dual camera — built for people who want less bulk, not less performance.",
    highlights: [
      "6.1\" OLED, 90Hz",
      "Dual camera with Night Mode",
      "MagDock wireless charging",
      "Ultralight 152 g body",
    ],
    specs: {
      Display: "6.1\" OLED 90Hz",
      Chip: "A18",
      Camera: "48MP + 12MP ultrawide",
      Battery: "3,800 mAh",
      Weight: "152 g",
    },
    colors: [
      { name: "Cloud White", hex: "#f4f4f0" },
      { name: "Graphite", hex: "#3a3d42" },
      { name: "Sage", hex: "#6b7f6a" },
    ],
    storage: ["128GB", "256GB"],
    stock: 40,
    imageGradient: "linear-gradient(145deg, #ecfdf5 0%, #a7f3d0 40%, #064e3b 100%)",
  },
  {
    id: "nova-x",
    name: "Nova X",
    brand: "NOVA",
    slug: "nova-x",
    price: 1199,
    compareAt: 1299,
    description:
      "Cinema-grade capture and a titanium frame. For creators who shoot, edit, and share without plugging into a laptop.",
    highlights: [
      "6.8\" ProMotion MicroLED",
      "Titanium chassis",
      "8K video + Log profile",
      "Satellite SOS ready",
    ],
    specs: {
      Display: "6.8\" MicroLED 120Hz",
      Chip: "NX Ultra",
      Camera: "50MP main + 48MP tele + 12MP UW",
      Battery: "5,000 mAh",
      Weight: "210 g",
    },
    colors: [
      { name: "Titanium Natural", hex: "#8a8580" },
      { name: "Titanium Black", hex: "#2b2b2b" },
      { name: "Desert Gold", hex: "#b08d57" },
    ],
    storage: ["256GB", "512GB", "1TB"],
    stock: 12,
    imageGradient: "linear-gradient(145deg, #1c1917 0%, #57534e 50%, #d6d3d1 100%)",
    badge: "Pro",
  },
  {
    id: "pulse-fold",
    name: "Pulse Fold",
    brand: "PULSE",
    slug: "pulse-fold",
    price: 1499,
    description:
      "A phone that opens into a tablet. Multitask, sketch, and watch without carrying a second screen.",
    highlights: [
      '7.6" foldable AMOLED',
      "Cover display for quick tasks",
      "S Pen support",
      "Flex hinge with 200k fold rating",
    ],
    specs: {
      Display: '7.6" foldable + 6.2" cover',
      Chip: "Snap X Elite",
      Camera: "50MP + 12MP UW + 10MP tele",
      Battery: "4,400 mAh",
      Weight: "253 g",
    },
    colors: [
      { name: "Phantom Black", hex: "#111111" },
      { name: "Icy Blue", hex: "#9ec5e8" },
    ],
    storage: ["256GB", "512GB"],
    stock: 8,
    imageGradient: "linear-gradient(145deg, #020617 0%, #312e81 55%, #67e8f9 100%)",
    badge: "Limited",
  },
  {
    id: "orbit-se",
    name: "Orbit SE",
    brand: "ORBIT",
    slug: "orbit-se",
    price: 399,
    description:
      "Honest specs at a fair price. Smooth software, solid cameras, and two days of battery for work and weekends.",
    highlights: [
      "6.5\" LCD 90Hz",
      "50MP main camera",
      "Two-day battery life",
      "Clean Orbit OS updates",
    ],
    specs: {
      Display: "6.5\" LCD 90Hz",
      Chip: "Orbit G3",
      Camera: "50MP + 8MP UW",
      Battery: "5,200 mAh",
      Weight: "195 g",
    },
    colors: [
      { name: "Midnight", hex: "#0b1220" },
      { name: "Coral", hex: "#e07a5f" },
      { name: "Sky", hex: "#7eb6d9" },
    ],
    storage: ["64GB", "128GB"],
    stock: 55,
    imageGradient: "linear-gradient(145deg, #fff7ed 0%, #fb923c 45%, #7c2d12 100%)",
    badge: "Value",
  },
  {
    id: "zenith-ultra",
    name: "Zenith Ultra",
    brand: "ZENITH",
    slug: "zenith-ultra",
    price: 1099,
    description:
      "Photography first. Variable aperture, Hasselblad color science, and a grip that feels made for long shoots.",
    highlights: [
      "Variable aperture f/1.4–f/4.0",
      "Hasselblad Natural Color",
      "Alert slider + silent camera",
      "Ceramic back, matte finish",
    ],
    specs: {
      Display: "6.74\" AMOLED 120Hz",
      Chip: "Z2 Gen",
      Camera: "50MP variable + 48MP tele + 48MP UW",
      Battery: "5,400 mAh",
      Weight: "220 g",
    },
    colors: [
      { name: "Ceramic White", hex: "#f8fafc" },
      { name: "Forest", hex: "#1a3a2a" },
      { name: "Volcanic Black", hex: "#171717" },
    ],
    storage: ["256GB", "512GB"],
    stock: 18,
    imageGradient: "linear-gradient(145deg, #fafafa 0%, #94a3b8 40%, #0f172a 100%)",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.slug === id);
}

const STORAGE_PREMIUM: Record<string, number> = {
  "64GB": 0,
  "128GB": 0,
  "256GB": 100,
  "512GB": 300,
  "1TB": 500,
};

/** Premium relative to a storage tier (used to price upgrades vs a product’s base). */
export function storagePriceDelta(storage: string): number {
  return STORAGE_PREMIUM[storage] ?? 0;
}

export function getUnitPrice(product: Product, storage: string): number {
  const base = product.storage[0];
  return (
    product.price +
    (storagePriceDelta(storage) - storagePriceDelta(base))
  );
}
