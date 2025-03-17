import React from "react";
import { Star, Package, Tag, Truck, Shield, RefreshCw } from "lucide-react";

export default function LoadingSkeleton() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm animate-pulse">
          <li className="h-4 w-10 bg-neutral-200 dark:bg-neutral-700 rounded"></li>
          <li className="text-neutral-500 dark:text-neutral-400">/</li>
          <li className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded"></li>
          <li className="text-neutral-500 dark:text-neutral-400">/</li>
          <li className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded"></li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <section className="space-y-4">
          <div className="relative">
            <div className="w-full aspect-square rounded-xl bg-neutral-200 dark:bg-neutral-700"></div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-2 mt-[40px]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-neutral-200 dark:bg-neutral-700"
              ></div>
            ))}
          </div>
        </section>

        {/* Product Info */}
        <section className="space-y-8">
          {/* Header */}
          <div className="border-b border-neutral-200 dark:border-neutral-700 pb-6">
            <div className="h-8 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
            <div className="flex items-center justify-between">
              <div className="h-6 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 rounded-full">
                <Star className="w-5 h-5 text-neutral-300 dark:text-neutral-600" />
                <div className="h-4 w-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6 border-y border-neutral-200 dark:border-neutral-700 py-6">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-neutral-300 dark:text-neutral-600" />
              <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-neutral-300 dark:text-neutral-600" />
              <div className="h-5 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div className="h-6 w-40 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              <div className="h-4 w-4/6 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-neutral-200 dark:border-neutral-700">
            {[Truck, Shield, RefreshCw].map((Icon, i) => (
              <div key={i} className="text-center">
                <Icon className="w-6 h-6 mx-auto mb-2 text-neutral-300 dark:text-neutral-600" />
                <div className="h-4 w-20 mx-auto bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>
            ))}
          </div>

          {/* Add to Cart Button */}
          <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
        </section>
      </div>
    </main>
  );
}
