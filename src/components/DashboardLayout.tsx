import React, { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Sidebar } from "./Siderbar";
import DashboardHeader from './DashboardHeader'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface DashboardLayoutProps {
  user: { first_name: string };
  children: ReactNode; // dynamic content
  handleLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, children }) => {
  const { logout, isAuthenticated, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("products");

  const handleSettings = () => {
    navigate("/settings")
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error('Logout error:', error.message);
    }
  };
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: "#ecfdf5", color: "#065f46", fontSize: "1.1rem", padding: "18px 24px", minWidth: "320px" } },
          error: { style: { background: "#fef2f2", color: "#991b1b", fontSize: "1.1rem", padding: "18px 24px", minWidth: "320px" } },
        }}
      />

      {/* Header */}
      <DashboardHeader
        user={user}
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
        onSettings={handleSettings}
      />

      {/* Layout */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onShowProducts={() => { setActiveSection("products"); setIsSidebarOpen(false); }}
          onShowCreate={() => { setActiveSection("create"); setIsSidebarOpen(false); }}
          onShowUpdate={() => { setActiveSection("update"); setIsSidebarOpen(false); }}
          onShowUpdateQuantity={() => { setActiveSection("update-quantity"); setIsSidebarOpen(false); }}
          onShowUpdatePublishing={() => { setActiveSection("update-publishing"); setIsSidebarOpen(false); }}
          onShowDelete={() => { setActiveSection("delete"); setIsSidebarOpen(false); }}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 mt-16"> {/* mt-16 offsets fixed navbar */}
          <div className="max-w-4xl mx-auto">
            {children} {/* dynamic content for any page */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
