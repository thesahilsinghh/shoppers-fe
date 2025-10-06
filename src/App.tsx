import { Routes, Route } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Signup from "./pages/authPages/Signup";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentCallbackPage from "./pages/PaymentCallbackPage";
import { CartProvider } from "./contexts/CartContext";
import { OrderContextProvider } from "./contexts/OrderContext";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen items-center justify-center bg-base-200 relative">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Order-related Routes (with context) */}
          <Route
            path="/*"
            element={
              <OrderContextProvider>
                <Routes>
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirm" element={<OrderConfirmPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route
                    path="/payment/callback"
                    element={<PaymentCallbackPage />}
                  />
                </Routes>
              </OrderContextProvider>
            }
          />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
