import React from "react";

type SingleProperty = {
  description?: string;
};

export default function SinglePropertyDes({
  singlePropertyData,
}: {
  singlePropertyData: SingleProperty;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-[galleds] text-xl lg:text-3xl text-dark">
        Description :
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
