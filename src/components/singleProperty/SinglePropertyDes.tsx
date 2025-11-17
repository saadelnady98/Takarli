import { useTranslations } from "next-intl";
import React from "react";

type SingleProperty = {
  description?: string;
};

export default function SinglePropertyDes({
  singlePropertyData,
}: {
  singlePropertyData: SingleProperty;
}) {
  const t = useTranslations("singleProperty");
  return (
    <div className="flex flex-col gap-4">
      <p className=" text-xl lg:text-3xl text-dark">
        {t("description")} :
      </p>

      <div
        className="text-dark-grey text-base lg:text-base font-light space-y-6"
        dangerouslySetInnerHTML={{
          __html: singlePropertyData?.description || "No description available.",
        }}
      />
    </div>
  );
}
