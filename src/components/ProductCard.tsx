import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import type { Product, OrderItem } from "../types";
import { staticProducts } from "../data/staticData";

interface ProductCardProps {
  product: Product;
  showQuantity?: boolean;
  quantity?: number;
  onQuantityChange?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
  handleClick: () => void;
}

// Cart button
const CartButton: React.FC<{
  disabled: boolean;
  isOutOfStock: boolean;
  styles: string;
  onClick: () => void;
}> = ({ disabled, isOutOfStock, styles, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${styles} bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-robotoFlex font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
      isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
    }`}
  >
    <ShoppingCart className="w-4 h-4 mr-1" />
    Add to Cart
  </button>
);

// Wishlist button
const WishlistButton: React.FC<{
  disabled: boolean;
  isOutOfStock: boolean;
  styles: string;
}> = ({ disabled, isOutOfStock, styles }) => (
  <button
    disabled={disabled}
    className={`${styles} flex items-center justify-center hover:bg-gray-100 hover:text-red-500 transition-all duration-200 text-gray-700 border-gray-300 hover:border-red-300 ${
      isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
    }`}
  >
    <Heart className="w-4 h-4" />
  </button>
);

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleClick,
}) => {
  const { addToCart } = useCart();
  const isOutOfStock = !product.inStock;

  const handleAddToCart = () => {
    if (!isOutOfStock) addToCart(product, 1);
  };

  return (
    <div
      onClick={handleClick}
      key={product._id}
      className={`group rounded-3xl flex flex-col lg:min-h-[320px] min-h-[300px] overflow-hidden bg-white transition-all duration-300 border border-gray-200/50 shadow-sm lg:hover:shadow-md cursor-pointer`}
    >
      {/* Image */}
      <div className="relative overflow-hidden lg:h-[75%] h-[68%]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full object-cover h-full transition-all duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col lg:h-[25%] h-[32%] px-1 py-3 lg:px-3 lg:py-3 justify-between bg-white">
        <div className="space-y-1">
          <h3 className="text-[16px] lg:text-[1.1rem] font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-800 transition-colors duration-200">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-normal text-gray-900">
            {product.category}
          </span>
          <span className="font-semibold text-gray-900">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

interface OrderItemCardProps {
  orderItem: OrderItem;
  showProductDetails?: boolean;
}

export const OrderItemCard: React.FC<OrderItemCardProps> = ({
  orderItem,
  showProductDetails = true,
}) => {
  const product = staticProducts.find((p) => p._id === orderItem.product_id);
  if (!product) return null;

  return (
    <div className="flex items-center space-x-4 p-4 bg-card border rounded-lg">
      <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{product.title}</h4>
        {showProductDetails && (
          <p className="text-sm text-gray-600">{product.category}</p>
        )}
        <div className="flex items-center space-x-4 mt-1">
          <span className="text-sm text-gray-600">
            Qty: {orderItem.quantity}
          </span>
          <span className="text-sm font-medium text-gray-900">
            ${orderItem.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="text-right">
        <span className="font-semibold text-gray-900">
          ${(orderItem.price * orderItem.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
