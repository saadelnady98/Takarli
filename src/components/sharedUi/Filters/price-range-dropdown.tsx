"use client"

import React, { useMemo, useCallback, useEffect, useState, useRef } from "react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react"
import type { Selection } from "@heroui/react"
import { Banknote, ChevronDown } from "lucide-react"
import { useLangCurr } from "@/context/langCurrContext"
import { useFetchFilter } from "@/hooks/use-fetch-filters-data"
import { useFilters } from "@/context/filters-context"
import { useTranslations } from "next-intl"

type PriceRangeApi = {
  id: number
  label: string
  min_price: number
  max_price: number
  isFilter?: boolean
}

export default function PriceRangeDropdown({ isFilter }: { isFilter: boolean }) {
  const { currency } = useLangCurr()
  const { filters, setPriceRange } = useFilters()
  const t = useTranslations("home.homeFilter")

  const { data: PRICE_RANGES = [], isLoading } = useFetchFilter<PriceRangeApi>("/price", true)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const triggerRef = useRef<HTMLButtonElement>(null)
  const [menuWidth, setMenuWidth] = useState<number | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // تحديث عرض القائمة بناءً على حجم الزر
  useEffect(() => {
    if (!triggerRef.current) return
    const element = triggerRef.current
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width) {
          setMenuWidth(entry.contentRect.width)
        }
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // التحقق من حجم الشاشة الصغيرة
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 992px)")
    const handler = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches)
    setIsSmallScreen(mql.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  const hasValue = useMemo(() => !!filters.priceRange, [filters.priceRange])

  const formatPrice = useCallback(
    (price: number): string => {
      if (price === Infinity) return ""
      const locale =
        currency === "EUR"
          ? "fr-FR"
          : currency === "USD"
            ? "en-US"
            : currency === "AED"
              ? "ar-AE"
              : "en-US"

      const options: Intl.NumberFormatOptions = { maximumFractionDigits: 0 }
      if (currency !== "AED") {
        options.style = "currency"
        options.currency = currency
      }
      return (
        new Intl.NumberFormat(locale, options).format(price) +
        (currency === "AED" ? " " + currency : "")
      )
    },
    [currency],
  )

  // عرض القيمة المختارة على الزر
  const displayedLabel = useMemo(() => {
    if (isLoading) return t("loading")
    if (!PRICE_RANGES.length) return t("noPriceRangesAvailable")
    if (filters.priceRange) return filters.priceRange.label
    return t("selectPriceRange")
  }, [filters.priceRange, PRICE_RANGES, isLoading, t])

  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      const label = Array.from(keys)[0] as string
      const selectedRange = PRICE_RANGES.find((r) => r.label === label)
      if (!selectedRange) return
      const newRange = {
        label: selectedRange.label,
        min: selectedRange.min_price,
        max: selectedRange.max_price,
      }
      setPriceRange(newRange)
      setSelectedKeys(new Set([label]))
    },
    [PRICE_RANGES, setPriceRange],
  )

  if (isLoading)
    return (
      <Button
        className="h-[48px] w-full justify-between rounded-none border border-gray-300 bg-gray-50 px-3 py-2 text-gray-400"
        variant="flat"
        disabled
      >
        {t("loading")}
        <ChevronDown className="h-4 w-4 opacity-70" />
      </Button>
    )

  if (!PRICE_RANGES.length)
    return (
      <Button
        className="w-full justify-between border border-gray-300 bg-gray-50 px-3 py-2 text-gray-400"
        variant="flat"
        disabled
      >
        {t("noPriceRangesAvailable")}
        <ChevronDown className="h-4 w-4 opacity-70" />
      </Button>
    )

  return (
    <Dropdown
      className="h-full w-full rounded-none shadow-sm"
      placement="bottom-start"
      shouldBlockScroll={false}
      shouldFlip={false}
      offset={2}
      classNames={{
        base: "w-full",
        content: "w-full min-w-full rounded-none shadow-sm",
      }}
    >
      <DropdownTrigger className="w-full">
        <Button
          ref={triggerRef}
          variant="bordered"
          className={`flex h-[48px] w-full items-center justify-between rounded-none border-gray-300 px-3 py-2 ${
            hasValue ? "text-dark bg-[#d4d4d4]" : "bg-white text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2 truncate">
            <Banknote className={`h-5 w-5 ${hasValue ? "text-dark opacity-90" : "opacity-70"}`} />
            <span className="truncate">{displayedLabel}</span>
          </div>
          <ChevronDown
            className={`h-[16px] w-[16px] ${hasValue ? "text-dark opacity-90" : "opacity-70"}`}
          />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label={t("selectPriceRange")}
        disallowEmptySelection
        selectedKeys={selectedKeys}
        selectionMode="single"
        onSelectionChange={handleSelectionChange}
        className="h-40 lg:h-60 overflow-auto rounded-none px-0"
        style={
          isSmallScreen && menuWidth
            ? { width: `${menuWidth}px`, minWidth: `${menuWidth}px` }
            : undefined
        }
      >
        {PRICE_RANGES.map((range) => (
          <DropdownItem key={range.label} className="rounded-none">
            <div className="flex flex-col">
              <span className="font-medium">{range.label}</span>
              <span className="text-dark-grey text-[10px]">
                {formatPrice(range.min_price)} - {formatPrice(range.max_price)}
              </span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
