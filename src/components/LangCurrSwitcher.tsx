"use client"
import React from "react"
import Image from "next/image"
import { usePathname } from "@/lib/navLink"
import { Lang_CurrProps } from "@/types/interfaceData"
import { useLangCurr } from "@/context/langCurrContext"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import NavLinks from "./nav-links"

export default function LangCurrSwitcher({ onClick, data }: Lang_CurrProps) {
  const pathname = usePathname()
  const { language, currency } = useLangCurr()
  const { Imagess, isHome, globe } = React.useMemo(() => {
    const isHome = pathname === "/"
    return {
      isHome,
      Imagess: isHome ? "/assets/logo/logo-white.png" : "/assets/logo/logo-nav.png",
      globe: isHome ? "/assets/logo/globe-white.svg" : "/assets/logo/globe-black.svg",
    }
  }, [pathname])
  return (
    <div className="container-padding items-center justify-between lg:border-b-[0.5px] lg:border-[#d4d4d4] py-4 max-lg: ms-auto max-sm:px-1 lg:flex lg:w-full lg:pt-5">
      <Link href="/">
        <Image
          src={Imagess}
          alt="navlogo"
          width={90}
          height={60}
          quality={100}
          className="max-lg:hidden"
        />
      </Link>
      <NavLinks data={data} />

      <div
        onClick={onClick}
        className="flex h-12 hover:border-gray-400 focus:outline-none transition-colors min-w-fit cursor-pointer items-center justify-between gap-1.5 border-[0.0625rem] border-[#d4d4d4] p-2 sm:min-h-8 sm:min-w-28 lg:min-h-9 lg:min-w-36"
      >
        <div
          className={`${isHome ? "text-black lg:text-white" : "text-dark"} flex items-center gap-[0.375rem] text-[12px] text-nowrap lg:text-[1rem]`}
        >
          <Image
            src={globe}
            unoptimized
            alt="globe"
            width={16}
            height={16}
            className="object-cover max-lg:hidden lg:h-5 lg:w-5"
          />
          {/* <Image
            src={'/assets/logo/globe-black.svg'}
            unoptimized
            alt="globe"
            width={16}
            height={16}
            className="sm:h-5 lg:hidden sm:w-5 h-3 w-3 object-cover"
          /> */}
          {language.toUpperCase()} -{" "}
          {currency === "Dirham" ? "AED" : currency === "EUR" ? "EUR" : "$"}
        </div>
        <ChevronDown
          className={`h-3 w-3 font-light sm:h-5 sm:w-5 ${isHome ? "lg:text-white" : "text-dark"}`}
        />
      </div>
    </div>
  )
}
