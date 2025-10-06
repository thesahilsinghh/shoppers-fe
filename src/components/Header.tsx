import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, User, Menu } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Header: React.FC = () => {
  const location = useLocation();
  const { totalItems, fetchCart } = useCart(); // ✅ now using fetchCart from context

  // ✅ Make sure the header badge refreshes when page loads
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Cart", href: "/cart" },
    { name: "Orders", href: "/orders" },
  ];

  return (
    <header className="sticky w-full top-0 z-50 shadow-sm text-hello">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu */}
          <div className="lg:hidden">
            <button className="btn btn-ghost btn-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 lg:relative fixed flex w-full left-0 items-center justify-center lg:justify-start">
            <Link to="/" className="flex items-center h-full">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-headerText rounded-md flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-baskervville font-semibold text-gray-900">
                  Shoppers
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex space-x-8">
              {navigation.map((item) => {
                const isActiveRoute = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`text-sm font-medium transition-all duration-200 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md ${
                        isActiveRoute
                          ? "text-gray-900 bg-gray-100"
                          : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Icons + Auth */}
          <div className="flex items-center justify-end flex-1 space-x-1">
            {/* Search toggle */}
            <button className="btn btn-ghost btn-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </button>

            {/* User Icon */}
            <div className="hidden lg:block">
              <Link to="/login">
                <button className="btn btn-ghost btn-sm rounded-full hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 text-gray-700">
                  <User className="h-5 w-5" />
                </button>
              </Link>
            </div>

            {/* Cart Icon */}
            <Link to="/cart">
              <button className="btn btn-ghost btn-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
