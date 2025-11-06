import { StaticImageData } from "next/image"
import { NavbarResponse } from "./navbar-types"

export interface TitleProps {
  children: React.ReactNode
  className?: string
}
export interface ParagraphProps {
  children: React.ReactNode
  className?: string
}

export type AppPath =
  | "/"
  | "/about-us"
  | "/privacy"
  | "/uae"
  | "/monaco"
  | "/contact-us"
  | "/terms"
  | "/en"
  | "/fr"
  | "/developers"
  | "/blogs"
  | "/faqs"
  | string

export interface navbar_linksProps {
  id: number
  title: string
  path: AppPath
}
export interface footer_linksProps {
  id: number
  title: string
}
export interface footer_links2Props {
  id: number
  title: string
  path: AppPath
}

export interface BadgeProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface OffPlanHomeProps {
  id?: number
  title?: string
  short?: string
  describtion?: string
}

export interface ReadyHomeProps {
  id?: number
  title?: string
  short?: string
  describtion?: string
}

export interface BtnProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}
export interface ReadyOffSectionProps {
  data: OffPlanHomeProps[] | ReadyHomeProps[]
  PropertyCards: PropertyCardsProps[]
}

export interface HomePropertySwiperProps {
  PropertyCards: PropertyCardsProps[]
  className?: string
}

export interface ContactFormProps {
  firstName: string
  lastName: string
  email: string
  message: string
}
export interface ContactFormErrors {
  firstName?: string
  lastName?: string
  email?: string
  message?: string
}

export interface PropertyCardsProps {
  id?: number | string
  title?: string
  location?: string
  price?: string
  Img?: string
}
export interface PropertyCardProps {
  data: PropertyCardsProps
}

export interface uaePageProps {
  id: number
  title: string
  short: string
  des: string
}
export interface TitAndDesProps {
  data: uaePageProps[] | monacoPageProps[]
}
export interface monacoPageProps {
  id: number
  title: string
  short: string
  des: string
}

export interface languageProps {
  id: number
  label: string
  value: string
}

export interface currencyProps {
  id: number
  label: string
  value: string
}

export interface SharedModalBodyProps {
  title: string
  data: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}
export interface Item {
  label: string
  value: string
  data?: unknown
}

export interface SharedDrowpdownProps {
  data: Item[]
  value?: string
  onChange?: (v: string, item?: Item) => void // تحديث لإرجاع العنصر كامل
  beforeImage?: React.ReactNode
  isFilter?: boolean
  placeholder?: string
}

export interface DynamicDropdownProps {
  endpoint: string
  value?: string
  onChange?: (val: string, item?: Item) => void
  beforeImage?: React.ReactNode
  placeholder?: string
  isEnabled?: boolean
}
export interface PriceRange {
  min: number
  max: number
  label: string
}

export interface PriceRangeDropdownProps {
  value?: PriceRange
  onChange?: (range: PriceRange) => void
  beforeImage?: React.ReactNode
}
export interface Lang_CurrProps {
  onClick: () => void
  data: NavbarResponse["data"]
}

export interface propertyAmninityProps {
  id: number
  title: string
  img: string
}

export interface floorPlanUtilsProps {
  id: number
  title: string
  des: string
}

export interface SharedInputProps {
  errorText: string
  errors_input?: string
  label: string
  labelPlacement?: "outside" | "outside-left" | "outside-top" | "inside"
  name: string
  placeholder: string
  labelClassName?: string
  inputClassName?: string
  inputWrapperClassName?: string
  type?: string
}

export interface SharedModalProps {
  children: React.ReactNode
}

export interface dummy_ImagesProps {
  id: number
  img: string
}

// Shared image type returned from the API
export interface PropertyImage {
  id: number
  file_name: string
  original_url: string
  extension: string
  size: number
}

export interface GalleryHeroDataProps {
  data: string[]
}

export interface footer_main_linksProps {
  id: number
  titleKey: string
  path: AppPath
}

export interface HeroSectionProps {
  BadgeClassName?: string
  Badgetitle?: string
  HeroSectionClassName?: string
  TitleName?: string
  TitleClassName?: string
  img?: string
}

export interface Developers_dataProprs {
  id: number
  title: string
  img: string | StaticImageData
  description: string
}

export interface DevelopersCardProps {
  img: string | StaticImageData
  title: string
  description: string
  btnTitle: string
}

export interface blogs_SectionProps {
  id: number
  title: string
  description: string
  img: string | StaticImageData
}

export interface BlogsSectionDataProps {
  data: blogs_SectionProps[]
}

export interface BlogsCardsProps {
  id: number
  img: string | StaticImageData
  title: string
  description: string
}

export interface BlogsCardsDataProps {
  data: BlogsCardsProps[]
}

export interface BadgeProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface OffPlanHomeProps {
  id?: number
  title?: string
  short?: string
  describtion?: string
}

export interface ReadyHomeProps {
  id?: number
  title?: string
  short?: string
  describtion?: string
}

export interface BtnProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
export interface ReadyOffSectionProps {
  data: OffPlanHomeProps[] | ReadyHomeProps[]
  PropertyCards: PropertyCardsProps[]
}

export interface ContactFormProps {
  firstName: string
  lastName: string
  email: string
  message: string
}
export interface ContactFormErrors {
  firstName?: string
  lastName?: string
  email?: string
  message?: string
}

// interface cover {
//   id: number
//   file_name: string
//   extension: string
//   original_url: string
//   size: number
// }
export interface PropertyCardsProps {
  id?: number | string
  name?: string
  area?: string
  starting_price?: string
  cover?: string
  currency?: string
  slug?: string
  category?: string
  city?: string
}
export interface PropertyCardProps {
  data: PropertyCardsProps
}

export interface PropertyCardProps {
  data: PropertyCardsProps
}

export interface uaePageProps {
  id: number
  title: string
  short: string
  des: string
}
export interface TitAndDesProps {
  data: uaePageProps[] | monacoPageProps[]
}
export interface monacoPageProps {
  id: number
  title: string
  short: string
  des: string
}

export interface languageProps {
  id: number
  label: string
  value: string
}

export interface currencyProps {
  id: number
  label: string
  value: string
}

export interface modalbodyyProps {
  title: string
  data: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}
export interface DropdownUProps {
  data: Item[]
  value?: string // current value (value not label) - optional
  onChange?: (v: string) => void
}
export interface Item {
  label: string
  value: string
}

export interface Lang_CurrProps {
  onClick: () => void
}

export interface propertyAmninityProps {
  id: number
  title: string
  img: string
}

export interface floorPlanUtilsProps {
  id: number
  title: string
  des: string
}

export interface SharedInputProps {
  errorText: string
  errors_input?: string
  label: string
  labelPlacement?: "outside" | "outside-left" | "outside-top" | "inside"
  name: string
  placeholder: string
  labelClassName?: string
  inputClassName?: string
  inputWrapperClassName?: string
}
