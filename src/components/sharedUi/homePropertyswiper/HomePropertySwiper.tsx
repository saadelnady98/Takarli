"use client"
import React, { useRef, useState, useEffect } from "react"
import PropertyCard from "../PropertyCard/PropertyCard"
import type { Swiper as SwiperType } from "swiper"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/autoplay"
import "./style.css"
import { Autoplay, Navigation } from "swiper/modules"
import { HomePropertySwiperProps } from "@/types/interfaceData"
import { usePathname } from "next/navigation"
import { MoveLeft, MoveRight } from "lucide-react"

export default function HomePropertySwiper({ PropertyCards, className }: HomePropertySwiperProps) {
  const desktopPrevRef = useRef<HTMLButtonElement>(null)
  const desktopNextRef = useRef<HTMLButtonElement>(null)
  const mobilePrevRef = useRef<HTMLButtonElement>(null)
  const mobileNextRef = useRef<HTMLButtonElement>(null)

  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "/fr" || pathname === "/en"
  const [isInitialized, setInit] = useState(false)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  useEffect(() => {
    setInit(true)
  }, [])

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext()
    }
  }

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
        navigation={
          isInitialized
            ? {
                prevEl: desktopPrevRef.current,
                nextEl: desktopNextRef.current,
              }
            : false
        }
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
      <div className="mt-6 flex justify-center gap-4 xl:hidden">
        <button
          ref={mobilePrevRef}
          onClick={handlePrev}
          aria-label="Previous slide"
          title="Previous slide"
          className="flex h-10 w-10 cursor-pointer items-center justify-center border border-gray-300 bg-white shadow transition-colors hover:bg-gray-50 focus:outline-none"
        >
          <MoveLeft className="h-5 w-5" />
        </button>
        <button
          ref={mobileNextRef}
          onClick={handleNext}
          aria-label="Next slide"
          title="Next slide"
          className="flex h-10 w-10 cursor-pointer items-center justify-center border border-gray-300 bg-white shadow transition-colors hover:bg-gray-50 focus:outline-none"
        >
          <MoveRight className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop Navigation Buttons - Swiper Navigation */}
      <div className="max-xl:hidden">
        <button
          ref={desktopPrevRef}
          onClick={handlePrev}
          aria-label="Previous slide"
          title="Previous slide"
          className="absolute top-1/2 -left-0.5 z-10 -translate-y-1/2 cursor-pointer p-2 transition-all duration-300 hover:scale-110 lg:-left-[3rem]"
        >
          <MoveLeft className="h-5 w-5" />
        </button>
        <button
          ref={desktopNextRef}
          onClick={handleNext}
          aria-label="Next slide"
          title="Next slide"
          className="absolute top-1/2 -right-0.5 z-10 -translate-y-1/2 cursor-pointer p-2 transition-all duration-300 hover:scale-110 lg:-right-[3rem]"
        >
          <MoveRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
