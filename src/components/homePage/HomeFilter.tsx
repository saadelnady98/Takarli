"use client";

import React, { useMemo } from "react";
import { useFilters } from "@/context/filters-context";
import { useRouter } from "next/navigation";
import DynamicDropdown from "../sharedUi/Filters/dynamic-dropdown";
import PriceRangeDropdown from "../sharedUi/Filters/price-range-dropdown";
import { Button } from "../ui/button";
import { useLangCurr } from "@/context/langCurrContext";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RotateCcw } from "lucide-react";

export default function HomeFilter() {
  const router = useRouter();
  const t = useTranslations("home.homeFilter");
  const { filters, clearAllFilters } = useFilters();
  const { language } = useLangCurr();

  const countryId = filters.country?.id;
  const countrySlug = filters.country?.raw?.slug || "";
  const hasCountry = !!countrySlug;

  // ✅ Check if any filter has value for reset button animation
  const hasActiveFilters = useMemo(() => {
    return (
      !!filters.country ||
      !!filters.city ||
      !!filters.category ||
      !!filters.priceRange ||
      !!filters.property ||
      !!filters.developers ||
      !!filters.area
    );
  }, [filters]);

  const handleSearch = () => {
    if (!hasCountry) return;
    router.push(`/${language}/${countrySlug}`);
  };

  const handleReset = () => {
    clearAllFilters(); // Reset everything including country
  };

  const icons = {
    location: (
      <Image
        src={"/assets/filters/location.svg"}
        width={20}
        height={20}
        alt="location"
        className="h-5 w-5 opacity-70"
        unoptimized
      />
    ),
    category: (
      <Image
        src={"/assets/filters/category.svg"}
        width={20}
        height={20}
        alt="category"
        className="h-5 w-5 opacity-70"
        unoptimized
      />
    ),
    money: (
      <Image
        src={"/assets/filters/money.svg"}
        width={20}
        height={20}
        alt="money"
        className="h-5 w-5 opacity-70"
        unoptimized
      />
    ),
    search: (
      <Image
        src={"/assets/filters/search.svg"}
        width={20}
        height={20}
        alt="search"
        className="h-5 w-5 text-white"
        unoptimized
      />
    ),
  };

  return (
    <div className="relative z-20 mx-auto w-full bg-white p-4 shadow-lg lg:p-6">
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-5 md:gap-3">

        <DynamicDropdown
          endpoint="/country"
          placeholder={t("selectCountry")}
          filterKey="country"
          beforeImage={icons.location}
        />

        <DynamicDropdown
          endpoint={countryId ? `/city/${countryId}` : ""}
          placeholder={t("selectCity")}
          filterKey="city"
          isEnabled={!!countryId}
          beforeImage={icons.location}
        />

        <DynamicDropdown
          endpoint="/category"
          placeholder={t("selectCategory")}
          filterKey="category"
          beforeImage={icons.category}
        />

        <PriceRangeDropdown />

        {/* Search and Reset Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSearch}
            disabled={!hasCountry}
            className="h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-none bg-black text-sm text-white transition-colors hover:bg-gray-800 lg:text-lg"
          >
            {icons.search}
            {t("search")}
          </Button>

          {/* Reset Button with animation when active */}
          <button
            onClick={handleReset}
            className={`flex h-12 cursor-pointer items-center justify-center  border border-gray-300 bg-white px-3 text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
              hasActiveFilters 
                ? "animate-pulse ring-2 ring-dark/90 ring-opacity-50" 
                : ""
            }`}
            title={t("resetFilters")}
          >
            <RotateCcw className={`h-5 w-5 ${hasActiveFilters ? "text-dark/90" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}