// types/filter.types.ts
export interface FilterItem<T = unknown> {
  id: number;
  value: string;
  label: string;
  raw?: T;
  slug?: string;
}


export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export interface FilterState {
  country?: FilterItem;
  city?: FilterItem;
  category?: FilterItem;
  area?: FilterItem;
  priceRange?: PriceRange;
  property?: FilterItem;
  developers?: FilterItem;
  sort?: FilterItem;
}

// نوع للفلاتر التي تستخدم DynamicDropdown (تستقبل FilterItem)
export type DynamicFilterKey = "country" | "city" | "category" | "property" | "developers" | "sort" | "area";

// نوع للكونفيج الخاص بالـ DynamicDropdown
export interface DynamicDropdownConfig {
  key: DynamicFilterKey;
  label: string;
  endpoint: string;
  placeholder: string;
  icon: string;
  isEnabled: boolean;
}

// نوع للكونفيج الخاص بالـ PriceRange
export interface PriceRangeConfig {
  key: "priceRange";
  label: string;
  endpoint: string;
  placeholder: string;
  icon: string;
  isEnabled: boolean;
}

export type DropdownConfig = DynamicDropdownConfig | PriceRangeConfig;