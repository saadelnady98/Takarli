import React from "react";
import Image from "next/image";
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page";
import { useTranslations } from "next-intl";

export default function SinglePropertyFeatures({ singlePropertyData }: { singlePropertyData: SinglePropertyResponse }) {
  const t = useTranslations("singleProperty");
  return (
    <div className="flex flex-col gap-4">
      <p className="font-[galleds] text-lg lg:text-3xl text-dark"> {t("keyFeatures")}</p>
      <div className="border-border flex w-full flex-col gap-5 border p-4 lg:p-6">
        <p className="font-[galleds] text-lg lg:text-3xl text-dark"> {t("amenities")}</p>
        <span className="block w-full border-b border-[rgba(210,210,210,1)] " />
        <div className="gap-X-[4.688rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-9">
          {singlePropertyData?.amenities.map((item) => {
            return (
              <div key={item.id} className="flex items-center gap-2">
                <div className="border-border h-8 w-8 rounded-full border p-1.5">
                  <Image src={item.image} alt="bed" width={20} height={20} quality={75} />
                </div>
                <span className="text-dark-grey text-lg font-light">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
