"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { PriceRange } from "@/types/interfaceData";

export type FilterItem<T = unknown> = {
  id: number;
  value: string;
  label: string;
  slug?: string;
  raw?: T;
};

export type Filters = {
  country?: FilterItem<{ id: number; name: string; slug?: string }>;
  city?: FilterItem<{ id: number; name: string }>;
  category?: FilterItem<{ id: number; name: string }>;
  priceRange?: PriceRange;
  property?: FilterItem<{ id: number; name: string }>;
  developers?: FilterItem<{ id: number; name: string; slug?: string }>;
  sort?: FilterItem<{ label: string; value: string }>;
  area?: FilterItem<{ id: number; label: string }>;
};

type FiltersContextType = {
  filters: Filters;
  setFilter: <T>(key: keyof Filters, item: FilterItem<T>) => void;
  setPriceRange: (range: PriceRange) => void;
  clearFilter: (key: keyof Filters) => void;
  clearAllFilters: () => void;
  setCountryAndCity: (
    country: FilterItem<{ id: number; name: string; slug?: string }>,
    city?: FilterItem<{ id: number; name: string; slug?: string }>
  ) => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);
const STORAGE_KEY = "filters";

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFilters(parsed);
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [filters]);

const setFilter = <T,>(key: keyof Filters, item: FilterItem<T>) => {
  setFilters((prev) => {
    const newFilters = { ...prev, [key]: item };

    // 🔹 لو تغيّرت الدولة نحذف المدينة والمنطقة
    if (key === "country" && item.id !== prev.country?.id) {
      delete newFilters.city;
      delete newFilters.area;
    }

    // 🔹 لو تغيّرت المدينة نحذف المنطقة
    if (key === "city" && item.id !== prev.city?.id) {
      delete newFilters.area;
    }

    return newFilters;
  });
};


const setPriceRange = (range: PriceRange) => {
  setFilters((prev) => {
    const updated = { ...prev, priceRange: range };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  });
};
  const clearFilter = (key: keyof Filters) => {
    setFilters((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const clearAllFilters = () => setFilters({});

//  Set Country and City together (used in Navbar)
const setCountryAndCity = (
  country: FilterItem<{ id: number; name: string; slug?: string }>,
  city?: FilterItem<{ id: number; name: string; slug?: string }>
) => {
  setFilters((prev) => ({
    ...prev,
    country,
    ...(city ? { city } : {}),
  }));
};


  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilter,
        setPriceRange,
        clearFilter,
        clearAllFilters,
        setCountryAndCity,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within a FiltersProvider");
  return ctx;
}
