import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, CreditCard, Package, ArrowLeft } from "lucide-react";
import type { CartItem, Order, Address, CreateOrderInput } from "../types";
import { getCartFromStorage } from "../data/staticData";
import { OrderItemCard } from "../components/ProductCard";
import { Button } from "../components/ui/Button";
import { useOrderContext } from "../contexts/OrderContext";
import { useCart } from "../contexts/CartContext";

const OrderConfirmPage: React.FC = () => {
  const { createOrder, initiatePayment } = useOrderContext();
  const { items } = useCart();
  const [address, setAddress] = useState<Address>({
    name: "name",
    contact: "+912282882",
    flat: "flat",
    city: "new delhi",
    state: "state",
    pincode: "11122",
    country: "India",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [newOrder, setNewOrder] = useState<Order | null>(null);

  const calculateSubtotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 100 ? 0 : 15;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const generateOrderId = () => {
    const timestamp = Date.now();
    return `ORD-${timestamp}`;
  };

  const generatePaymentId = () => {
    return `pay_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handlePlaceOrder = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Validate address fields
      if (
        !address.name ||
        !address.contact ||
        !address.flat ||
        !address.city ||
        !address.state ||
        !address.pincode ||
        !address.country
      ) {
        alert("Please fill in all address fields");
        setIsProcessing(false);
        return;
      }

      // Convert cart items to order items
      // const orderItems = cartItems.map((item) => ({
      //   product_id: item.product._id,
      //   quantity: item.quantity,
      //   price: item.product.price,
      // }));
      // console.log(items);
      const orderItems = items.map((item) => ({
        product_id: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }));
      console.log(orderItems);
      if (orderItems.length === 0) {
        alert("Your cart is empty");
        setIsProcessing(false);
        return;
      }

      const orderInput: CreateOrderInput = {
        order_id: generateOrderId(),
        order_items: orderItems,
        address: {
          flat: address.flat,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: address.country,
          contact: address.contact,
          name: address.name,
        },
        shippingPrice: calculateShipping(),
      };

      // Store order data in localStorage for callback page
      localStorage.setItem("pendingOrder", JSON.stringify(orderInput));

      // Initiate payment and get payment URL
      const paymentUrl = await initiatePayment(orderInput);
      if (!paymentUrl) {
        throw new Error("Failed to initiate payment");
      }

      // Redirect to payment gateway
      window.location.href = paymentUrl;
    } catch (error: any) {
      console.error("Order placement error:", error);
      alert(error.message || "Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  const updateAddressField = (field: keyof Address, value: string) => {
    const updatedAddress = { ...address, [field]: value };
    setAddress(updatedAddress);
  };

  if (orderPlaced && newOrder) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-light mb-4 text-gray-900">
              Order Complete!
            </h1>
            <p className="text-gray-700 mb-8">
              Thank you for your order. We'll send you a confirmation email
              shortly.
            </p>
            <div className="bg-card border rounded-lg p-4 mb-8">
              <p className="text-lg font-semibold text-gray-900">
                Order ID: {newOrder.order_id}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/checkout"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/checkout"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-2xl font-light text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {/* Shipping Address */}
              <div>
                <h2 className="text-lg font-medium mb-4 text-gray-900">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={address.name}
                      onChange={(e) =>
                        updateAddressField("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                      Contact
                    </label>
                    <input
                      type="text"
                      value={address.contact}
                      onChange={(e) =>
                        updateAddressField("contact", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                      Flat/House
                    </label>
                    <input
                      type="text"
                      value={address.flat}
                      onChange={(e) =>
                        updateAddressField("flat", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                      City
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        updateAddressField("city", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                      State
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) =>
                        updateAddressField("state", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) =>
                        updateAddressField("pincode", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">
                      Country
                    </label>
                    <input
                      type="text"
                      value={address.country || ""}
                      onChange={(e) =>
                        updateAddressField("country", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="e.g., India"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h2 className="text-lg font-medium mb-4 text-gray-900">
                  Order Items
                </h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <OrderItemCard
                      key={item.product._id}
                      orderItem={{
                        product_id: item.product._id,
                        quantity: item.quantity,
                        price: item.product.price,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full inline-flex items-center justify-center px-6 py-3"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Creating Order...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Create Order - ${calculateTotal().toFixed(2)}
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4 text-gray-900">
                Order Summary
              </h2>

              {/* Order Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Shipping</span>
                  <span>
                    {calculateShipping() === 0
                      ? "Free"
                      : `$${calculateShipping().toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium text-gray-900">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-background p-4 rounded-md">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm text-gray-900">
                    Free Delivery
                  </span>
                </div>
                <p className="text-xs text-gray-700">
                  Estimated delivery: 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmPage;
