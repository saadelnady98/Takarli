// components/filters/FilterIcon.tsx
import React from "react";
import Image from "next/image";

export interface FilterIconProps {
  type: "location" | "category" | "prop-type" | "developers" | "money" | "sort" | "filter";
  className?: string;
}

export const FilterIcon: React.FC<FilterIconProps> = ({ type, className = "h-5 w-5" }) => {
  const iconMap = {
    location: "/assets/filters/location.svg",
    category: "/assets/filters/category.svg",
    "prop-type": "/assets/filters/prop-type.svg",
    developers: "/assets/filters/developers.svg",
    money: "/assets/filters/money.svg",
    sort: "/assets/filters/sort.svg",
    filter: "/assets/filters/filter.svg",
  };

  return (
    <Image
      src={iconMap[type]}
      width={20}
      height={20}
      alt={type}
      className={className}
      unoptimized
    />
  );
};