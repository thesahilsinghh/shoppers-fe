export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  created_at: Date;
  updated_at: Date;
}

export interface Address {
  flat: string;
  city: string;
  landmark?: string;
  state: string;
  country: string;
  pincode: string;
  name: string;
  contact: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface Order {
  _id: string;
  user_id: string;
  order_id: string;
  order_items: OrderItem[];
  total: number;
  status: OrderStatus;
  payment_id?: string;
  shippingPrice: number;
  address: Address;
  createdAt: Date;
}

export interface CreateOrderInput {
  order_items: OrderItem[];
  payment_id?: string;
  order_id: string;
  shippingPrice: number;
  address: Address;
}
export interface GetOrdersResponse {
  orders: Order[];
}

export interface CreateOrderResponse {
  createOrder: Order;
}

export interface InitiatePaymentResponse {
  initiatePayment: string;
}

export interface VerifyPaymentAndCreateOrderResponse {
  verifyPaymentAndCreateOrder: Order;
}

export interface OrderContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  refetchOrders: () => void;
  createOrder: (input: CreateOrderInput) => Promise<Order | undefined>;
  initiatePayment: (input: CreateOrderInput) => Promise<string | undefined>;
  verifyPaymentAndCreateOrder: (
    collect_request_id: string,
    input: CreateOrderInput
  ) => Promise<Order | undefined>;
}
