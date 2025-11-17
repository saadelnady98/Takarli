"use client";
import React, { useMemo, useEffect, useState } from "react";
import { useFetchFilter } from "@/hooks/use-fetch-filters-data";
import { useFilters } from "@/context/filters-context";
import SharedDropdown from "@/components/SharedDrowpdown";
 
interface DynamicDropdownProps {
  endpoint: string;
  placeholder: string;
  filterKey: "country" | "city" | "category" | "property" | "developers" | "sort" | "area";
  isEnabled?: boolean;
  beforeImage?: React.ReactNode;
}

export default function DynamicDropdown({
  endpoint,
  placeholder,
  filterKey,
  isEnabled = true,
  beforeImage,
}: DynamicDropdownProps) {
  const { filters, setFilter } = useFilters();
  const { data, isLoading, isError } = useFetchFilter<{ id: number; name: string; slug?: string }>(
    endpoint,
    isEnabled
  );

  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  //  Sync with context (important when changed from Navbar)
  useEffect(() => {
    if (filters[filterKey]?.id) {
      setSelectedValue(String(filters[filterKey]?.id));
    } else {
      setSelectedValue(undefined);
    }
  }, [filters, filterKey]);

  const options = useMemo(() => {
    if (!isEnabled) return [{ label: placeholder, value: "" }];
    if (isLoading) return [{ label: "Loading...", value: "" }];
    if (isError) return [{ label: "Error loading data", value: "" }];
    if (!data?.length) return [{ label: "No options found", value: "" }];

    return data.map((item) => ({
      label: item.name,
      value: String(item.id),
      raw: item,
      slug: item?.slug || "",
    }));
  }, [data, isLoading, isError, isEnabled]);

  const handleChange = (
    value: string,
    item?: { label: string; value: string; slug?: string; raw?: { id: number; name: string; slug?: string } }
  ) => {
    if (!value || !item) return;

    setSelectedValue(value);
    setFilter(filterKey, {
      id: Number(item.raw?.id ?? item.value),
      value,
      label: item.raw?.name ?? item.label,
      raw: item.raw,
      slug: item?.slug || "",
    });
  };

  return (
    <SharedDropdown<{ id: number; name: string; slug?: string }>
      data={options}
      value={selectedValue ?? ""}
      onChange={handleChange}
      placeholder={placeholder}
      beforeImage={beforeImage}
      isFilter
    />
  );
}
