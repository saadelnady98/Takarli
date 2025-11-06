"use client";
import React from "react";
import HomePropertySwiper from "../sharedUi/homePropertyswiper/HomePropertySwiper";
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page";

export default function SinglePropertySimiler({singlePropertyData}: {singlePropertyData: SinglePropertyResponse}) {
  return (
    <div className="flex flex-col gap-[1rem] w-full pb-20">
      <h5 className="text-dark font-[galleds] lg:text-3xl text-xl">
        Similar Properties :
      </h5>
      <div className="w-full ">
        <HomePropertySwiper PropertyCards={singlePropertyData?.similar_properties} className="" />
      </div>
    </div>
  );
}
