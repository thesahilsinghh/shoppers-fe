import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentCallbackPage from "./pages/PaymentCallbackPage";
import { CartProvider } from "./contexts/CartContext";
import { OrderContextProvider } from "./contexts/OrderContext";
import CartPage from "./pages/CartPage";
import { Login } from "./pages/authPages/Login";
import { Signup } from "./pages/authPages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { UserSettings } from "./pages/UserSettingsPage";

function App() {
  const location = useLocation();
  const hideHeaderOn = ["/dashboard", "/settings"]; 

  const shouldShowHeader = !hideHeaderOn.includes(location.pathname);
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen items-center justify-center bg-base-200 relative">
          {shouldShowHeader && <Header />}

          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Order-related Routes */}
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

            {/* Admin Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireAuth={true} redirectTo="/login" role="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute requireAuth={true} redirectTo="/login" role="admin">
                  <UserSettings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};


export default App;
