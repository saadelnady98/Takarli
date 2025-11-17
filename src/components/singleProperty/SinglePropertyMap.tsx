import React from "react";
 import MapComponent from "./Map";  
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page";
import { useTranslations } from "next-intl";

export default function SinglePropertyMapSection({
  singlePropertyData,
}: {
  singlePropertyData: SinglePropertyResponse   ;
}) {
  const mapData = singlePropertyData?.maps;
   const address = singlePropertyData?.address;
   const t = useTranslations("singleProperty");
  return (
    <div className="flex w-full flex-col gap-[1rem]">
      <h3 className="text-dark lg:text-2xl "> {t("location")}:</h3>

      <p className="text-dark-grey text-[1.25rem] font-light  ">
        {address || t("locationNotAvailable")}
      </p>

      <div className="w-full py-5 ">
        <MapComponent data={mapData} address={address} />
      </div>
    </div>
  );
}
