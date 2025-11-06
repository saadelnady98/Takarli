"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

interface MobileSwiperProps {
  data: string[];
}
export default function MobileSwiper({ data }: MobileSwiperProps) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data?.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image src={item} alt="img" width={1920} height={1080} className="h-full w-full object-cover"
                priority quality={75} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
