"use client"

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react"
import { ChevronDown } from "lucide-react"
import type { Selection } from "@heroui/react"

interface SharedDropdownProps<T> {
  data: { label: string; value: string; raw?: T }[]
  value?: string
  onChange?: (value: string, item?: { label: string; value: string; raw?: T }) => void
  beforeImage?: React.ReactNode
  isFilter?: boolean
  placeholder?: string
}

export default function SharedDropdown<T>({
  data = [],
  value,
  onChange,
  beforeImage,
  isFilter = false,
  placeholder,
}: SharedDropdownProps<T>) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(value ? [value] : []))
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [menuWidth, setMenuWidth] = useState<number | null>(null)

  useEffect(() => {
    if (value) {
      setSelectedKeys(new Set([value]))
    } else {
      setSelectedKeys(new Set())
    }
  }, [value])

  // useEffect(() => {
  //   const updateWidth = () => {
  //     if (triggerRef.current) {
  //       setMenuWidth(triggerRef.current.offsetWidth);
  //     }
  //   };
  //   updateWidth();
  //   window.addEventListener("resize", updateWidth);
  //   return () => window.removeEventListener("resize", updateWidth);
  // }, []);

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

  const displayedLabel = useMemo(() => {
    if (!data.length) return "No options"
    const selectedKey = Array.from(selectedKeys)[0]
    const found = data.find((d) => d.value === selectedKey)
    return found?.label ?? placeholder ?? "Select option"
  }, [selectedKeys, data, placeholder])

  // ✅ Check if has value for styling
  const hasValue = useMemo(() => {
    return !!value && value !== ""
  }, [value])

  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      setSelectedKeys(keys)
      const selectedKey = Array.from(keys)[0] as string | undefined
      if (selectedKey && onChange) {
        const selectedItem = data.find((item) => item.value === selectedKey)
        if (selectedItem) onChange(selectedKey, selectedItem)
      }
    },
    [onChange, data],
  )

  if (!data.length) {
    return (
      <Button
        className="w-full justify-between bg-gray-50 px-3 py-2 text-gray-400 outline-none focus:outline-none"
        variant="flat"
        disabled
      >
        No options
        <ChevronDown className="h-[16px] w-[16px] opacity-70" />
      </Button>
    )
  }

  return (
    <Dropdown className="h-full w-full rounded-none shadow-sm">
      <DropdownTrigger>
        <Button
          ref={triggerRef}
          disabled={!data.length}
          variant="bordered"
          className={`flex h-[48px] w-full items-center justify-between rounded-none px-3 py-2 text-base outline-none hover:border-gray-400 focus:outline-none ${
            !data.length
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : hasValue && isFilter
                ? "text-dark bg-[#d4d4d4]"
                : "text-dark-grey bg-white"
          }`}
        >
          {beforeImage ? (
            <div className="flex items-center gap-2 truncate">
              {beforeImage}
              <span className="truncate">{displayedLabel}</span>
            </div>
          ) : (
            <span className="truncate">{displayedLabel}</span>
          )}
          <ChevronDown
            className={`h-[16px] w-[16px] ${
              hasValue && isFilter ? "text-dark opacity-90" : "opacity-70"
            }`}
          />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label={placeholder}
        disallowEmptySelection
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={handleSelectionChange}
        style={{
          width: menuWidth && !isFilter ? `${menuWidth}px` : "100%",
          minWidth: menuWidth && !isFilter ? `${menuWidth}px` : "100%",
        }}
        
        className="m-0 max-h-60 w-full overflow-y-auto rounded-none px-0"
      >
        {data.map((item) => (
          <DropdownItem
            key={item.value}
            className="w-full rounded-none capitalize data-[hover=true]:bg-blue-100 data-[selectable=true]:cursor-pointer"
          >
            <span className="block w-full truncate border-b-[0.0625rem] border-[#d4d4d4] py-2 text-wrap break-words">
              {item.label}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
