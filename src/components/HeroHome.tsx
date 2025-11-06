"use client";
import { HomePageResponse } from "@/types/home-types";
import CountCompRange from "@/components/CountCompRange";
import HeroHomeSwiper from "@/components/homePage/herohomeswiper/HeroHomeSwiper";
import HomeFilter from "@/components/homePage/HomeFilter";
import { useTranslations } from "next-intl";

export default function HeroHome({ data }: { data: HomePageResponse }) {
  // ✅ تعديل الماب على الصور بناءً على الريسبونس الجديد
  const t = useTranslations("home.statistics");
  const sliderImages =
    data?.slider?.images?.map((img, i) => ({
      id: i,
      img, // الصورة نفسها هي الرابط
    })) || [];

  const countItems = [
    { id: 1, title: t("offPlan"), count: data?.statistics?.off_plan || 0 },
    { id: 2, title: t("readyToMove"), count: data?.statistics?.ready_to_move || 0 },
    { id: 3, title: t("developers"), count: data?.statistics?.developers || 0 },
  ];

  return (
    <section className="relative min-h-[850px] pt-24 w-full flex justify-center items-center ">
      {/* Background Swiper */}
      <div className="absolute inset-0 z-0">
        <HeroHomeSwiper data={sliderImages} />
      </div>

      {/* Content Overlay */}
      <div className="container-padding  max-w-full overflow-hidden mx-auto flex flex-col items-center text-center xl:gap-10 gap-5 relative z-5">
        {/* Title */}
        <h1 className="font-[galleds] xl:w-3/4 text-white lg:text-5xl text-3xl mx-auto xl:min-h-[140px] xl:leading-[140%]">
          {data?.slider?.text}
        </h1>

        {/* Description */}
        <p className="text-white font-light lg:w-1/2 lg:text-xl text-sm mx-auto">
          {data?.slider?.description}
        </p>

        {/* Filter Section */}
        <HomeFilter />

        {/* Statistics */}
        <div className="grid grid-cols-3 justify-center items-start gap-4 lg:gap-16 w-full">
          {countItems.map((item) => (
            <CountCompRange key={item.id} startValue={item.count} title={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
