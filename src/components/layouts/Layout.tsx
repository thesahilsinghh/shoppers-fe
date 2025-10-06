import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Shoppers</span>
            </div>
            <nav className="flex gap-6">
              <button className="text-gray-600 hover:text-gray-900">Home</button>
              <button className="text-gray-600 hover:text-gray-900">Products</button>
              <button className="text-gray-600 hover:text-gray-900">About</button>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};