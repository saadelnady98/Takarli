"use client";
import React from "react";
import SharedDrowpdown from "./Filters/SharedDrowpdown";
import { SharedModalBodyProps } from "@/types/interfaceData";

export default function SharedModalBody({ title, data, value, onChange }: SharedModalBodyProps) {
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col gap-[0.5rem]">
        <h2 className="text-dark w-full text-[0.875rem] font-medium">{title}</h2>
        <div className="w-full">
          <SharedDrowpdown data={data} value={value} onChange={onChange} isFilter={false} />
        </div>
      </div>
    </div>
  );
}
