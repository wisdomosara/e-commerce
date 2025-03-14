"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { IProduct } from "@/interfaces/IProduct.interface";

export function ProductCard({
  id,
  title,
  price,
  discountPercentage,
  rating,
  // stock,
  brand,
  images,
  thumbnail,
  availabilityStatus,
}: IProduct) {
  // Use images array or fallback to thumbnail in an array
  const productImages = images.length > 0 ? images : [thumbnail];

  // Refs for custom navigation
  const swiperRef = useRef<SwiperType | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Format price display
  const formatPrice = (amount: number) => {
    return `₦ ${amount.toLocaleString()}`;
  };

  // Calculate discounted price
  const getDiscountedPrice = () => {
    if (discountPercentage) {
      const discountAmount = price * (discountPercentage / 100);
      return price - discountAmount;
    }
    return price;
  };

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
      }
    };

    const handleNextClick = () => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    };

    prevButton.addEventListener("click", handlePrevClick);
    nextButton.addEventListener("click", handleNextClick);

    return () => {
      prevButton.removeEventListener("click", handlePrevClick);
      nextButton.removeEventListener("click", handleNextClick);
    };
  }, []);

  // Render rating stars
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        )}
        <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  // Get stock status
  const getStockStatus = () => {
    if (availabilityStatus === "Low Stock") {
      return <span className="text-xs text-orange-600">Low Stock</span>;
    } else if (availabilityStatus === "Out of Stock") {
      return <span className="text-xs text-red-600">Out of Stock</span>;
    }
    return <span className="text-xs text-green-600">In Stock</span>;
  };

  return (
    <Link href={`/products/${id}`} passHref className="group block">
      <div className="relative overflow-hidden rounded-md bg-gray-50 dark:bg-gray-800 shadow-sm transition-all hover:shadow-md">
        {discountPercentage && Math.round(discountPercentage) > 0 && (
          <div className="absolute right-2 top-2 z-10 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
            -{Math.round(discountPercentage)}%
          </div>
        )}

        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700 sm:h-64">
          {/* Swiper carousel */}
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            loop={productImages.length > 1}
            grabCursor={true}
            className="h-full w-full product-swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {productImages.map((src, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          {productImages.length > 1 && (
            <>
              <button
                ref={prevButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                className="nav-btn-prev absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md transition-opacity hover:bg-white focus:outline-none opacity-0 group-hover:opacity-100 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                ref={nextButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                className="nav-btn-next absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md transition-opacity hover:bg-white focus:outline-none opacity-0 group-hover:opacity-100 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {brand}
            </span>
            {renderRatingStars(rating)}
          </div>

          <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900 dark:text-gray-100 sm:text-base">
            {title}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg">
                {formatPrice(getDiscountedPrice())}
              </div>
              {discountPercentage && discountPercentage > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 line-through sm:text-sm">
                  {formatPrice(price)}
                </div>
              )}
            </div>
            {getStockStatus()}
          </div>
        </div>
      </div>
    </Link>
  );
}
