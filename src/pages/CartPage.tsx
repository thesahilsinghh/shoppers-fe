"use client";

import React from "react";
import { useCart } from "../contexts/CartContext";
import { Trash2 } from "lucide-react";

const CartPage: React.FC = () => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
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
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
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
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</h2>
            <button
              onClick={clearCart}
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
