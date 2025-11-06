"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, X } from "lucide-react"
import { navbar_links } from "@/data/data"
import { usePathname } from "@/lib/navLink"
import Link from "next/link"
import { NavbarResponse } from "@/types/navbar-types"
import { useFilters } from "@/context/filters-context"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import Image from "next/image"

interface Props {
  isOpen: boolean
  onClose: () => void
  data: NavbarResponse["data"]
  isLoading?: boolean
}

export default function MobileMenu({ isOpen, onClose, data }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const { setFilter, setCountryAndCity } = useFilters()
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const t = useTranslations("Navbar")
  const menuRef = useRef<HTMLDivElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // إغلاق القائمة المفتوحة لما نضغط خارجها فقط
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex bg-black/50 backdrop-blur-sm lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex h-full w-[70%] flex-col border-r border-gray-200 bg-white p-4 shadow-xl"
          >
            {/* Logo */}
            <button
              onClick={onClose}
              className="flex w-fit justify-end p-1 ms-auto"
            >
              <X className="text-gray-700" />
            </button>
            <Link href="/" onClick={onClose} className="flex justify-center border-b border-gray-200 py-4">
              <Image
                src="/assets/logo/logo-footer.png"
                alt="Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>

            {/* Home */}
            <Link
              href="/"
              onClick={onClose}
              className="block border-b border-gray-200 py-3 text-[1.1rem] "
            >
              {t("home")}
            </Link>

            {/* Countries */}
            {data?.map((country) => {
              const hasCities = country.cities.length > 0
              const isDropdownOpen = openDropdown === country.id

              return (
                <div key={country.id} className="relative border-b border-gray-200">
                  <div className="flex items-center justify-between py-3">
                    <button
                      onClick={() => {
                        setFilter("country", {
                          id: country.id,
                          value: country.name,
                          label: country.name,
                          slug: country.slug,
                          raw: country,
                        })
                        router.push(`/${country.slug}`)
                        onClose()
                      }}
                      className="text-[1.1rem] text-gray-900 cursor-pointer"
                    >
                      {country.name}
                    </button>

                    {hasCities && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenDropdown(isDropdownOpen ? null : country.id)
                        }}
                        className="p-1"
                      >
                        <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                          <ChevronDown className="h-5 w-5 cursor-pointer text-gray-600" />
                        </motion.div>
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {isDropdownOpen && hasCities && (
                      <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="absolute z-10 h-fit max-h-[220px] w-full overflow-y-auto border border-gray-200 bg-white shadow-md"
                      >
                        {country.cities.map((city) => (
                          <div
                            key={city.id}
                            onClick={() => {
                              setCountryAndCity(
                                {
                                  id: country.id,
                                  value: country.name,
                                  label: country.name,
                                  raw: country,
                                },
                                {
                                  id: city.id,
                                  value: city.name,
                                  label: city.name,
                                  raw: city,
                                },
                              )
                              router.push(`/${country.slug}`)
                              onClose()
                            }}
                            className="cursor-pointer text-[0.95rem] text-gray-700 border-b-[0.0625rem] px-3 py-4 border-gray-100 transition hover:bg-dark-grey hover:text-white"
                          >
                            {city.name}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {/* Static Links */}
            <div>
              {navbar_links.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={onClose}
                  className="hover:text-primary block border-b border-gray-200 py-3 text-[1.1rem]  text-gray-800 transition last:border-b-0"
                >
                  {t(item.title)}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
