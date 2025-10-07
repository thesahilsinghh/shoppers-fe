import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Truck, Shield, ArrowRight } from "lucide-react";
import { staticProducts } from "../data/staticData";
import { ProductCard } from "../components/ProductCard";
import { Hero } from "../components/section/Hero";
import { Button } from "../components/ui/Button";
import { Footer } from "../components/Footer";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
const GET_PRODUCTS = gql`
  query AllProducts($filters: FilterProducts) {
    allProducts(filters: $filters) {
      _id
      category
      description
      image
      price
      publish
      quantity
      title
    }
  }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {},
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data && data?.allProducts) {
      setItems(data.allProducts);
    }
  }, [data]);
  return (
    <div className="flex flex-col">
      <Hero />

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
            {items.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="w-full flex">
            <Button
              onClick={() => navigate("/products")}
              className="text-center mt-12 mx-auto"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-[#f9f7f4]">
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
          <Button onClick={() => navigate("/checkout")} className="px-6 py-3">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-900 text-center pt-8 pb-12">
            What we provide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">
                Free Shipping
              </h3>
              <p className="text-gray-700">Free shipping on orders over $100</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-900" />
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
                <Star className="w-8 h-8 text-grap-900" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">
                Quality Guarantee
              </h3>
              <p className="text-gray-700">Handpicked quality items</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
