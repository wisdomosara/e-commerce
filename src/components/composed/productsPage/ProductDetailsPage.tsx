"use client";

import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Star,
  Package,
  Tag,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

type ProductDetailsPageProps = {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  };
};

export default function ProductDetailsPage({
  product,
}: ProductDetailsPageProps) {
  const discountedPrice =
    product.price - product.price * (product.discountPercentage / 100);

  // Refs for custom navigation
  const swiperRef = useRef<SwiperType | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Set up navigation
  useEffect(() => {
    if (!swiperRef.current || !prevButtonRef.current || !nextButtonRef.current)
      return;

    // Attach click handlers
    const prevButton = prevButtonRef.current;
    const nextButton = nextButtonRef.current;
    const handlePrevClick = () => {
      if (swiperRef.current) {
        swiperRef.current.slidePrev();
        setActiveIndex(swiperRef.current.realIndex);
      }
    };

    const handleNextClick = () => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
        setActiveIndex(swiperRef.current.realIndex);
      }
    };

    prevButton.addEventListener("click", handlePrevClick);
    nextButton.addEventListener("click", handleNextClick);

    return () => {
      prevButton.removeEventListener("click", handlePrevClick);
      nextButton.removeEventListener("click", handleNextClick);
    };
  }, []);

  return (
    <main className="container mt-[40px] mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
            >
              Home
            </Link>
          </li>
          <li className="text-stone-500 dark:text-stone-400">/</li>
          <li>
            <Link
              href="/products"
              className="text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
            >
              Products
            </Link>
          </li>
          <li className="text-stone-500 dark:text-stone-400">/</li>
          <li className="text-stone-900 dark:text-stone-100">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <section className="space-y-4">
          <div className="relative group">
            <Swiper
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}
              loop={product.images.length > 1}
              grabCursor={true}
              className="w-full aspect-square rounded-xl overflow-hidden shadow-lg dark:shadow-stone-800"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`${product.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {product.images.length > 1 && (
              <>
                <button
                  ref={prevButtonRef}
                  className="nav-btn-prev absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-stone-100 dark:bg-white text-stone-800 shadow-md transition-opacity hover:bg-stone-200 dark:hover:bg-stone-50 focus:outline-none opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  ref={nextButtonRef}
                  className="nav-btn-next absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-stone-100 dark:bg-white text-stone-800 shadow-md transition-opacity hover:bg-stone-200 dark:hover:bg-stone-50 focus:outline-none opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-2 mt-[40px]">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.slideToLoop(index);
                    setActiveIndex(index);
                  }
                }}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  activeIndex === index
                    ? "ring-2 ring-stone-500"
                    : "ring-1 ring-stone-200 dark:ring-stone-700"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Product Info */}
        <section className="space-y-8">
          {/* Header */}
          <div className="border-b border-stone-200 dark:border-stone-700 pb-6">
            <h1 className="text-4xl font-bold mb-2 text-stone-900 dark:text-stone-100">
              {product.title}
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-lg text-stone-600 dark:text-stone-300">
                {product.brand}
              </p>
              <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 px-3 py-1 rounded-full">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <div className="space-x-3">
                  <span className="text-xl text-stone-500 dark:text-stone-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full font-medium">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6 border-y border-stone-200 dark:border-stone-700 py-6">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-stone-600 dark:text-stone-300" />
              <span>
                {product.stock > 0 ? (
                  <span className="text-stone-600 dark:text-stone-400 font-medium">
                    In Stock ({product.stock} units)
                  </span>
                ) : (
                  <span className="text-stone-600 dark:text-stone-400 font-medium">
                    Out of Stock
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-stone-600 dark:text-stone-300" />
              <span className="capitalize font-medium text-stone-900 dark:text-stone-100">
                {product.category}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
              Product Description
            </h2>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-stone-200 dark:border-stone-700">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-2 text-stone-600 dark:text-stone-400" />
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                Free Shipping
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-stone-600 dark:text-stone-400" />
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                2 Year Warranty
              </p>
            </div>
            <div className="text-center">
              <RefreshCw className="w-6 h-6 mx-auto mb-2 text-stone-600 dark:text-stone-400" />
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                30-Day Returns
              </p>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="w-full bg-stone-600 dark:bg-stone-500 text-white py-4 rounded-lg hover:bg-stone-700 dark:hover:bg-stone-600 transition-colors text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </section>
      </div>
    </main>
  );
}
