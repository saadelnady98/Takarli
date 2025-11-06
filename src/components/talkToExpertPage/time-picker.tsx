"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
// import { useTranslations } from "next-intl"

export default function IOSLikeTimePicker({
  value,
  onChange,
  label,
  placeholder,
  error,
  done,
  open,
  onOpenChange,
}: {
  value: string
  onChange: (val: string) => void
  label: string
  placeholder: string
  error?: string
  done?: string
  open?: boolean
  onOpenChange?: (isOpen: boolean) => void
}) {
  const [hour, setHour] = useState(12)
  const [minute, setMinute] = useState(0)
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM")
  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const ampmOptions: ("AM" | "PM")[] = ["AM", "PM"]

  const handleSelect = (h: number, m: number, a: "AM" | "PM") => {
    const formatted = `${h}:${m.toString().padStart(2, "0")} ${a}`
    onChange(formatted)
  }

  return (
    <div className="relative flex-1">
      {/* Label */}
      <label className="text-dark mb-2 block text-[0.875rem] font-medium">
        {label}
      </label>

      {/* Dropdown trigger button */}
      <button
        type="button"
        onClick={() => onOpenChange?.(!open)}
        className={`flex w-full cursor-pointer items-center justify-between border border-[#d2d2d2] px-[16px] py-[16px] text-[1.125rem] text-[#717171] hover:bg-black hover:text-white transition-colors ${
          open ? "bg-black text-white" : ""
        }`}
      >
        {value || placeholder}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Picker dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute z-10 mt-2 w-full border border-[#d2d2d2] bg-white shadow-lg rounded-none p-4"
          >
            <div className="grid grid-cols-3 gap-4">
              {/* Hours */}
              <div className="h-40 w-full overflow-y-auto text-center overflow-x-hidden hover:scrollbar-thumb-gray-400">
                {hours.map((h) => (
                  <motion.div
                    key={h}
                    onClick={() => {
                      setHour(h)
                      handleSelect(h, minute, ampm)
                    }}
                    className={`py-2 cursor-pointer text-lg transition-all ${
                      h === hour
                        ? "text-black font-semibold scale-105"
                        : "text-gray-400"
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    {h}
                  </motion.div>
                ))}
              </div>

              {/* Minutes */}
              <div className="h-40 w-full overflow-y-auto text-center overflow-x-hidden hover:scrollbar-thumb-gray-400">
                {minutes.map((m) => (
                  <motion.div
                    key={m}
                    onClick={() => {
                      setMinute(m)
                      handleSelect(hour, m, ampm)
                    }}
                    className={`py-2 cursor-pointer text-lg transition-all ${
                      m === minute
                        ? "text-black font-semibold scale-105"
                        : "text-gray-400"
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    {m.toString().padStart(2, "0")}
                  </motion.div>
                ))}
              </div>

              {/* AM / PM */}
              <div className="h-40 w-full overflow-y-auto text-center overflow-x-hidden hover:scrollbar-thumb-gray-400">
                {ampmOptions.map((a) => (
                  <motion.div
                    key={a}
                    onClick={() => {
                      setAmpm(a)
                      handleSelect(hour, minute, a)
                    }}
                    className={`py-2 cursor-pointer text-lg transition-all ${
                      a === ampm
                        ? "text-black font-semibold scale-105"
                        : "text-gray-400"
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    {a}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
              type="button"
                onClick={() => onOpenChange?.(false)}
                className="bg-black cursor-pointer text-white px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                {done}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}