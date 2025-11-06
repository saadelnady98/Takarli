"use client"
import React from "react"
import { motion } from "framer-motion"
import { usePathname } from "@/lib/navLink"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { NavbarResponse } from "@/types/navbar-types"
import { useFilters } from "@/context/filters-context"
import { useTranslations } from "next-intl"
import { navbar_links } from "@/data/data"
// import { ChevronDown } from "lucide-react"

export default function NavLinks({ data }: { data: NavbarResponse["data"] }) {
  const pathname = usePathname()
  const router = useRouter()
  const { setCountryAndCity, setFilter } = useFilters()
  const t = useTranslations("Navbar")

  const isHome = ["/", "/en", "/fr"].includes(pathname)

  return (
    <div className="hidden items-center justify-center lg:flex">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex gap-10"
      >
        {/* Home */}
        <Link
          href="/"
          className={`${
            isHome ? "text-white hover:text-white/80" : "text-dark hover:text-dark-grey"
          } text-sm uppercase transition-colors duration-200 lg:text-lg`}
        >
          {t("home")}
        </Link>

        {/* Countries + Cities */}
        {data?.map((country) => (
          <div key={country.id} className="group relative">
            {/* Country link with arrow */}

            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              onClick={() => {
                setFilter("country", {
                  id: country.id,
                  value: country.name,
                  label: country.name,
                  slug: country.slug,
                  raw: country,
                })
                router.push(`/${country.slug}`)
              }}
              className={`${
                isHome ? "text-white hover:text-white/80" : "text-dark hover:text-dark-grey"
              } cursor-pointer text-sm uppercase transition-colors duration-200 lg:text-lg`}
            >
              {country.name}
            </motion.button>

            {/* Cities dropdown */}
            {country?.cities?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute top-[1.5rem] left-1/2 z-50 hidden -translate-x-1/2 group-hover:block"
              >
                <div className="min-w-[200px] overflow-hidden border border-gray-100 bg-white/95 shadow-lg backdrop-blur-md">
                  <ul className="flex h-fit max-h-[250px] flex-col overflow-y-auto">
                    {country.cities.map((city) => (
                      <li key={city.id}>
                        <Link
                          href={`/${country.slug}`}
                          onClick={() =>
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
                          }
                          className="text-dark hover:text-primary block w-full border-b-[0.0625rem] border-gray-100 text-sm uppercase transition-colors duration-200 last:border-0 hover:bg-gray-200"
                        >
                          <span className="block w-full truncate border-b-[0.0625rem] border-[#d4d4d4] px-3 py-4 text-wrap break-words">
                            {city.name.trim()}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        ))}

        {/* Static links */}
        {navbar_links.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`${
              isHome ? "text-white hover:text-white/80" : "text-dark hover:text-dark-grey"
            } text-sm uppercase transition-colors duration-200 lg:text-lg`}
          >
            {t(item.title)}
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
