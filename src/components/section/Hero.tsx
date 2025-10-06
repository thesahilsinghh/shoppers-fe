import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/images.ts";
import { Button } from "../ui/Button.tsx";

const HERO_IMAGES = images.heroImages;
const FALLBACK_IMAGE = "/placeholder.jpg";

// Mobile image sources
const MOBILE_IMAGES = images.mobileHeroImages;

const getMobileImageSrc = (index: number) => {
  return MOBILE_IMAGES[index] || FALLBACK_IMAGE;
};

export const Hero = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };
  return (
    <section className="relative h-[600px] md:h-[700px] bg-[#f5eee0] overflow-hidden group">
      {/* Image Carousel - Full Width Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {HERO_IMAGES.map((src, index) => (
            <div key={src} className="w-full h-full flex-shrink-0 relative">
              {/* Desktop Image */}
              <img
                src={imageErrors.has(index) ? FALLBACK_IMAGE : src}
                alt=" clothing collection"
                className="object-cover w-full h-full hidden md:block"
              />
              {/* Mobile Image */}
              <img
                src={
                  imageErrors.has(index)
                    ? FALLBACK_IMAGE
                    : getMobileImageSrc(index)
                }
                alt="clothing collection"
                className="object-cover block h-full w-full  md:hidden"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 lg:bg-black/15 bg-black/30" />
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-light mb-4 text-white drop-shadow-lg">
            Discover beautiful products for your home and lifestyle.
          </h1>
          <p className="text-lg mb-8 text-white/90 drop-shadow-md">
            Quality items crafted with care for modern living.
          </p>
          <div>
            <Button
              onClick={() => navigate("/")}
              className="bg-gray-900 px-10 py-4 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Modern Small Rounded Navigation Buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((src, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white shadow-lg scale-125"
                : "bg-white/50 hover:bg-white/80 hover:scale-110"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
