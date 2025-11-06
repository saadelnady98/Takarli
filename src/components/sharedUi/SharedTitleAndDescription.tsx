import React from "react";
import { TitAndDesProps } from "@/types/interfaceData";

export default function SharedTitleAndDescription({ data }: TitAndDesProps) {
  return (
    <div className=" flex-col items-center gap-6  lg:pt-8 pt-4 lg:pb-12 pb-6 flex   container-padding">
      <h2 className="text-dark text-2xl font-bold text-center ">{data[0].title}</h2>
      <h3 className="lg:text-4xl text-2xl font-[galleds] text-center text-dark">{data[0].short}</h3>
      <p className="lg:text-xl text-base text-dark-grey font-sans lg:w-3/4 text-center m-auto ">{data[0].des}</p>
    </div>
  );
}
