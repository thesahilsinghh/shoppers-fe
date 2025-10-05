"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";


interface Product {
  _id: string;
  title: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartResponse {
  items: CartItem[];
  totalPrice: number;
}

const apiBase = "http://localhost:3000"; 

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const fetchCart = async () => {
    if (!token) {
      console.log("⚠️ No token found in localStorage");
      return;
    }
    setLoading(true);
    try {
      console.log("📡 Fetching cart with token:", token);

      const { data } = await axios.get<CartResponse>(`${apiBase}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Cart API response:", data);

      setItems(data.items);
      setTotalPrice(data.totalPrice);
      // ❌ removed setCount – state.totalItems is already managed by CartContext
    } catch (err: any) {
      console.error("❌ Error fetching cart:", err);

      if (err.response) {
        console.error("📥 Server responded with error:", err.response.data);
      } else if (err.request) {
        console.error("📡 No response received:", err.request);
      } else {
        console.error("⚠️ Request setup error:", err.message);
      }

      toast.error("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQty = async (productId: string, newQty: number) => {
  try {
    if (newQty <= 0) {
      // If qty becomes 0, remove from cart
      return handleRemoveItem(productId);
    }

    const { data } = await axios.put<CartResponse>(
      `${apiBase}/cart`,
      { productId, quantity: newQty },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setItems(data.items);
    setTotalPrice(data.totalPrice);
  } catch {
    toast.error("Failed to update item quantity");
  }
};

  const handleRemoveItem = async (productId: string) => {
    try {
      const { data } = await axios.delete<CartResponse>(
        `${apiBase}/cart/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(data.items);
      setTotalPrice(data.totalPrice);
      // ❌ removed setCount
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete<CartResponse>(`${apiBase}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems([]);
      setTotalPrice(0);
      toast.success("Cart cleared");
      // ❌ removed setCount
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  {item.product.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h2 className="font-medium">{item.product.title}</h2>
                    <p className="text-gray-500">
                      ₹{item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQty(item.product._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
            >
                     -
                </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQty(item.product._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Total: ₹{totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
