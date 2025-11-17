"use client";
import React from "react";
import SinglePropertySwiper from "./SinglePropertySwiper";
import { useTranslations } from "next-intl";
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page";

export default function SinglePropertyFloor({
  singlePropertyData,
}: {
  singlePropertyData?: SinglePropertyResponse;
}) {
  const t = useTranslations("singleProperty");

  const apartments = singlePropertyData?.floor?.apartments;

  return (
    <div className="flex flex-col gap-4 w-full">
      {Array.isArray(apartments) && apartments.length > 0 && (
        <>
          <span className="block w-full border-b border-[rgba(210,210,210,1)]" />
          <p className=" text-xl lg:text-2xl text-dark">
            {t("floorPlan")}:
          </p>
        </>
      )}

      <SinglePropertySwiper singlePropertyData={singlePropertyData} />
    </div>
  );
}
