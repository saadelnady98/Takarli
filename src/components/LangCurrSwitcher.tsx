"use client";

import React, { useMemo, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "@/lib/navLink";
import { useLangCurr } from "@/context/langCurrContext";
import { Lang_CurrProps } from "@/types/interfaceData";
import NavLinks from "./nav-links";

const formatCurrency = (currency: string): string => {
  switch (currency) {
    case "AED":
      return "AED";
    case "EUR":
      return "EUR";
    default:
      return "$";
  }
};
const ChevronIcon = memo(({ chevronColorClass }: { chevronColorClass: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`h-3 w-3 sm:h-5 sm:w-5 font-light ${chevronColorClass}`}
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

ChevronIcon.displayName = "ChevronIcon";

const LangCurrSwitcher: React.FC<Lang_CurrProps> = ({ onClick, data }) => {
  const pathname = usePathname();
  const { language, currency } = useLangCurr();

  const { logoSrc, globeSrc, textColorClass, chevronColorClass } = useMemo(() => {
    const home = pathname === "/";
    return {
      logoSrc: home
        ? "/assets/logo/logo-white.png"
        : "/assets/logo/logo-nav.png",
      globeSrc: home
        ? "/assets/logo/globe-white.svg"
        : "/assets/logo/globe-black.svg",
      textColorClass: home
        ? "text-black lg:text-white"
        : "text-dark",
      chevronColorClass: home
        ? "lg:text-white"
        : "text-dark",
    };
  }, [pathname]);

  const handleClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  return (
    <header className="container-padding items-strech justify-between pt-4 pb-2  max-lg:ms-auto max-sm:px-1 lg:flex lg:w-full lg:border-b-[0.5px] lg:border-[#d4d4d4] ">
      <Link href="/" aria-label="Home logo link">
        <Image
          src={logoSrc}
          alt="Navigation Logo"
          width={90}
          height={60}
          priority
          className="max-lg:hidden"
          title="Takarli"
          aria-label="Takarli"
        />
      </Link>

      <NavLinks data={data} />

      <button
        type="button"
        onClick={handleClick}
        aria-label="Change language and currency"
        className="flex h-12 items-center justify-between gap-1.5 border border-[#d4d4d4] p-2 transition-colors 
                   hover:border-gray-400 focus:outline-none cursor-pointer sm:min-h-8 sm:min-w-28 lg:min-h-9 lg:min-w-36"
      >
        <div
          className={`${textColorClass} flex items-center gap-1.5 text-xs text-nowrap lg:text-base`}
        >
          <Image
            src={globeSrc}
            alt="Globe icon"
            width={16}
            height={16}
            unoptimized
            className="object-cover max-lg:hidden lg:h-5 lg:w-5"
          />
          {language.toUpperCase()} - {formatCurrency(currency)}
        </div>

        <ChevronIcon
          chevronColorClass={chevronColorClass}
        />
      </button>
    </header>
  );
};

export default React.memo(LangCurrSwitcher);
