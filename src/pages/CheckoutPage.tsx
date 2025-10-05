import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Shield, Truck } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

const CheckoutPage: React.FC = () => {
  const { state } = useCart();
  const cartItems = state.items;
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce(
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/order-confirm");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-light mb-4 text-gray-900">
              Order Complete!
            </h1>
            <p className="text-gray-900 mb-8">
              Thank you for your order. We'll send you a confirmation email
              shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
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
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-light text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <form className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-medium mb-4 text-gray-900">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled
                      value="john@example.com"
                      placeholder="john@example.com"
                      className="bg-muted/50"
                    />
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">
                    Secure Checkout
                  </span>
                </div>
                <p className="text-sm text-gray-900">
                  Your payment information is encrypted and secure. We never
                  store your card details.
                </p>
              </div>

              {/* Order Notes */}
              <div>
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Input
                  id="notes"
                  name="notes"
                  placeholder="Any special instructions for your order..."
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                type="submit"
                className="w-full"
                size="lg"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Create Order - ${calculateTotal().toFixed(2)}
                </div>
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4 text-gray-900">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden">
                      {item.product.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-900">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mb-4"></div>

              {/* Order Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-900">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-900">
                  <span>Delivery</span>
                  <span>${calculateShipping().toFixed(2)}</span>
                </div>
                <div className="border-t"></div>
                <div className="flex justify-between font-medium text-gray-900">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-background p-4 rounded-md">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm text-gray-900">
                    Free Delivery
                  </span>
                </div>
                <p className="text-xs text-gray-900">
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

export default CheckoutPage;
