import React from "react";
import { Link } from "react-router-dom";
import { Star, Truck, Shield, ArrowRight } from "lucide-react";
import { staticProducts } from "../data/staticData";
import { ProductCard } from "../components/ProductCard";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="relative py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light mb-6 text-gray-900">
              Welcome to{" "}
              <span className="font-semibold text-gray-900">Shoppers</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Discover beautiful products for your home and lifestyle. Quality
              items crafted with care for modern living.
            </p>
            <Link
              to="/checkout"
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">
                Free Shipping
              </h3>
              <p className="text-gray-700">Free shipping on orders over $100</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">
                Secure Payment
              </h3>
              <p className="text-gray-700">
                Safe and secure payment processing
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">
                Quality Guarantee
              </h3>
              <p className="text-gray-700">Handpicked quality items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">
              Our Featured Products
            </h2>
            <p className="text-gray-700">Handpicked items for your home</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticProducts.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/checkout"
              className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-900">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            At Shoppers, we believe that every home deserves to be filled with
            beautiful, quality items that bring joy and comfort. Our carefully
            curated collection features products that combine style,
            functionality, and sustainability.
          </p>
          <Link
            to="/checkout"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
