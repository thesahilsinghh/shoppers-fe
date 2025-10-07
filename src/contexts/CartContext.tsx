"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  title: string;
  price: number;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartResponse {
  items: CartItem[];
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  fetchCart: () => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const apiBase = "http://localhost:3000";

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const apiBase = "http://localhost:3000";
  const api = axios.create({
    baseURL: apiBase,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  useEffect(() => {
    return fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await api.get<CartResponse>(`${apiBase}/cart`);

      setItems(data.items);
      setTotalPrice(data.totalPrice);
    } catch (err) {
      toast.error("Failed to fetch cart");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) return removeFromCart(productId);

      const { data } = await api.put<CartResponse>(`${apiBase}/cart`, {
        productId,
        quantity,
      });
      setItems(data.items);
      setTotalPrice(data.totalPrice);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const { data } = await api.delete<CartResponse>(
        `${apiBase}/cart/${productId}`
      );
      setItems(data.items);
      setTotalPrice(data.totalPrice);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await api.delete(`${apiBase}/cart`);
      setItems([]);
      setTotalPrice(0);
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        fetchCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
