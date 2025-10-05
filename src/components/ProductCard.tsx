import React from "react";
import { Link } from "react-router-dom";
import type { Product, OrderItem } from "../types";
import { staticProducts } from "../data/staticData";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
  showQuantity?: boolean;
  quantity?: number;
  onQuantityChange?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
}

// Cart button component
const CartButton: React.FC<{
  disabled: boolean;
  isOutOfStock: boolean;
  styles: string;
  onClick: () => void;
}> = ({ disabled, isOutOfStock, styles, onClick }) => {
  return (
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
};

// Wishlist button component
const WishlistButton: React.FC<{
  disabled: boolean;
  isOutOfStock: boolean;
  styles: string;
}> = ({ disabled, isOutOfStock, styles }) => {
  return (
    <button
      disabled={disabled}
      className={`${styles} flex items-center justify-center hover:bg-gray-100 hover:text-red-500 transition-all duration-200 text-gray-700 border-gray-300 hover:border-red-300 ${
        isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
      }`}
    >
      <Heart className="w-4 h-4" />
    </button>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showQuantity = false,
  quantity = 1,
  onQuantityChange,
  onRemove,
}) => {
  const { addToCart } = useCart();
  const isOutOfStock = !product.inStock;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (onQuantityChange) {
      onQuantityChange(product._id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(product._id);
    }
  };

  return (
    <div key={product._id} className="flex items-center justify-between gap-10">
      <div className="flex flex-col gap-1 lg:w-[240px] md:w-[200px] w-[140px] transition-transform duration-300 ease-in">
        <Link
          aria-label="View Product"
          to={`/product-details/${product._id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative lg:w-[240px] lg:h-[280px] md:w-[200px] md:h-[250px] w-[140px] h-[168px] overflow-hidden">
            <img
              loading="lazy"
              className={`w-full h-full object-cover ${
                isOutOfStock ? "bg-opacity-50" : ""
              }`}
              src={product.image}
              alt={product.name}
            />
            {isOutOfStock && (
              <>
                <div className="absolute inset-0 bg-[#D9D9D97D] bg-opacity-10"></div>
                <div className="flex items-center justify-center">
                  <p className="absolute top-1/3 mt-4 md:mt-0 md:top-1/2 bg-headerBg w-[80%] text-center py-1 text-gray-900 text-[16px] md:text-[24px] font-baskervville">
                    Out of Stock
                  </p>
                </div>
              </>
            )}
          </div>
        </Link>
        <div className="flex justify-between text-[16px] md:text-[19px] lg:text-[22px] font-baskervville font-[200] text-gray-900 text-ellipsis overflow-hidden">
          <h1 className="line-clamp-1 w-5/6">{product.name}</h1>
        </div>
        <div className="flex items-center justify-between text-gray-900 font-[400]">
          <div className="font-robotoFlex text-[14px] md:text-[19px] lg:text-[20px] gap-1 flex items-center">
            <span>Rs. {product.price}</span>
          </div>
        </div>
        <div className="flex justify-between w-full lg:text-[18px] md:text-[14px] text-[11px] gap-1 lg:h-9 h-fit">
          {showQuantity ? (
            <div className="flex items-center gap-2 lg:w-[82%] w-[80%]">
              <button
                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                className="border border-gray-300 rounded-sm px-3 py-1 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-1 text-center min-w-[2rem] bg-gray-50 border border-gray-200 rounded-sm text-gray-900 font-medium">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="border border-gray-300 rounded-sm px-3 py-1 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-gray-700 hover:text-gray-900"
              >
                +
              </button>
              <button
                onClick={handleRemove}
                className="text-red-600 hover:text-red-800 hover:bg-red-50 text-xs px-2 py-1 rounded-sm transition-all duration-200 font-medium"
                title="Remove item"
              >
                Remove
              </button>
            </div>
          ) : (
            <CartButton
              disabled={isOutOfStock}
              isOutOfStock={isOutOfStock}
              onClick={handleAddToCart}
              styles={`lg:w-[82%] w-[80%] text-white rounded-sm py-2 h-full ${
                isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          )}
          <WishlistButton
            disabled={isOutOfStock}
            isOutOfStock={isOutOfStock}
            styles={`border border-gray-900 rounded-sm lg:px-2.5 px-2 ${
              isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
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
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{product.name}</h4>
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
