"use client"

import React, { useMemo, useCallback } from "react"
import { usePathname } from "@/lib/navLink"
import LangCurrButton from "./sharedUi/LangCurrButton"
import { TextAlignStart } from "lucide-react"
import MobileMenu from "./mobile-menu"
import Image from "next/image"
import type { NavbarResponse } from "@/types/navbar-types"
import { usePageData } from "@/hooks/use-fetch-pages"
import { useTranslations } from "next-intl"
import Link from "next/link"

const MOBILE_IMAGE_PROPS = {
  width: 80,
  height: 45,
  quality: 75,
  sizes: "(max-width: 768px) 80px, 120px" as const,
} as const

const NAVBAR_CLASSES = {
  desktop: {
    base: "hidden w-full flex-col gap-2.5 lg:flex lg:gap-5",
    home: "bg-transparent absolute top-0 left-0 right-0 z-20",
    default: "bg-white",
  },
  mobile: {
    base: "grid grid-cols-3 items-center justify-between bg-white px-4 pt-3 pb-2 lg:hidden",
    home: "bg-transparent absolute top-0 left-0 right-0 z-20",
  },
} as const

interface DesktopNavbarProps {
  isHome: boolean
  navData: NavbarResponse["data"]
}

interface MobileNavbarProps {
  isHome: boolean
  navData: NavbarResponse["data"]
  onMenuOpen: () => void
}

const DesktopNavbar = React.memo(function DesktopNavbar({ isHome, navData }: DesktopNavbarProps) {
  const navbarClass = `${NAVBAR_CLASSES.desktop.base} ${
    isHome ? NAVBAR_CLASSES.desktop.home : NAVBAR_CLASSES.desktop.default
  }`

  return (
    <div className={navbarClass} role="navigation" aria-label="Main navigation">
      <LangCurrButton data={navData} />
    </div>
  )
})

const MobileNavbar = React.memo(function MobileNavbar({
  isHome,
  navData,
  onMenuOpen,
}: MobileNavbarProps) {
  const navbarClass = `${NAVBAR_CLASSES.mobile.base} ${isHome ? NAVBAR_CLASSES.mobile.home : ""}`

  return (
    <div className={navbarClass}>
      <MobileMenuButton onOpen={onMenuOpen} />
      <MobileLogo />
      <div className="ms-auto">
        <LangCurrButton data={navData} />
      </div>
    </div>
  )
})

const MobileMenuButton = React.memo(function MobileMenuButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button aria-label={"Open mobile menu"} onClick={onOpen} className="w-fit">
      <TextAlignStart className="text-dark-grey h-7 w-7 cursor-pointer" />
    </button>
  )
})

const MobileLogo = React.memo(function MobileLogo() {
  return (
    <Link href="/" prefetch={false}>
      <Image
        src="/assets/logo/logo-nav.png"
        alt="Takarli Logo"
        {...MOBILE_IMAGE_PROPS}
        priority
        loading="eager"
        className="m-auto object-contain"
      />
    </Link>
  )
})

export default function Navbar({ data }: { data: NavbarResponse["data"] | null }) {
  const pathname = usePathname()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // const { data, isLoading, error } = usePageData<NavbarResponse>("/layout/navbar")
  const navData = useMemo(() => (data ?? []) as NavbarResponse["data"], [data])

  const isHome = useMemo(() => pathname === "/", [pathname])

  const handleMenuOpen = useCallback(() => setIsMobileMenuOpen(true), [])
  const handleMenuClose = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <>
      <DesktopNavbar isHome={isHome} navData={navData} />

      <MobileNavbar isHome={isHome} navData={navData} onMenuOpen={handleMenuOpen} />

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} data={navData} />
    </>
  )
}

export { DesktopNavbar, MobileNavbar, MobileMenuButton, MobileLogo }
