import { FilterItem, Filters } from "@/context/filters-context";
import { DynamicDropdownConfig, FilterState, PriceRangeConfig } from "@/types/filter-types";

export class FilterService {
  static hasActiveFilters(filters: FilterState): boolean {
    return !!(
      filters.city ||
      filters.category ||
      filters.area ||
      filters.priceRange ||
      filters.property ||
      filters.developers
    );
  }

  static handleReset(
    filters: FilterState,
    clearAllFilters: () => void,
    setFilter:<T>(key: keyof Filters, item: FilterItem<T>) => void
  ): void {
    const currentCountry = filters.country;
    clearAllFilters();

    if (currentCountry) {
      setFilter("country", currentCountry);
    }
  }

  static isDynamicDropdownConfig(config: DynamicDropdownConfig | PriceRangeConfig): config is DynamicDropdownConfig {
    return config.key !== "priceRange";
  }

  static isPriceRangeConfig(config: DynamicDropdownConfig | PriceRangeConfig): config is PriceRangeConfig {
    return config.key === "priceRange";
  }
}
