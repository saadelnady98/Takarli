"use client";

import React, { useMemo, useCallback, useEffect, useState, useRef } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import type { Selection } from "@heroui/react";
import { Banknote, ChevronDown } from "lucide-react";
import { useLangCurr } from "@/context/langCurrContext";
import { useFetchFilter } from "@/hooks/use-fetch-filters-data";
import { useFilters } from "@/context/filters-context";
import { useTranslations } from "next-intl";

type PriceRangeApi = {
  id: number;
  label: string;
  min_price: number;
  max_price: number;
};

export default function PriceRangeDropdown() {
  const { currency } = useLangCurr();
  const { filters, setPriceRange } = useFilters();
  const t = useTranslations("home.homeFilter");

  const { data: PRICE_RANGES = [], isLoading } = useFetchFilter<PriceRangeApi>("/price", true);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | null>(null);

  const hasValue = useMemo(() => {
    return !!filters.priceRange;
  }, [filters.priceRange]);

  useEffect(() => {
  if (!triggerRef.current) return;

  const element = triggerRef.current;
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentRect.width) {
        setMenuWidth(entry.contentRect.width);
      }
    }
  });

  observer.observe(element);
  return () => observer.disconnect();
}, []);


  useEffect(() => {
    if (filters.priceRange && PRICE_RANGES.length > 0) {
      const matched = PRICE_RANGES.find(
        (r) =>
          r.min_price === filters.priceRange?.min &&
          r.max_price === filters.priceRange?.max
      );

      const newSelection = matched ? new Set([matched.label]) : new Set<string>();

      const oldValue =
        selectedKeys === "all" ? "all" : Array.from(selectedKeys)[0];
      const newValue = Array.from(newSelection)[0];

      if (oldValue !== newValue) {
        setSelectedKeys(newSelection as Selection);
      }
    } else {
      if (selectedKeys !== "all" && Array.from(selectedKeys).length > 0) {
        setSelectedKeys(new Set() as Selection);
      }
    }
  }, [PRICE_RANGES, filters.priceRange]);

  const formatPrice = useCallback(
    (price: number): string => {
      if (price === Infinity) return "";
      const locale =
        currency === "EUR"
          ? "fr-FR"
          : currency === "USD"
          ? "en-US"
          : currency === "AED"
          ? "ar-AE"
          : "en-US";

      const options: Intl.NumberFormatOptions = { maximumFractionDigits: 0 };

      if (currency !== "AED") {
        options.style = "currency";
        options.currency =
          currency === "EUR"
            ? "EUR"
            : currency === "USD"
            ? "USD"
            : "AED";
      }

      return (
        new Intl.NumberFormat(locale, options).format(price) +
        (currency === "AED" ? " " + currency : "")
      );
    },
    [currency]
  );

  const displayedLabel = useMemo(() => {
    if (isLoading) return t("loading");
    if (!PRICE_RANGES.length) return t("noPriceRangesAvailable");
    const selectedKey = Array.from(selectedKeys)[0];
    if (!selectedKey) return t("selectPriceRange");
    return selectedKey;
  }, [selectedKeys, PRICE_RANGES, isLoading, t]);

  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      const label = Array.from(keys)[0] as string;
      const selectedRange = PRICE_RANGES.find((r) => r.label === label);
      if (!selectedRange) return;

      const newRange = {
        label: selectedRange.label,
        min: selectedRange.min_price,
        max: selectedRange.max_price,
      };

      setPriceRange(newRange);
      setSelectedKeys(new Set([label]));
    },
    [PRICE_RANGES, setPriceRange]
  );

  if (isLoading)
    return (
      <Button
        className="w-full h-[48px] justify-between border rounded-none border-gray-300 bg-gray-50 px-3 py-2 text-gray-400"
        variant="flat"
        disabled
      >
        {t("loading")}
        <ChevronDown className="opacity-70 w-4 h-4" />
      </Button>
    );

  if (!PRICE_RANGES.length)
    return (
      <Button
        className="w-full justify-between border border-gray-300 bg-gray-50 px-3 py-2 text-gray-400"
        variant="flat"
        disabled
      >
        {t("noPriceRangesAvailable")}
        <ChevronDown className="opacity-70 w-4 h-4" />
      </Button>
    );

  return (
    <Dropdown className="w-full h-full rounded-none shadow-sm">
      <DropdownTrigger className="w-full">
        <Button
          ref={triggerRef}
          variant="bordered"
          className={`flex w-full h-[48px] items-center justify-between rounded-none border-gray-300 px-3 py-2 text-base hover:border-gray-400 focus:outline-none ${
            hasValue 
              ? "bg-[#d4d4d4] text-dark " 
              : "text-gray-700 bg-white"
          }`}
        >
          <div className="flex items-center gap-2 truncate">
            <Banknote className={`w-5 h-5 ${hasValue ? "text-dark opacity-90" : "opacity-70"}`} />
            <span className="truncate">{displayedLabel}</span>
          </div>
          <ChevronDown 
            className={`w-[16px] h-[16px] ${
              hasValue ? "text-dark opacity-90" : "opacity-70"
            }`} 
          />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label={t("selectPriceRange")}
        disallowEmptySelection
        selectedKeys={selectedKeys}
        selectionMode="single"
        onSelectionChange={handleSelectionChange}
        style={{
          width: menuWidth ? `${menuWidth}px` : "auto",
          minWidth: menuWidth ? `${menuWidth}px` : "auto",
        }}
        className="rounded-none max-h-60 overflow-auto px-0"
      >
        {PRICE_RANGES.map((range) => (
          <DropdownItem key={range.label} className="rounded-none">
            <div className="flex flex-col">
              <span className="font-medium">{range.label}</span>
              <span className="text-[10px] text-dark-grey">
                {formatPrice(range.min_price)} - {formatPrice(range.max_price)}
              </span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}