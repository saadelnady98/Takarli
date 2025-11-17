"use client";
import React from "react";
import HomePropertySwiper from "../sharedUi/homePropertyswiper/HomePropertySwiper";
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page";
import { useTranslations } from "next-intl";

export default function SinglePropertySimiler({singlePropertyData}: {singlePropertyData: SinglePropertyResponse}) {
  const t = useTranslations("singleProperty");
  return (
    <div className="flex flex-col gap-[1rem] w-full pb-20">
      <h5 className="text-dark  lg:text-3xl text-xl">
        {t("similarProperties")}
      </h5>
      <div className="w-full ">
        <HomePropertySwiper PropertyCards={singlePropertyData?.similar_properties} className="" />
      </div>
    </div>
  );
}
