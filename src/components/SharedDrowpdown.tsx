"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { ChevronDown } from "lucide-react";
import type { Selection } from "@heroui/react";

interface SharedDropdownProps<T> {
  data: { label: string; value: string; raw?: T }[];
  value?: string;
  onChange?: (value: string, item?: { label: string; value: string; raw?: T }) => void;
  beforeImage?: React.ReactNode;
  isFilter?: boolean;
  placeholder?: string;
}

export default function SharedDropdown<T>({
  data = [],
  value,
  onChange,
  beforeImage,
  isFilter = false,
  placeholder,
}: SharedDropdownProps<T>) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(value ? [value] : [])
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | null>(null);

 useEffect(() => {
  if (value) {
    setSelectedKeys(new Set([value]));
  } else {
    setSelectedKeys(new Set());
  }
}, [value]);


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

  const displayedLabel = useMemo(() => {
    if (!data.length) return "No options";
    const selectedKey = Array.from(selectedKeys)[0];
    const found = data.find((d) => d.value === selectedKey);
    return found?.label ?? placeholder ?? "Select option";
  }, [selectedKeys, data, placeholder]);

  // ✅ Check if has value for styling
  const hasValue = useMemo(() => {
    return !!value && value !== "";
  }, [value]);

  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      setSelectedKeys(keys);
      const selectedKey = Array.from(keys)[0] as string | undefined;
      if (selectedKey && onChange) {
        const selectedItem = data.find((item) => item.value === selectedKey);
        if (selectedItem) onChange(selectedKey, selectedItem);
      }
    },
    [onChange, data]
  );

  if (!data.length) {
    return (
      <Button
        className="w-full justify-between  outline-none focus:outline-none bg-gray-50 px-3 py-2 text-gray-400"
        variant="flat"
        disabled
      >
        No options
        <ChevronDown className="opacity-70 w-[16px] h-[16px]" />
      </Button>
    );
  }

  return (
    <Dropdown className="w-full h-full rounded-none shadow-sm">
      <DropdownTrigger className="w-full">
        <Button
          ref={triggerRef}
          disabled={!data.length}
          variant="bordered"
          className={`flex w-full h-[48px] items-center justify-between rounded-none  px-3 py-2 text-base hover:border-gray-400 outline-none focus:outline-none   ${
    !data.length
      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
      : hasValue && isFilter
      ? "bg-[#d4d4d4] text-dark"
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
            className={`w-[16px] h-[16px] ${
              (hasValue && isFilter) ? "text-dark opacity-90" : "opacity-70"
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
          width: menuWidth ? `${menuWidth}px` : "auto",
          minWidth: menuWidth ? `${menuWidth}px` : "auto",
        }}
        className="max-h-60 overflow-y-auto rounded-none px-0"
      >
        {data.map((item) => (
          <DropdownItem
            key={item.value}
            className="w-full capitalize rounded-none data-[hover=true]:bg-blue-100 data-[selectable=true]:cursor-pointer"
          >
            <span className="w-full truncate block border-b-[0.0625rem] border-[#d4d4d4] py-2 break-words text-wrap">
              {item.label}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}