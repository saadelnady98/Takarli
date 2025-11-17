"use client"

import React, { useState, useEffect, useRef, useCallback, memo } from "react"
import { navbar_links } from "@/data/data"
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

interface Country {
  id: number
  name: string
  slug: string
  cities: City[]
}

interface City {
  id: number
  name: string
}

const CloseIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
))

const ChevronIcon = memo(({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
  >
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
))

CloseIcon.displayName = "CloseIcon"
ChevronIcon.displayName = "ChevronIcon"

const CityItem = memo(({ city, onClick }: { city: City; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="cursor-pointer text-[0.95rem] text-gray-700 border-b px-3 py-4 border-gray-100 transition-colors hover:bg-dark-grey hover:text-white"
  >
    {city.name}
  </div>
))

CityItem.displayName = "CityItem"

const CountryDropdown = memo(({ 
  country, 
  isOpen, 
  onToggle, 
  onCountryClick, 
  onCityClick
}: { 
  country: Country
  isOpen: boolean
  onToggle: () => void
  onCountryClick: () => void
  onCityClick: (city: City) => void
}) => {
  const hasCities = country.cities.length > 0

  return (
    <div className="relative border-b border-gray-200">
      <div className="flex items-center justify-between py-3">
        <button
          onClick={onCountryClick}
          className="text-[1.1rem] text-gray-900 flex-1 text-left cursor-pointer"
          aria-label={`Navigate to ${country.name}`}
        >
          {country.name}
        </button>

        {hasCities && (
          <button
            onClick={onToggle}
            className="p-1 text-dark-grey cursor-pointer"
            aria-label={`${isOpen ? 'Close' : 'Open'} cities`}
          >
            <ChevronIcon isOpen={isOpen} />
          </button>
        )}
      </div>

      {isOpen && hasCities && (
        <div className="absolute z-10 w-full max-h-[220px] overflow-y-auto border border-gray-200 bg-white shadow-md animate-fadeIn">
          {country.cities.map((city) => (
            <CityItem key={city.id} city={city} onClick={() => onCityClick(city)} />
          ))}
        </div>
      )}
    </div>
  )
})

CountryDropdown.displayName = "CountryDropdown"

export default function MobileMenu({ isOpen, onClose, data }: Props) {
  const router = useRouter()
   const [visible, setVisible] = useState(isOpen);
  const [animateOut, setAnimateOut] = useState(false);
  const { setFilter, setCountryAndCity } = useFilters()
  const t = useTranslations("Navbar")
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setOpenDropdown(null)
      return
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])
    useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setAnimateOut(false);
    } else {
      setAnimateOut(true);
      const timeout = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);


  const handleCountryClick = useCallback((country: Country) => {
    setFilter("country", {
      id: country.id,
      value: country.name,
      label: country.name,
      slug: country.slug,
      raw: country,
    })
    router.push(`/${country.slug}`)
    onClose()
  }, [setFilter, router, onClose])

  const handleCityClick = useCallback((country: Country, city: City) => {
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
      }
    )
    router.push(`/${country.slug}`)
    onClose()
  }, [setCountryAndCity, router, onClose])

  const toggleDropdown = useCallback((id: number) => {
    setOpenDropdown(prev => prev === id ? null : id)
  }, [])

  if (!visible) return null;

  return (
      <div
      className="fixed inset-0 z-[9999] flex bg-black/50 backdrop-blur-sm lg:hidden animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}
        className={`flex h-full w-[70%] flex-col border-r border-gray-200 bg-white p-4 shadow-xl 
          ${animateOut ? 'animate-slide-out-left' : 'animate-slide-in-left'}
        `}
      >
        <button onClick={onClose} className="flex w-fit p-1 ms-auto text-dark-grey cursor-pointer" aria-label="Close menu">
          <CloseIcon />
        </button>

        <Link href="/" onClick={onClose} className="flex justify-center border-b border-gray-200 py-4" aria-label="Homepage">
          <Image
            src="/assets/logo/logo-footer.png"
            alt="Logo"
            width={120}
            height={40}
            priority
            quality={85}
            sizes="(max-width: 768px) 80px, 120px"
            className="object-contain"
          />
        </Link>

        <Link href="/" onClick={onClose} className="block border-b border-gray-200 py-3 text-[1.1rem]">
          {t("home")}
        </Link>

        {data?.map((country) => (
          <CountryDropdown
            key={country.id}
            country={country}
            isOpen={openDropdown === country.id}
            onToggle={() => toggleDropdown(country.id)}
            onCountryClick={() => handleCountryClick(country)}
            onCityClick={(city) => handleCityClick(country, city)}
          />
        ))}

        <nav>
          {navbar_links.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={onClose}
              className="hover:text-primary block border-b border-gray-200 py-3 text-[1.1rem] text-gray-800 transition last:border-b-0 "
            >
              {t(item.title)}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}