import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ShoppingBag
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onShowCreate: () => void;
  onShowUpdate: () => void;
  onShowUpdateQuantity: () => void;
  onShowUpdatePublishing: () => void;
  onShowDelete: () => void;
  onShowProducts: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onShowCreate,
  onShowUpdate,
  onShowUpdateQuantity,
  onShowUpdatePublishing,
  onShowDelete,
  onShowProducts
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'products',
      label: 'Show Products',
      icon: ShoppingBag,
      onClick: onShowProducts,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'create',
      label: 'Create Product',
      icon: Plus,
      onClick: onShowCreate,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'update',
      label: 'Update Product',
      icon: Edit,
      onClick: onShowUpdate,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'update-quantity',
      label: 'Update Quantity',
      icon: Edit,
      onClick: onShowUpdateQuantity,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'update-publishing',
      label: 'Update Publishing',
      icon: Edit,
      onClick: onShowUpdatePublishing,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'delete',
      label: 'Delete Product',
      icon: Trash2,
      onClick: onShowDelete,
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'w-20' : 'w-64'}
        md:relative md:translate-x-0 md:z-0
      `}>
        <Card className="h-full rounded-none border-0 shadow-none">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-baskervville font-semibold text-gray-900">
                  Management
                </span>
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              {/* Collapse Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex p-2"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </Button>

              {/* Close Button (Mobile only) */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="md:hidden p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={item.onClick}
                className={`
                  w-full justify-start h-12
                  ${isCollapsed ? 'px-3' : 'px-4'}
                  hover:bg-gray-100 transition-colors
                `}
              >
                <div className={`
                  p-2 rounded-lg flex items-center justify-center
                  ${item.color}
                  ${isCollapsed ? 'w-8 h-8' : 'w-8 h-8 mr-3'}
                `}>
                  <item.icon className="w-4 h-4" />
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};