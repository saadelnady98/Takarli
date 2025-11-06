import React from "react";
import { Images } from "@/data/data";
import Image from "next/image";
import { HeroSectionProps } from "@/types/interfaceData";

export default function HeroSection({
  BadgeClassName,
  Badgetitle,
  HeroSectionClassName,
  TitleName,
  TitleClassName,
  img,
}: HeroSectionProps) {
  return (
    <div
      className={`${HeroSectionClassName ?? ""} relative mx-auto flex h-[17.75rem] !w-full flex-col items-center gap-[.5rem]`}
    >
      <Image
        src={img ?? Images.img5}
        alt="banner"
        width={2000}
        height={1000}
        className="h-full w-full object-cover"
      />
      <div className="absolute top-0 h-full w-full bg-black opacity-60"> </div>
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <p className={`${BadgeClassName ?? ""} bg-badge flex h-12 w-[235px] items-center justify-center rounded-4xl`}>{Badgetitle}</p>
        <h3
          className={`${TitleClassName ?? ""} font-[galleds] lg:text-5xl text-3xl  text-white`}
        >
          {TitleName}
        </h3>
      </div>
    </div>
  );
}
