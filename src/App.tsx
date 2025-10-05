import { Routes, Route } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Signup from "./pages/authPages/Signup";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import OrdersPage from "./pages/OrdersPage";
import { CartProvider } from "./contexts/CartContext";
// import { Route } from 'lucide-react'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen items-center justify-center bg-base-200 relative ">
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirm" element={<OrderConfirmPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
