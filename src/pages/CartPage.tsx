"use client";

import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const CartPage: React.FC = () => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/checkout ");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <ul className="list bg-gray-100 rounded-box shadow-md divide-y">
          {items.map((item, index) => (
            <li
              key={item.product._id}
              className="flex items-center justify-between p-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl font-thin opacity-40 tabular-nums">
                  {index + 1}
                </div>
                {item.product.image && (
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-box"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-bold text-2xl">
                    {item.product.title}
                  </span>
                  <span className="text-lg text-gray-500">
                    ₹{item.product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity - 1)
                  }
                  className="btn rounded-full btn-sm"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="font-semibold text-gray-700 text-3xl">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity + 1)
                  }
                  className="btn rounded-full btn-sm"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-3xl">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="btn btn-ghost btn-square text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-4">
          {/* Left: Clear Cart */}
          <button
            onClick={clearCart}
            className="btn btn-error btn-outline rounded-full"
          >
            Clear Cart
          </button>

          {/* Right: Total and Place Order stacked vertically */}
          <div className="flex flex-col items-center gap-3 w-full md:w-auto">
            <h2 className="text-2xl font-bold">
              Total: ₹{totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={handlePlaceOrder}
              className="btn btn-accent text-lg rounded-4xl w-32"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
