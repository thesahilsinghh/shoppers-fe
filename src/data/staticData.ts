import type { Product, CartItem, Order, Address } from "../types";
import { OrderStatus } from "../types";

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

// Static address data
export const staticAddress: Address = {
  flat: "Apt 4B, Sunset Villa",
  city: "Santa Monica",
  landmark: "Near Venice Beach",
  state: "California",
  country: "United States",
  pincode: "90401",
  name: "Sarah Johnson",
  contact: "+1 (555) 123-4567",
};

// Static orders data
export const staticOrders: Order[] = [
  {
    _id: "1",
    user_id: "user123",
    order_id: "ORD-2024-001",
    order_items: [
      {
        product_id: "1",
        quantity: 2,
        price: 89.99,
      },
      {
        product_id: "2",
        quantity: 1,
        price: 45.5,
      },
    ],
    total: 225.48,
    status: OrderStatus.DELIVERED,
    payment_id: "pay_123456789",
    shippingPrice: 15.0,
    address: staticAddress,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    _id: "2",
    user_id: "user123",
    order_id: "ORD-2024-002",
    order_items: [
      {
        product_id: "3",
        quantity: 1,
        price: 65.0,
      },
      {
        product_id: "4",
        quantity: 2,
        price: 35.99,
      },
    ],
    total: 136.98,
    status: OrderStatus.SHIPPED,
    payment_id: "pay_987654321",
    shippingPrice: 12.0,
    address: staticAddress,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    _id: "3",
    user_id: "user123",
    order_id: "ORD-2024-003",
    order_items: [
      {
        product_id: "5",
        quantity: 3,
        price: 28.75,
      },
      {
        product_id: "6",
        quantity: 1,
        price: 42.0,
      },
    ],
    total: 128.25,
    status: OrderStatus.CONFIRMED,
    payment_id: "pay_456789123",
    shippingPrice: 10.0,
    address: staticAddress,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
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

export const getOrdersFromStorage = (): Order[] => {
  try {
    const orders = localStorage.getItem(storageKeys.ORDERS);
    return orders ? JSON.parse(orders) : staticOrders;
  } catch {
    return staticOrders;
  }
};

export const saveOrderToStorage = (order: Order): void => {
  try {
    const orders = getOrdersFromStorage();
    orders.unshift(order);
    localStorage.setItem(storageKeys.ORDERS, JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to save order to storage:", error);
  }
};

export const getAddressFromStorage = (): Address => {
  try {
    const address = localStorage.getItem(storageKeys.ADDRESS);
    return address ? JSON.parse(address) : staticAddress;
  } catch {
    return staticAddress;
  }
};

export const saveAddressToStorage = (address: Address): void => {
  try {
    localStorage.setItem(storageKeys.ADDRESS, JSON.stringify(address));
  } catch (error) {
    console.error("Failed to save address to storage:", error);
  }
};
