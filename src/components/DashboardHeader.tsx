import React, { useState } from "react";
import { Menu, X, Settings } from "lucide-react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  user: { first_name: string };
  onSidebarToggle: () => void;
  onLogout: () => void;
  onSettings: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  onSidebarToggle,
  onLogout,
  onSettings,
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky bg-white shadow-sm border-b fixed top- left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Left: Mobile Sidebar Toggle + Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={onSidebarToggle}
            className="md:hidden btn btn-ghost p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Dashboard Logo */}
          <div className="text-xl font-baskervville font-semibold text-gray-900">
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {user.first_name}!</span>

          <Button
            variant="outline"
            onClick={onSettings}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>

          <Button onClick={onLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-ghost p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col space-y-2 py-4 px-4">
            <span className="text-gray-600">Welcome, {user.first_name}!</span>
            <Button
              variant="outline"
              onClick={onSettings}
              className="flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button onClick={onLogout} variant="outline" className="justify-center">
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
