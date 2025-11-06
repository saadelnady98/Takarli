"use client";

import React, { useState } from "react";
import HomePropertySwiper from "../sharedUi/homePropertyswiper/HomePropertySwiper";
import { HomePageResponse } from "@/types/home-types";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ReadyOffSectionProps {
  sectionType: "ready_to_move" | "off_plan";
  data: HomePageResponse["ready_to_move"] | HomePageResponse["off_plan"];
}

export default function ReadyOffSection({ data }: ReadyOffSectionProps) {
  const countryNames = data.countries?.map((c) => c.country) || [];
  const [selectedCountry, setSelectedCountry] = useState<string>(
    countryNames[0] || ""
  );
  const t = useTranslations("home");
  const selectedProperties =
    data.countries?.find((c) => c.country === selectedCountry)?.properties || [];

  return (
    <div className="flex w-full flex-col items-center lg:gap-6 gap-5 container-padding">
      <div className="flex flex-col items-center">
        {/* <h3 className="text-dark text-xl font-bold">
          {sectionType === "ready_to_move" ? t("readyToMove") : t("offPlan")}
        </h3> */}
        <p className=" text-xl lg:text-3xl font-[galleds] text-center uppercase ">
          {data.short_description}
        </p>
      </div>

      {countryNames.length === 0 ? (
           <main className="min-h-fit container-padding  flex items-center justify-center flex-col lg:gap-10 gap-5">
      <Image
        src="/assets/not-found.webp"
        quality={100}
        alt="not-found"
        width={326}
        height={263}
        className="object-contain"
      />

      <h1 className="text-base lg:text-3xl capitalize text-center font-light">
        {t("noCountriesAvailable")}
      </h1>

    
    </main>
      ) : (
        <>
          <div className="bg-badge p-1 grid grid-cols-2 items-center lg:rounded-3xl rounded-[7.5px]">
            {countryNames.map((country) => (
              <p
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`bg-badge flex lg:px-7.5 lg:py-3 px-3.5 py-1.5 items-center justify-center lg:rounded-3xl rounded-[7.5px] lg:text-xl text-sm font-medium cursor-pointer transition-colors ${selectedCountry === country
                    ? "bg-black text-white"
                    : "bg-transparent text-black"
                  }`}
              >
                {country}
              </p>
            ))}
          </div>

          {selectedProperties.length > 0 ? (
            <HomePropertySwiper PropertyCards={selectedProperties} />
          ) : (
            <p className="text-dark-grey text-center text-lg font-medium mt-8">
              {t("noPropertiesAvailable")}
            </p>
          )}
        </>
      )}
    </div>
  );
}
