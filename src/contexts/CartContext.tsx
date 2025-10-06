"use client";

import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
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

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  
  

  const fetchCart = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get<CartResponse>(`${apiBase}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(data.items);
      setTotalPrice(data.totalPrice);
    } catch (err) {
      toast.error("Failed to fetch cart");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) return removeFromCart(productId);

      const { data } = await axios.put<CartResponse>(
        `${apiBase}/cart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(data.items);
      setTotalPrice(data.totalPrice);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const { data } = await axios.delete<CartResponse>(
        `${apiBase}/cart/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(data.items);
      setTotalPrice(data.totalPrice);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${apiBase}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems([]);
      setTotalPrice(0);
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

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
