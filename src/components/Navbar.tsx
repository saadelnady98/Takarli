"use client"

import React from "react"
import { usePathname } from "@/lib/navLink"
import LangCurrButton from "./sharedUi/LangCurrButton"
import { TextAlignStart } from "lucide-react"
import MobileMenu from "./mobile-menu"
import Image from "next/image"
import type { NavbarResponse } from "@/types/navbar-types"
import { usePageData } from "@/hooks/use-fetch-pages"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function Navbar() {
  const pathname = usePathname()
  const t = useTranslations("Navbar")

  const { data, isLoading, error } = usePageData<NavbarResponse>("/layout/navbar")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const navData = (data?.data ?? []) as NavbarResponse["data"]

  const { Home } = React.useMemo(() => {
    const isHome = pathname === "/"
    return {
      Home: isHome ? "bg-transparent absolute top-0 left-0 right-0 z-20 " : "bg-white",
    }
  }, [pathname])

  const hasError = Boolean(error)

  return (
    <>
      {/* -------- Desktop Navbar -------- */}
      <div className={`hidden w-full flex-col gap-2.5 lg:flex lg:gap-5 ${Home}`}>
        <LangCurrButton data={navData} />
        {hasError && (
          <div className="flex w-full justify-center py-2">
            <p className="text-sm text-red-500">{t("error")}</p>
          </div>
        )}
      </div>

      {/* -------- Mobile Navbar -------- */}
      <div
        className={`grid grid-cols-3 items-center justify-between bg-white px-4 pt-3 pb-2 lg:hidden ${Home}`}
      >
        <button onClick={() => setIsMobileMenuOpen(true)} className="w-fit">
          <TextAlignStart className="text-dark-grey h-7 w-7 cursor-pointer" />
        </button>
        <Link href="/">
          <Image
            src={"/assets/logo/logo-nav.png"}
            alt="navlogo-mobile"
            width={80}
            height={45}
            quality={100}
            className="m-auto object-contain"
          />
        </Link>
        <div className="ms-auto">
          <LangCurrButton data={navData} />
        </div>
      </div>

      {/* -------- Mobile Menu -------- */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        data={navData}
        isLoading={isLoading}
      />
    </>
  )
}
