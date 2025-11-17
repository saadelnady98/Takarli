"use client";
import { HomePageResponse } from "@/types/home-types";
import CountCompRange from "@/components/CountCompRange";
import HeroHomeSwiper from "@/components/homePage/herohomeswiper/HeroHomeSwiper";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

const LazyHomeFilter = lazy(() => import("@/components/homePage/HomeFilter"));

export default function HeroHome({ data }: { data: HomePageResponse }) {
  const t = useTranslations("home.statistics");
  
  const sliderImages = data?.slider?.images?.map((img, i) => ({
    id: i,
    img,
  })) || [];

  const countItems = [
    { id: 1, title: t("offPlan"), count: data?.statistics?.off_plan || 0 },
    { id: 2, title: t("readyToMove"), count: data?.statistics?.ready_to_move || 0 },
    { id: 3, title: t("developers"), count: data?.statistics?.developers || 0 },
  ];

  return (
    <section className="relative min-h-[850px] pt-24 w-full flex justify-center items-center">
      <div className="absolute inset-0 z-0">
        <HeroHomeSwiper data={sliderImages} />
      </div>

      <div className="container-padding max-w-full overflow-hidden mx-auto flex flex-col items-center text-center xl:gap-10 gap-5 relative z-10">
        <h1 className="xl:w-3/4 text-white lg:text-5xl sm:text-3xl text-xl mx-auto xl:min-h-[140px] xl:leading-[140%] min-h-0">
          {data?.slider?.text}
        </h1>

        <p className="text-white font-light lg:w-1/2 lg:text-xl sm:text-sm text-xs mx-auto min-h-[60px]">
          {data?.slider?.description}
        </p>

        <Suspense fallback={<div className="h-24 w-full animate-pulse bg-gray-200" />}>
          <LazyHomeFilter />
        </Suspense>

        <div className="grid grid-cols-3 justify-center items-start gap-4 lg:gap-16 w-full min-h-[100px]">
          {countItems.map((item) => (
            <CountCompRange 
              key={item.id} 
              startValue={item.count} 
              title={item.title} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}