import Image from "next/image";
import React from "react";
import Link from "next/link";
import { HomePageResponse } from "@/types/home-types";
import { useTranslations } from "next-intl";

export default function HomeVilla({data}: {data: HomePageResponse}) {
  const t = useTranslations("home");
  return (
    <div className="w-full container-padding">
      <div className="relative md:min-h-173 min-h-100">
        <Image
          src={'/assets/homepage/home-vila.svg'}
          alt="Villa"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute top-1/2 right-0 md:p-11 p-6 -translate-y-1/2 sm:max-w-140 max-w-3/4 bg-white flex flex-col lg:gap-5 gap-2.5">
          <h5 className=" sm:leading-10 leading-5 sm:text-2xl  text-base font-[galleds] ">
            {data?.Our_Story?.title}
          </h5>
          <p className=" md:leading-10 sm:text-base sm:leading-5 text-xs font-sans font-light text-dark-grey">
            {data?.Our_Story?.short_description}
          </p>
          <Link
            href="/about-us"
            className="bg-dark text-white transition-colors hover:bg-gray-800 shadow-[0rem_0.75rem_1.25rem_0rem_#00000026] rounded-none md:text-md sm:text-lg text-xs md:px-10 sm:px-5 px-2.5 md:py-3 py-1.5  w-fit"
          >
            {t("learnMore")}
          </Link>
        </div>
      </div>
    </div>
  );
}
