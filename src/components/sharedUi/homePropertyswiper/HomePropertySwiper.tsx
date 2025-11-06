
"use client";
import React, { useRef, useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "./style.css";
import { Autoplay, Navigation } from "swiper/modules";
import { HomePropertySwiperProps } from "@/types/interfaceData";
import { usePathname } from "next/navigation";
import { MoveLeft, MoveRight } from "lucide-react";

export default function HomePropertySwiper({
  PropertyCards,
  className,
}: HomePropertySwiperProps) {
  const desktopPrevRef = useRef<HTMLButtonElement>(null);
  const desktopNextRef = useRef<HTMLButtonElement>(null);
  const mobilePrevRef = useRef<HTMLButtonElement>(null);
  const mobileNextRef = useRef<HTMLButtonElement>(null);
  
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/fr" || pathname === "/en";
  const [isInitialized, setInit] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    setInit(true);
  }, []);

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <div className={`relative ${isHome ? "w-full" : ""} ${className || ""}`}>
      
      <Swiper
        slidesPerView={3}
        spaceBetween={24}
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        navigation={isInitialized ? {
          prevEl: desktopPrevRef.current,
          nextEl: desktopNextRef.current,
        } : false}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className="mySwiper w-full"
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {PropertyCards.map((item) => (
          <SwiperSlide key={item.id} className="w-full">
            <PropertyCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile Navigation Buttons - Manual control */}
      <div className="flex justify-center gap-4 mt-6 xl:hidden">
        <button
          ref={mobilePrevRef}
          onClick={handlePrev}
          className="w-10 h-10 bg-white border border-gray-300  shadow flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <MoveLeft className="w-5 h-5" />
        </button>
        <button
          ref={mobileNextRef}
          onClick={handleNext}
          className="w-10 h-10 bg-white border border-gray-300  shadow flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <MoveRight className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Navigation Buttons - Swiper Navigation */}
      <div className="max-xl:hidden">
        <button
          ref={desktopPrevRef}
          className="absolute top-1/2 lg:-left-[3rem] -left-0.5 z-10 -translate-y-1/2 cursor-pointer  p-2  hover:scale-110 transition-all duration-300"
        >
          <MoveLeft className="w-5 h-5" />
        </button>
        <button
          ref={desktopNextRef}
          className="absolute top-1/2 lg:-right-[3rem] -right-0.5 z-10 -translate-y-1/2 cursor-pointer  p-2  hover:scale-110 transition-all duration-300"
        >
          <MoveRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}