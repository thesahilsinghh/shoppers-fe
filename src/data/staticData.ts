import type { Product, CartItem, Order, Address } from "../types";

// Static product data
export const staticProducts: Product[] = [
  {
    _id: "1",
    name: "Boho Macrame Wall Hanging",
    description: "Handwoven macrame wall art with natural fibers",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "Home Decor",
    inStock: true,
  },
  {
    _id: "2",
    name: "Vintage Ceramic Plant Pot",
    description: "Hand-painted ceramic pot with boho patterns",
    price: 45.5,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
    category: "Garden",
    inStock: true,
  },
  {
    _id: "3",
    name: "Woven Rattan Basket",
    description: "Natural rattan storage basket with leather handles",
    price: 65.0,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "Storage",
    inStock: true,
  },
  {
    _id: "4",
    name: "Boho Throw Pillow",
    description: "Embroidered cotton pillow with tassels",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "Textiles",
    inStock: true,
  },
  {
    _id: "5",
    name: "Wooden Bead Garland",
    description: "Hand-strung wooden beads in natural tones",
    price: 28.75,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "Decor",
    inStock: true,
  },
  {
    _id: "6",
    name: "Terracotta Candle Holder",
    description: "Handcrafted terracotta candle holder with geometric patterns",
    price: 42.0,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "Lighting",
    inStock: true,
  },
];

// Static cart data
export const staticCartItems: CartItem[] = [
  {
    product: staticProducts[0],
    quantity: 2,
  },
  {
    product: staticProducts[1],
    quantity: 1,
  },
  {
    product: staticProducts[3],
    quantity: 3,
  },
];

// Local storage utilities
export const storageKeys = {
  CART: "boho_cart",
  ORDERS: "boho_orders",
  ADDRESS: "boho_address",
};

export const getCartFromStorage = (): CartItem[] => {
  try {
    const cart = localStorage.getItem(storageKeys.CART);
    return cart ? JSON.parse(cart) : staticCartItems;
  } catch {
    return staticCartItems;
  }
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(storageKeys.CART, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
};
