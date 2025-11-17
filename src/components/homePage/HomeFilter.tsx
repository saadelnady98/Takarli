"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useFilters } from "@/context/filters-context";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useLangCurr } from "@/context/langCurrContext";
import { useTranslations } from "next-intl";
import { RotateCcw } from "lucide-react";

const FILTER_KEYS = ['country', 'city', 'category', 'priceRange', 'property', 'developers', 'area'] as const;

interface FilterIcons {
  location: React.ReactNode;
  category: React.ReactNode;
  search: React.ReactNode;
}

interface DropdownConfig {
  endpoint: string;
  placeholderKey: string;
  filterKey: 'country' | 'city' | 'category';
  icon: React.ReactNode;
  isEnabled?: boolean;
}


const FilterIcons: FilterIcons = {
  location: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="h-5 w-5 opacity-70">
      <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 18.3333C13.3333 15 16.6667 12.0152 16.6667 8.33333C16.6667 4.65143 13.6813 1.66667 10 1.66667C6.3181 1.66667 3.33333 4.65143 3.33333 8.33333C3.33333 12.0152 6.66667 15 10 18.3333Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  category: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="h-5 w-5 opacity-70">
      <path d="M7.5 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 5V7.5C2.5 8.42047 3.24619 9.16667 4.16667 9.16667H7.5C8.42047 9.16667 9.16667 8.42047 9.16667 7.5V5C9.16667 4.07952 8.42047 3.33333 7.5 3.33333Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15.8333 3.33333H12.5C11.5795 3.33333 10.8333 4.07952 10.8333 5V7.5C10.8333 8.42047 11.5795 9.16667 12.5 9.16667H15.8333C16.7538 9.16667 17.5 8.42047 17.5 7.5V5C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7.5 10.8333H4.16667C3.24619 10.8333 2.5 11.5795 2.5 12.5V15C2.5 15.9205 3.24619 16.6667 4.16667 16.6667H7.5C8.42047 16.6667 9.16667 15.9205 9.16667 15V12.5C9.16667 11.5795 8.42047 10.8333 7.5 10.8333Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15.8333 10.8333H12.5C11.5795 10.8333 10.8333 11.5795 10.8333 12.5V15C10.8333 15.9205 11.5795 16.6667 12.5 16.6667H15.8333C16.7538 16.6667 17.5 15.9205 17.5 15V12.5C17.5 11.5795 16.7538 10.8333 15.8333 10.8333Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-white">
      <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

const DynamicDropdown = React.lazy(() => 
  import("../sharedUi/Filters/dynamic-dropdown")
    .then(module => ({ default: module.default }))
    .catch(() => ({ 
      default: () => <div className="text-red-500 text-sm p-2">Error loading filter</div> 
    }))
);

const PriceRangeDropdown = React.lazy(() => 
  import("../sharedUi/Filters/price-range-dropdown")
    .then(module => ({ default: module.default }))
    .catch(() => ({ 
      default: () => <div className="text-red-500 text-sm p-2">Error loading price</div> 
    }))
);

const FilterSkeleton: React.FC = () => (
  <div className="relative z-20 mx-auto w-full bg-white p-4 shadow-lg lg:p-6" role="status" aria-label="Loading filters">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div 
          key={index} 
          className="h-12 bg-gray-200 animate-pulse rounded"
        />
      ))}
    </div>
  </div>
);

interface DropdownWrapperProps {
  children: React.ReactNode;
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({ children }) => (
  <React.Suspense fallback={<div className="h-12 bg-gray-200 animate-pulse rounded" />}>
    {children}
  </React.Suspense>
);

interface ResetButtonProps {
  hasActiveFilters: boolean;
  onReset: () => void;
  title: string;
}

const ResetButton: React.FC<ResetButtonProps> = React.memo(({ 
  hasActiveFilters, 
  onReset, 
  title 
}) => (
  <button
    onClick={onReset}
    className={`
      flex h-12 w-12 lg:w-fit cursor-pointer items-center justify-center border border-gray-300 
      bg-white px-3 text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 
      hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300
      ${hasActiveFilters 
        ? "animate-pulse ring-2 ring-dark/90 ring-opacity-50" 
        : ""
      }
    `}
    title={title}
    aria-label={title}
  >
    <RotateCcw className={`h-5 w-5 ${hasActiveFilters ? "text-dark/90" : ""}`} />
    {/* <span className="hidden lg:inline ml-2 text-sm">{title}</span> */}
  </button>
));

ResetButton.displayName = 'ResetButton';

interface SearchButtonProps {
  disabled: boolean;
  onClick: () => void;
  label: string;
}

const SearchButton: React.FC<SearchButtonProps> = React.memo(({ 
  disabled, 
  onClick, 
  label 
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className="h-12 w-full lg:flex-1 cursor-pointer items-center justify-center gap-2 rounded-none bg-black text-sm text-white transition-colors hover:bg-gray-800 lg:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
    aria-label={label}
  >
    {FilterIcons.search}
    <span className="hidden sm:inline">{label}</span>
    <span className="sm:hidden">Search</span>
  </Button>
));

SearchButton.displayName = 'SearchButton';

interface FilterDropdownsProps {
  countryId: string | number | undefined;
  t: (key: string) => string;
}

const FilterDropdowns: React.FC<FilterDropdownsProps> = React.memo(({ countryId, t }) => {
  const dropdownConfigs: DropdownConfig[] = [
    {
      endpoint: "/country",
      placeholderKey: t("selectCountry"),
      filterKey: "country",
      icon: FilterIcons.location,
      isEnabled: true
    },
    {
      endpoint: countryId ? `/city/${countryId}` : "",
      placeholderKey: t("selectCity"),
      filterKey: "city",
      icon: FilterIcons.location,
      isEnabled: !!countryId
    },
    {
      endpoint: "/category",
      placeholderKey: t("selectCategory"),
      filterKey: "category",
      icon: FilterIcons.category,
      isEnabled: true
    }
  ];

  return (
    <>
      {dropdownConfigs.map((config) => (
        <DropdownWrapper key={config.filterKey}>
          <DynamicDropdown
            endpoint={config.endpoint}
            placeholder={config.placeholderKey}
            filterKey={config.filterKey}
            beforeImage={config.icon}
            isEnabled={config.isEnabled}
          />
        </DropdownWrapper>
      ))}
      
      <DropdownWrapper>
        <PriceRangeDropdown />
      </DropdownWrapper>
    </>
  );
});

FilterDropdowns.displayName = 'FilterDropdowns';

interface ActionButtonsProps {
  hasCountry: boolean;
  hasActiveFilters: boolean;
  onSearch: () => void;
  onReset: () => void;
  t: (key: string) => string;
}

const ActionButtons: React.FC<ActionButtonsProps> = React.memo(({
  hasCountry,
  hasActiveFilters,
  onSearch,
  onReset,
  t
}) => (
  <div className="flex items-center gap-2 ">
    <div className="flex-1">
      <SearchButton
        disabled={!hasCountry}
        onClick={onSearch}
        label={t("search")}
      />
    </div>
    <ResetButton
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
      title={t("resetFilters")}
    />
  </div>
));

ActionButtons.displayName = 'ActionButtons';

const HomeFilter: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("home.homeFilter");
  const { filters, clearAllFilters } = useFilters();
  const { language } = useLangCurr();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const countryId = filters.country?.id;
  const countrySlug = filters.country?.raw?.slug || "";
  const hasCountry = !!countrySlug;

  const hasActiveFilters = useMemo(() => {
    return FILTER_KEYS.some(key => !!filters[key]);
  }, [filters]);

  const handleSearch = useCallback(() => {
    if (!hasCountry) return;
    router.push(`/${language}/${countrySlug}`);
  }, [hasCountry, language, countrySlug, router]);

  const handleReset = useCallback(() => {
    clearAllFilters();
  }, [clearAllFilters]);

  if (!isClient) {
    return <FilterSkeleton />;
  }

  return (
    <div 
      className="relative z-20 mx-auto w-full bg-white p-4 shadow-lg lg:p-6"
      role="search"
      aria-label="Property search filters"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 lg:gap-3">
        <FilterDropdowns countryId={countryId} t={t} />
        
        <ActionButtons
          hasCountry={hasCountry}
          hasActiveFilters={hasActiveFilters}
          onSearch={handleSearch}
          onReset={handleReset}
          t={t}
        />
      </div>
    </div>
  );
};

export default React.memo(HomeFilter);