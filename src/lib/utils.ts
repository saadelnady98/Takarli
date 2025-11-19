import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getCurrencyIcon = (currency: string,isDark?: boolean ) => {
  switch (currency) {
    case "AED":
      return isDark ? "/assets/icons/aed-dark.svg" : "/assets/icons/aed-white.svg"
    case "USD":
      return isDark ? "/assets/icons/dollar-dark.svg" : "/assets/icons/dollar-white.svg"
    case "EUR":
      return isDark ? "/assets/icons/euro-dark.svg" : "/assets/icons/euro-white.svg"
    default:
      return isDark ? "/assets/icons/dollar-dark.svg" : "/assets/icons/dollar-white.svg"
  }
}
