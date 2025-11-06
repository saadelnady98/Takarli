import React from "react";
import { HomePageResponse } from "@/types/home-types";
import { useTranslations } from "next-intl";

export default function AboutTakarli({ data }: { data: HomePageResponse }) {
  const t = useTranslations("home");
  return (
    <div className="flex flex-col items-center lg:gap-6 gap-5 container-padding">

      <h2 className="text-dark lg:text-xl text-sm font-semibold bg-badge flex  lg:px-7.5 lg:py-3 px-3.5 py-1.5 items-center justify-center lg:rounded-4xl rounded-[7.5px]  ">{t("aboutSectionTitle")}  </h2>
      <p className="text-dark  text-center font-[galleds] text-lg sm:text-2xl lg:text-4xl  capitalize lg:w-3/4 m-auto   lg:leading-[174%] text-pretty">
        {data?.Who_We_Are?.title}
        <span className="text-text-Paragraph ml-2.5 ">
          {data?.Who_We_Are?.short_description}
        </span>
      </p>
    </div>
  );
}
