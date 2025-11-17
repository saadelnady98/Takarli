"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { HomePageResponse } from "@/types/home-types";
import { useTranslations } from "next-intl";

const HomePropertySwiper = dynamic(
  () => import("../sharedUi/homePropertyswiper/HomePropertySwiper"),
  { ssr: false }
);

interface ReadyOffSectionProps {
  sectionType: "ready_to_move" | "off_plan";
  data: HomePageResponse["ready_to_move"] | HomePageResponse["off_plan"];
}

export default function ReadyOffSection({ data }: ReadyOffSectionProps) {
  const t = useTranslations("home");

  const countryNames = useMemo(
    () => data.countries?.map((c) => c.country) || [],
    [data.countries]
  );
  const [selectedCountry, setSelectedCountry] = useState(countryNames[0] || "");
  const selectedProperties = useMemo(
    () =>
      data.countries?.find((c) => c.country === selectedCountry)?.properties ||
      [],
    [data.countries, selectedCountry]
  );

  if (countryNames.length === 0) {
    return (
      <main className="min-h-fit container-padding flex items-center justify-center flex-col lg:gap-10 gap-5">
        <Image
          src="/assets/not-found.webp"
          alt="not-found"
          width={326}
          height={263}
          quality={85}
          placeholder="blur"
          blurDataURL="/assets/not-found-small.webp"
          loading="lazy"
          className="object-contain"
        />
        <h1 className="text-base lg:text-3xl capitalize text-center font-light">
          {t("noCountriesAvailable")}
        </h1>
      </main>
    );
  }

  return (
    <div className="flex w-full flex-col items-center lg:gap-6 gap-5 container-padding">
      <p className="text-xl lg:text-3xl text-center uppercase">
        {data.short_description}
      </p>

      <div className="bg-badge p-1 grid grid-cols-2 items-center lg:rounded-3xl rounded-[7.5px]">
        {countryNames.map((country) => {
          const active = selectedCountry === country;
          return (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`flex lg:px-7.5 lg:py-3 px-3.5 py-1.5 cursor-pointer items-center justify-center lg:rounded-3xl rounded-[7.5px] lg:text-xl text-sm font-medium transition-colors duration-200 ${
                active ? "bg-black text-white" : "bg-transparent text-black"
              }`}
            >
              {country}
            </button>
          );
        })}
      </div>

      {selectedProperties.length > 0 ? (
        <HomePropertySwiper PropertyCards={selectedProperties} />
      ) : (
        <p className="text-dark-grey text-center text-lg font-medium mt-8">
          {t("noPropertiesAvailable")}
        </p>
      )}
    </div>
  );
}
