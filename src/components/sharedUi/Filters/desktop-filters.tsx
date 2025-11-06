"use client";
import React from "react";
import { Variants, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import DynamicDropdown from "./dynamic-dropdown";
import PriceRangeDropdown from "./price-range-dropdown";
import SharedDropdown from "./SharedDrowpdown";
import { FilterIcon, FilterIconProps } from "./filter-icons";
import { DynamicDropdownConfig, PriceRangeConfig } from "@/types/filter-types";
import { useFilters } from "@/context/filters-context";
import { useTranslations } from "next-intl";

interface DesktopFiltersProps {
  dropdownConfigs: DynamicDropdownConfig[];
  priceRelatedFilters: PriceRangeConfig[];
  sortOptions: Array<{ label: string; value: string }>;
  hasActiveFilters: boolean;
  onReset: () => void;
  resetButtonVariants: Variants;
}

export const DesktopFilters: React.FC<DesktopFiltersProps> = ({
  dropdownConfigs,
  priceRelatedFilters,
  sortOptions,
  hasActiveFilters,
  onReset,
  resetButtonVariants,
}) => {
  const { filters, setFilter } = useFilters();
  const t = useTranslations("properties.filters");
  const renderDynamicDropdown = (config: DynamicDropdownConfig) => (
    <div key={config.key} className="flex flex-col">
      <label className="text-dark mb-2 text-sm font-medium max-xl:text-center">
        {config.label}
      </label>
      <DynamicDropdown
        endpoint={config.endpoint}
        placeholder={config.placeholder}
        filterKey={config.key}
        beforeImage={<FilterIcon type={config.icon as FilterIconProps['type']} />}
        isEnabled={config.isEnabled}
      />
    </div>
  );

  const renderPriceRangeDropdown = (config: PriceRangeConfig) => (
    <div key={config.key} className="flex flex-col">
      <label className="text-dark mb-2 text-sm font-medium max-xl:text-center">
        {config.label}
      </label>
      <PriceRangeDropdown />
    </div>
  );

  return (
    <div className="container-padding hidden lg:block">
      <div className="items-center gap-1 xl:flex">
        <div className="grid grid-cols-1 justify-center gap-5 py-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {dropdownConfigs.map(renderDynamicDropdown)}
          {priceRelatedFilters.map(renderPriceRangeDropdown)}

          <div className="flex flex-col justify-end">
            <label className="text-dark mb-2 text-sm font-medium max-xl:text-center">
              {t("sort")}
            </label>
            <SharedDropdown
              data={sortOptions}
              value={filters.sort?.value}
              placeholder={t("selectSort")}
              onChange={(value, item) =>
                setFilter("sort", {
                  id: 0,
                  value,
                  label: item?.label ?? "",
                  raw: item?.raw,
                })
              }
            />
          </div>

          {/* Mobile Reset Button */}
          <div className="flex flex-col pt-7 xl:pt-0 xl:hidden">
            <button
              onClick={onReset}
              className="bg-dark flex h-[48px] cursor-pointer items-center justify-center gap-2 text-white xl:hidden"
            >
              <RotateCcw className="h-[20px] w-[20px] text-xs text-white" />
              {t("resetFilters")}
            </button>
          </div>
        </div>

        {/* Desktop Reset Button */}
        <motion.button
          onClick={onReset}
          className="hidden xl:flex cursor-pointer transition-all flex-col items-center justify-center"
          variants={resetButtonVariants}
          initial="initial"
        //   animate={hasActiveFilters ? "pulse" : "initial"}
        //   whileHover="hover"
          whileTap="tap"
        >
          <label className="text-dark mb-2 text-sm font-medium max-xl:text-center">
            {t("reset")}
          </label>
          <div
            className={`flex h-[48px] w-12 items-center justify-center rounded-none border px-3 py-2 text-xs hover:border-gray-400 focus:outline-none`}
          >
            <RotateCcw className={`h-5 w-5
                  ${hasActiveFilters
                ? "animate-pulse"
                : ""
            }
                `} />
          </div>
        </motion.button>
      </div>
    </div>
  );
};