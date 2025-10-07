import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useOrderContext } from "../contexts/OrderContext";
import type { CreateOrderInput } from "../types";

const PaymentCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyPaymentAndCreateOrder } = useOrderContext();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Get collect_request_id and status from URL params
        const collect_request_id = searchParams.get("EdvironCollectRequestId");
        const paymentStatus = searchParams.get("status");

        console.log("collect_request_id", collect_request_id);
        console.log("payment_status", paymentStatus);

        if (!collect_request_id) {
          throw new Error("Missing payment reference ID");
        }

        // Check if payment was successful based on URL status
        if (paymentStatus && paymentStatus !== "SUCCESS") {
          throw new Error(`Payment failed with status: ${paymentStatus}`);
        }

        // Retrieve order data from localStorage
        const storedOrderData = localStorage.getItem("pendingOrder");
        if (!storedOrderData) {
          throw new Error("Order data not found");
        }

        const orderInput: CreateOrderInput = JSON.parse(storedOrderData);

        // Verify payment and create order
        const order = await verifyPaymentAndCreateOrder(
          collect_request_id,
          orderInput
        );

        if (order) {
          setOrderId(order.order_id);
          setStatus("success");
          // Clear stored order data
          localStorage.removeItem("pendingOrder");

          // Redirect to orders page after 3 seconds
          setTimeout(() => {
            navigate("/orders");
          }, 3000);
        } else {
          throw new Error("Failed to create order");
        }
      } catch (error: any) {
        console.error("Payment processing error:", error);
        setErrorMessage(
          error.message || "Failed to process payment. Please contact support."
        );
        setStatus("error");
      }
    };

    // Only run if we haven't already processed (to prevent loops)
    if (status === "loading") {
      processPayment();
    }
  }, [searchParams, navigate, status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-light mb-2">Processing Payment...</h2>
          <p className="text-gray-600">
            Please wait while we verify your payment
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-light mb-4">Payment Failed</h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <button
            onClick={() => navigate("/checkout")}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-light mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-2">
          Your order has been placed successfully.
        </p>
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">Order ID: {orderId}</p>
        )}
        <p className="text-sm text-gray-500 mb-6">
          Redirecting to your orders...
        </p>
      </div>
    </div>
  );
};

export default PaymentCallbackPage;
