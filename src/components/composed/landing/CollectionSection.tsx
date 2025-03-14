"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

interface CollectionSectionProps {
  collections: Collection[];
}

export default function CollectionSection({
  collections,
}: CollectionSectionProps) {
  return (
    <section className="py-40 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Latest Collections</h2>
          <div className="flex items-center gap-3">
            <button className="collection-swiper-button-prev w-10 h-10 !static flex items-center justify-center !rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button className="collection-swiper-button-next w-10 h-10 !static flex items-center justify-center !rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: ".collection-swiper-button-prev",
              nextEl: ".collection-swiper-button-next",
            }}
           
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="collections-slider"
          >
            {collections.map((collection) => (
              <SwiperSlide key={collection.id}>
                <Link href={collection.link}>
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-gray-200">{collection.description}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
