"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"
import "swiper/css"
import "swiper/css/pagination"
import "./HeroHomeS.css"

interface SlideItem {
  id: number
  img: string
}

interface HeroHomeSwiperProps {
  data: SlideItem[]
}

export default function HeroHomeSwiper({ data }: HeroHomeSwiperProps) {
  return (
    <div className="h-[850px] w-full">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="herohome"
      >
        {data.map((item, index) => (
          <SwiperSlide key={item.id} className="h-full w-full">
            <Image
              src={item.img ?? "/assets/homepage/home-vila.webp"}
              alt="Luxury property"
              fill
              className="h-full w-full object-cover object-center"
              priority={index === 0}
              quality={75}
              fetchPriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 z-[5] bg-black/60" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
