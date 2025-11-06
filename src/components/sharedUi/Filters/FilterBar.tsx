// components/filters/FilterBar.tsx
"use client";
import React from "react";
import { useFilters } from "@/context/filters-context";
import { useFilterAnimation } from "@/hooks/use-filter-animation";
import { useFilterConfig } from "@/hooks/use-filter-animation";
import { FilterService } from "./filter-services";
import { DesktopFilters } from "./desktop-filters";
import { MobileFilters } from "./mobile-filters";
import MobileSort from "./MobileSort";
import DynamicDropdown from "./dynamic-dropdown";
import PriceRangeDropdown from "./price-range-dropdown";
import { FilterIcon, FilterIconProps } from "./filter-icons";

export default function FilterBar() {
  const { filters, clearAllFilters, setFilter } = useFilters();
  const { resetButtonVariants } = useFilterAnimation();
  const { dropdownConfigs, priceRelatedFilters, sortOptions } = useFilterConfig();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = React.useState(false);

  const hasActiveFilters = FilterService.hasActiveFilters(filters);

  const handleReset = () => {
    FilterService.handleReset(filters, clearAllFilters, setFilter);
    setIsMobileFiltersOpen(false);
  };

  const handleSortChange = (value: string) => {
    setIsMobileSortOpen(false);
    setFilter("sort", {
      id: 0,
      value,
      label: value,
      raw: value,
    });
  };

  const mobileFiltersContent = (
    <div className="flex flex-col gap-4">
      {dropdownConfigs.map((config) => (
        <div key={config.key} className="flex flex-col">
          <label className="text-dark mb-2 text-sm font-medium">{config.label}</label>
          <DynamicDropdown
            endpoint={config.endpoint}
            placeholder={config.placeholder}
            filterKey={config.key}
            beforeImage={<FilterIcon type={config.icon as FilterIconProps['type']} />}
            isEnabled={config.isEnabled}
          />
        </div>
      ))}
      {priceRelatedFilters.map((config) => (
        <div key={config.key} className="flex flex-col">
          <label className="text-dark mb-2 text-sm font-medium">{config.label}</label>
          <PriceRangeDropdown />
        </div>
      ))}
    </div>
  );

  return (
    <div className="border border-b-gray-300 bg-white lg:border-b">
      <DesktopFilters
        dropdownConfigs={dropdownConfigs}
        priceRelatedFilters={priceRelatedFilters}
        sortOptions={sortOptions}
        hasActiveFilters={hasActiveFilters}
        onReset={handleReset}
        resetButtonVariants={resetButtonVariants}
      />

      <MobileFilters
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        onOpenSort={() => setIsMobileSortOpen(true)}
        onOpenFilters={() => setIsMobileFiltersOpen(true)}
        onReset={handleReset}
        hasActiveFilters={hasActiveFilters}
        resetButtonVariants={resetButtonVariants}
      >
        {mobileFiltersContent}
      </MobileFilters>

      <MobileSort
        isMobileSortOpen={isMobileSortOpen}
        setIsMobileSortOpen={setIsMobileSortOpen}
        sortOptions={sortOptions}
        filters={filters}
        handleSortChange={handleSortChange}
      />
    </div>
  );
}