import {
  currencyProps,
  footer_links2Props,
  footer_linksProps,
  footer_main_linksProps,
  languageProps,
  navbar_linksProps,
} from "../../src/types/interfaceData"
import linkedin from "../../public/assets/icons/linkedin.svg"
import facebook from "../../public/assets/icons/facebook.svg"
import insta from "../../public/assets/icons/insta.svg"
import youtube from "../../public/assets/icons/youtube.svg"

export const languages: languageProps[] = [
  { id: 1, label: "English", value: "en" },
  { id: 2, label: "French", value: "fr" },
]

export const currency: currencyProps[] = [
  { id: 1, label: "USD", value: "USD" },
  { id: 2, label: "EUR", value: "EUR" },
  { id: 2, label: "AED", value: "AED" },
]

export const Mobile_Footer_Links = [
  // { id: 1, titleKey: "home", path: "/" },
  { id: 4, titleKey: "aboutUs", path: "/about-us" },
  { id: 5, titleKey: "contactUs", path: "/contact-us" },
  { id: 6, titleKey: "developers", path: "/developers" },
  { id: 7, titleKey: "blogs", path: "/blogs" },
  // { id: 8, titleKey: "faqs", path: "/faqs" },
]

export const navbar_links: navbar_linksProps[] = [
  { id: 1, title: "About Us", path: "/about-us" },
  { id: 2, title: "Contact Us", path: "/contact-us" },
]

export const footer_main_links: footer_main_linksProps[] = [
  // { id: 1, titleKey: "home", path: "/" },
  { id: 4, titleKey: "aboutUs", path: "/about-us" },
  { id: 5, titleKey: "contactUs", path: "/contact-us" },
  { id: 6, titleKey: "developers", path: "/developers" },
  // { id: 7, titleKey: "blogs", path: "/blogs" },
  // { id: 8, titleKey: "faqs", path: "/faqs" },
]
export const footer_links: footer_linksProps[] = [
  { id: 1, title: "Info@Takarli.com" },
  { id: 2, title: "Contact@Takarli.com" },
  { id: 3, title: "+861 312 3543 12" },
]

export const footer_links2: footer_links2Props[] = [
  { id: 1, title: "Terms & Conditions", path: "/terms" },
  { id: 2, title: "Privacy Policy", path: "/privacy" },
  { id: 3, title: "faqs", path: "/faqs" },
]

export const social_links = [
  { id: 1, title: "linkedin", image: linkedin },
  { id: 2, title: "facebook", image: facebook },
  { id: 3, title: "instagram", image: insta },
  { id: 4, title: "youtube", image: youtube },
]
