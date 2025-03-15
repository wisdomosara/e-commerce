"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

interface NewArrival {
  id: number;
  title: string;
  price: number;
  image: string;
  link: string;
}

interface NewArrivalsProps {
  newArrivals: NewArrival[];
}

export default function NewArrivals({ newArrivals }: NewArrivalsProps) {
  return (
    <section className="py-10 md:py-20 bg-neutral-100 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <div className="flex items-center gap-3">
            <button className="e-swiper-button-prev w-10 h-10 !static flex items-center justify-center !rounded-full bg-neutral-100 dark:bg-neutral-700 shadow-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button className="e-swiper-button-next w-10 h-10 !static flex items-center justify-center !rounded-full bg-neutral-100 dark:bg-neutral-700 shadow-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
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
              prevEl: ".e-swiper-button-prev",
              nextEl: ".e-swiper-button-next",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="new-arrivals-slider"
          >
            {newArrivals.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={item.link}>
                  <div className="bg-gray-200 dark:bg-neutral-700 rounded-lg overflow-hidden shadow-sm">
                    <div className="relative h-[320px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-lg font-bold mt-2">${item.price}</p>
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
