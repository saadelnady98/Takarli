"use client";
import React, { useState, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { MoveLeft, MoveRight } from "lucide-react";
import { GalleryHeroDataProps } from "@/types/interfaceData";

export default function GalleryHero({ data }: GalleryHeroDataProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col items-center gap-4 relative w-full">
      <div className="relative w-full">
        <Swiper
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          slidesPerView={1}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, EffectFade, Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
         onBeforeInit={(swiper) => {
  // @ts-expect-error - swiper navigation typing mismatch (expected HTMLElement | null)
  swiper.params.navigation.prevEl = prevRef.current;
  // @ts-expect-error - swiper navigation typing mismatch (expected HTMLElement | null)
  swiper.params.navigation.nextEl = nextRef.current;
}}

          className="mySwiper2"
        >
          {data.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={img}
                alt={`gallery-${i}`}
                width={2000}
                height={1200}
                className="h-[32rem] w-full object-cover transition-all duration-500 rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <>
          <button
            ref={prevRef}
            className="absolute top-1/2 left-3 md:left-6 z-20 -translate-y-1/2 
            bg-black/40 cursor-pointer hover:bg-black/60 text-white rounded-full p-2 md:p-3 
            backdrop-blur-md transition"
          >
            <MoveLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 right-3 md:right-6 z-20 -translate-y-1/2 
            bg-black/40 cursor-pointer hover:bg-black/60 text-white rounded-full p-2 md:p-3 
            backdrop-blur-md transition"
          >
            <MoveRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      </div>

      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={5}
        watchSlidesProgress
        modules={[Thumbs]}
        className="mySwiper mt-3 w-full max-w-5xl"
        breakpoints={{
          0: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {data.map((img, i) => (
          <SwiperSlide
            key={i}
            className="relative outline-none border-dark-grey rounded-md overflow-hidden"
          >
            <Image
              src={img}
              alt={`thumb-${i}`}
              width={200}
              height={120}
              className="h-[6rem] w-full object-cover cursor-pointer opacity-70 hover:opacity-100 transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
