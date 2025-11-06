"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "./HeroHomeS.css";

interface SlideItem {
  id: number;
  img: string;
}

interface HeroHomeSwiperProps {
  data: SlideItem[];
}

export default function HeroHomeSwiper({ data }: HeroHomeSwiperProps) {
  return (
    <div className="h-[850px] w-full ">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="herohome"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Image 
              src={item.img ?? '/assets/homepage/hero-home.svg'} 
              alt="Luxury property" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 z-[5] bg-black/60" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}