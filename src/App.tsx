import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Signup } from "./pages/authPages/Signup";
import { VerifyOTP } from "./pages/authPages/verify-otp";
import { Login } from "./pages/authPages/Login";
import { UserSettings } from "./pages/UserSettingsPage";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentCallbackPage from "./pages/PaymentCallbackPage";
import { CartProvider } from "./contexts/CartContext";
// import ProductPage from './pages/productPages/TestPag';
import ProductPage from "./pages/productPages/ProductPage";
// import { Route } from 'lucide-react'
import { OrderContextProvider } from "./contexts/OrderContext";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen items-center justify-center bg-base-200 relative">
      <AuthProvider>
        <CartProvider>
          <Header />
          <Toaster />
          <Routes>
            <Route
              path="/signup"
              element={
                <ProtectedRoute requireAuth={false} redirectTo="/login">
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireAuth={true} redirectTo="/" role="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute
                  requireAuth={true}
                  redirectTo="/login"
                  role="admin"
                >
                  <UserSettings />
                </ProtectedRoute>
              }
            />

            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Order-related Routes (with context) */}
            <Route
              path="/*"
              element={
                <OrderContextProvider>
                  <Routes>
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                      path="/order-confirm"
                      element={<OrderConfirmPage />}
                    />
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
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
