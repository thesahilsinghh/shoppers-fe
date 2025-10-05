import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, MapPin, CreditCard, Eye } from "lucide-react";
import type { Order } from "../types";
import { OrderStatus } from "../types";
import { getOrdersFromStorage } from "../data/staticData";
import { OrderItemCard } from "../components/ProductCard";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(getOrdersFromStorage());
  }, []);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case OrderStatus.CONFIRMED:
        return "bg-blue-100 text-blue-800";
      case OrderStatus.SHIPPED:
        return "bg-purple-100 text-purple-800";
      case OrderStatus.DELIVERED:
        return "bg-green-100 text-green-800";
      case OrderStatus.CANCELLED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {order.order_id}
          </h3>
          <p className="text-sm text-gray-700">
            Ordered on {formatDate(order.createdAt)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-700">
          <Package className="w-4 h-4 mr-2 text-primary" />
          {order.order_items.length} item
          {order.order_items.length !== 1 ? "s" : ""}
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          {order.address.city}, {order.address.state}
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <CreditCard className="w-4 h-4 mr-2 text-primary" />
          {order.payment_id}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">
          ${order.total.toFixed(2)}
        </span>
        <button
          onClick={() => setSelectedOrder(order)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-light mb-4 text-gray-900">
              No orders yet
            </h1>
            <p className="text-gray-700 mb-8">
              Start shopping to see your orders here!
            </p>
            <Link
              to="/checkout"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-light mb-2 text-gray-900">
            Your Orders
          </h1>
          <p className="text-gray-700">Track and manage your purchases</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-light text-gray-900">
                      {selectedOrder.order_id}
                    </h2>
                    <p className="text-gray-700">
                      Ordered on {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-700 hover:text-gray-900 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Order Items
                    </h3>
                    <div className="space-y-4">
                      {selectedOrder.order_items.map((item, index) => (
                        <OrderItemCard key={index} orderItem={item} />
                      ))}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Order Status
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-primary" />
                        Shipping Address
                      </h3>
                      <div className="text-gray-700">
                        <p className="font-medium text-gray-900">
                          {selectedOrder.address.name}
                        </p>
                        <p>{selectedOrder.address.flat}</p>
                        <p>
                          {selectedOrder.address.city},{" "}
                          {selectedOrder.address.state}
                        </p>
                        <p>
                          {selectedOrder.address.country}{" "}
                          {selectedOrder.address.pincode}
                        </p>
                        <p className="text-sm mt-2">
                          Contact: {selectedOrder.address.contact}
                        </p>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                        <CreditCard className="w-5 h-5 mr-2 text-primary" />
                        Payment Details
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>
                            $
                            {(
                              selectedOrder.total - selectedOrder.shippingPrice
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>
                            {selectedOrder.shippingPrice === 0
                              ? "Free"
                              : `$${selectedOrder.shippingPrice.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span className="text-gray-900">
                              ${selectedOrder.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm mt-2">
                          <p>Payment ID: {selectedOrder.payment_id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
