"use client"
import React, { useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { usePathname } from "@/lib/navLink"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { NavbarResponse } from "@/types/navbar-types"
import { useFilters } from "@/context/filters-context"
import { useTranslations } from "next-intl"
import { navbar_links } from "@/data/data"

const HOME_PATHS = ["/", "/en", "/fr"] as const
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
} as const

const HOVER_ANIMATION = {
  whileHover: { scale: 1.05 },
  transition: { type: "spring", stiffness: 200, damping: 15 }
} as const

const DROPDOWN_ANIMATION = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.25 }
} as const

interface NavLinksProps {
  data: NavbarResponse["data"]
}

interface CountryDropdownProps {
  country: NavbarResponse["data"][0]
  isHome: boolean
  onCountrySelect: (country: NavbarResponse["data"][0]) => void
  onCitySelect: (country: NavbarResponse["data"][0], city: NavbarResponse["data"][0]["cities"][0]) => void
}

interface StaticLinkProps {
  item: typeof navbar_links[0]
  isHome: boolean
  t: (key: string) => string
}

const getLinkStyles = (isHome: boolean) => 
  `text-sm uppercase transition-colors duration-200 lg:text-lg ${
    isHome ? "text-white hover:text-white/80" : "text-dark hover:text-dark-grey"
  }`

const HomeLink = React.memo(function HomeLink({ isHome, t }: { isHome: boolean; t: (key: string) => string }) {
  return (
    <Link
      href="/"
      className={`${getLinkStyles(isHome)}  h-[100%] flex justify-center items-center`}
      prefetch={false}
    >
      {t("home")}
    </Link>
  )
})

const StaticLink = React.memo(function StaticLink({ item, isHome, t }: StaticLinkProps) {
  return (
    <Link
      href={item.path}
      className={`${getLinkStyles(isHome)} h-[100%] flex justify-center items-center`}
      prefetch={false}
    >
      {t(item.title)}
    </Link>
  )
})

const CityDropdownItem = React.memo(function CityDropdownItem({
  city,
  country,
  onCitySelect
}: {
  city: NavbarResponse["data"][0]["cities"][0]
  country: NavbarResponse["data"][0]
  onCitySelect: (country: NavbarResponse["data"][0], city: NavbarResponse["data"][0]["cities"][0]) => void
}) {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    onCitySelect(country, city)
  }, [country, city, onCitySelect])

  return (
    <li>
      <Link
        href={`/${country.slug}`}
        onClick={handleClick}
        className="text-dark hover:text-primary block w-full border-b-[0.0625rem] border-gray-100 text-sm uppercase transition-colors duration-200 last:border-0 hover:bg-gray-200"
        prefetch={false}
      >
        <span className="block w-full truncate border-b-[0.0625rem] border-[#d4d4d4] px-3 py-4 text-wrap break-words">
          {city.name.trim()}
        </span>
      </Link>
    </li>
  )
})

const CitiesDropdown = React.memo(function CitiesDropdown({
  cities,
  country,
  onCitySelect
}: {
  cities: NavbarResponse["data"][0]["cities"]
  country: NavbarResponse["data"][0]
  onCitySelect: (country: NavbarResponse["data"][0], city: NavbarResponse["data"][0]["cities"][0]) => void
}) {
  if (!cities.length) return null

  return (
    <motion.div
      {...DROPDOWN_ANIMATION}
      className="absolute top-[60px] left-1/2 z-50 hidden -translate-x-1/2 group-hover:block  "
    >
      <div className="min-w-[200px] overflow-hidden border border-gray-100 bg-white/95 rounded shadow-lg backdrop-blur-md">
        <ul className="flex h-fit max-h-[250px] flex-col overflow-y-auto ">
          {cities.map((city) => (
            <CityDropdownItem
              key={city.id}
              city={city}
              country={country}
              onCitySelect={onCitySelect}
            />
          ))}
        </ul>
      </div>
    </motion.div>
  )
})

const CountryDropdown = React.memo(function CountryDropdown({
  country,
  isHome,
  onCountrySelect,
  onCitySelect,
}: CountryDropdownProps) {
  const handleCountryClick = useCallback(() => {
    onCountrySelect(country)
  }, [country, onCountrySelect])

  return (
    <div key={country.id} className="group relative">
      <motion.button
        {...HOVER_ANIMATION}
        onClick={handleCountryClick}
        className={`${getLinkStyles(isHome)} cursor-pointer relative  h-[100%] block`}
        aria-haspopup="true"
        aria-expanded="false"
      >
        {country.name}
      </motion.button>

      <CitiesDropdown
        cities={country.cities || []}
        country={country}
        onCitySelect={onCitySelect}
      />
    </div>
  )
})

export default function NavLinks({ data }: NavLinksProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { setCountryAndCity, setFilter } = useFilters()
  const t = useTranslations("Navbar")

  const isHome = useMemo(
    () => HOME_PATHS.includes(pathname as (typeof HOME_PATHS)[number]),
    [pathname]
  );

  const handleCountrySelect = useCallback((country: NavbarResponse["data"][0]) => {
    setFilter("country", {
      id: country.id,
      value: country.name,
      label: country.name,
      slug: country.slug,
      raw: country,
    })
    router.push(`/${country.slug}`)
  }, [setFilter, router])

  const handleCitySelect = useCallback((
    country: NavbarResponse["data"][0], 
    city: NavbarResponse["data"][0]["cities"][0]
  ) => {
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
  }, [setCountryAndCity, router])

  const countries = useMemo(() => data || [], [data])

  return (
    <div className="hidden items-center justify-center lg:flex">
      <motion.div
        {...ANIMATION_CONFIG}
        className="flex items-stretch gap-10 h-full"
        role="navigation"
        aria-label="Main navigation"
      >
        <HomeLink isHome={isHome} t={t} />

        {countries.map((country) => (
          <CountryDropdown
            key={country.id}
            country={country}
            isHome={isHome}
            onCountrySelect={handleCountrySelect}
            onCitySelect={handleCitySelect}
          />
        ))}

        {navbar_links.map((item) => (
          <StaticLink
            key={item.id}
            item={item}
            isHome={isHome}
            t={t}
          />
        ))}
      </motion.div>
    </div>
  )
}

export { 
  HomeLink, 
  StaticLink, 
  CountryDropdown, 
  CitiesDropdown, 
  CityDropdownItem 
}