// hooks/useFilterAnimation.ts
import { Variants } from "framer-motion";

export const useFilterAnimation = () => {
  const resetButtonVariants: Variants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 0.95, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.9 },
  };

  return { resetButtonVariants };
};

// hooks/useFilterConfig.ts
import { useTranslations } from "next-intl";
import { useFilters } from "@/context/filters-context";
import { DynamicDropdownConfig, PriceRangeConfig } from "@/types/filter-types";

export const useFilterConfig = () => {
  const t = useTranslations("properties.filters");
  const { filters } = useFilters();

  const dropdownConfigs: DynamicDropdownConfig[] = [
    {
      key: "city",
      label: t("city"),
      endpoint: filters.country?.id ? `/city/${filters.country.id}` : "",
      placeholder: t("selectCity"),
      icon: "location",
      isEnabled: !!filters.country?.id,
    },
    {
      key: "area",
      label: t("area"),
      endpoint: filters.city?.id ? `/area/${filters.city.id}` : "",
      placeholder: t("selectArea"),
      icon: "location",
      isEnabled: !!filters.city?.id,
    },
    {
      key: "category",
      label: t("category"),
      endpoint: "/category",
      placeholder: t("selectCategory"),
      icon: "category",
      isEnabled: true,
    },
    {
      key: "property",
      label: t("property"),
      endpoint: "/Property_type",
      placeholder: t("selectProperty"),
      icon: "prop-type",
      isEnabled: true,
    },
    {
      key: "developers",
      label: t("developers"),
      endpoint: "/developer",
      placeholder: t("selectDeveloper"),
      icon: "developers",
      isEnabled: true,
    },
  ];

  const priceRelatedFilters: PriceRangeConfig[] = [
    {
      key: "priceRange",
      label: t("prices"),
      endpoint: "/price",
      placeholder: t("selectPrice"),
      icon: "money",
      isEnabled: true,
    },
  ];

  const sortOptions = [
    { label: t("highestPriceDescending"), value: "highest:desc" },
    { label: t("lowestPriceDescending"), value: "lowest:desc" },
    { label: t("highestPriceAscending"), value: "highest:asc" },
    { label: t("lowestPriceAscending"), value: "lowest:asc" },
  ];

  return { dropdownConfigs, priceRelatedFilters, sortOptions };
};