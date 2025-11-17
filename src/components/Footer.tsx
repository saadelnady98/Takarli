import Image from "next/image"
import Link from "next/link"
import React from "react"
import { getTranslations } from "next-intl/server"
import { footer_main_links, footer_links2 } from "@/data/data"
import { AppPath } from "@/types/interfaceData"
import { SocialIcons } from "./footer/social-icons"
import {
  ConnectSectionProps,
  FooterApiResponse,
  FooterBottomProps,
  FooterLinkItem,
  FooterNavigationProps,
  LegalLinkItem,
} from "@/types/footer"

const FOOTER_LOGO = {
  src: "/assets/logo/logo-footer.png",
  alt: "Takarli Logo",
  width: 110,
  height: 70,
} as const

const LEGAL_KEYS = ["terms & conditions", "privacy policy", "faqs"] as const

const FooterLogo = React.memo(function FooterLogo() {
  return (
    <div className="flex h-[70px] min-h-[70px] w-full items-center justify-center">
      <Link
        href="/"
        className="flex justify-center"
        title="Takarli"
        aria-label="Takarli homepage"
        prefetch={false}
      >
        <Image
          src={FOOTER_LOGO.src}
          alt={FOOTER_LOGO.alt}
          width={FOOTER_LOGO.width}
          height={FOOTER_LOGO.height}
          className="object-cover"
        />
      </Link>
    </div>
  )
})

const FooterLink = React.memo(function FooterLink({
  item,
  title,
}: {
  item: FooterLinkItem
  title: string
}) {
  return (
    <Link
      href={item.path as AppPath}
      className="text-dark-grey hover:text-dark group relative text-xs uppercase transition-colors duration-300 sm:text-sm lg:text-base"
      title={title}
      aria-label={title}
      prefetch={false}
    >
      {title}
      <span
        className="bg-dark absolute bottom-[-2px] left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
        aria-hidden="true"
      />
    </Link>
  )
})
const FooterNavigation = React.memo(function FooterNavigation({ t }: FooterNavigationProps) {
  return (
    <nav
      className="flex w-full items-center justify-center gap-x-3 gap-y-2 uppercase max-[350px]:flex-wrap sm:gap-x-6"
      aria-label="Footer navigation"
    >
      {footer_main_links.map((item) => (
        <FooterLink key={item.id} item={item} title={t(`links.${item.titleKey}`)} />
      ))}
    </nav>
  )
})

const ConnectSection = React.memo(function ConnectSection({ t }: ConnectSectionProps) {
  return (
    <section className="space-y-3 text-center">
      <h2 className="text-2xl lg:text-4xl">{t("connect")}</h2>
      <p className="text-dark-grey mx-auto max-w-md text-sm font-light lg:text-base">
        {t("connectDesc")}
      </p>
    </section>
  )
})

const LegalLink = React.memo(function LegalLink({
  item,
  t,
  isLast,
}: {
  item: LegalLinkItem
  t: (key: string) => string
  isLast: boolean
}) {
  const isLegal = LEGAL_KEYS.includes(item.title.toLowerCase() as (typeof LEGAL_KEYS)[number])
  const translationKey = isLegal
    ? `legal.${item.title.replace(/\s/g, "").toLowerCase()}`
    : `links.${item.title.replace(/\s/g, "").toLowerCase()}`

  const linkTitle = t(translationKey)

  return (
    <>
      <Link
        href={item.path}
        className="hover:text-primary text-xs transition-colors sm:text-sm lg:text-base"
        title={linkTitle}
        aria-label={linkTitle}
        prefetch={false}
      >
        {linkTitle}
      </Link>
      {!isLast && <span className="h-3 w-px bg-gray-300" aria-hidden="true" />}
    </>
  )
})

const FooterBottom = React.memo(function FooterBottom({ footer, t }: FooterBottomProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4 border-t border-[#d4d4d4] pt-4 lg:flex-row lg:justify-between">
      <div className="text-dark-grey flex flex-wrap items-center justify-center gap-4">
        <SocialIcons socials={footer?.social} contacts={footer?.contacts} />

        <span className="hidden h-4 w-px bg-gray-300 lg:inline-block" aria-hidden="true" />

        <div
          className="flex flex-wrap items-center justify-center gap-3"
          role="navigation"
          aria-label="Legal links"
        >
          {footer_links2.map((item, index) => (
            <LegalLink
              key={item.id}
              item={item}
              t={t}
              isLast={index === footer_links2.length - 1}
            />
          ))}
        </div>

        <span className="hidden h-4 w-px bg-gray-300 lg:inline-block" aria-hidden="true" />

        <span className="text-xs lg:text-sm">{t("rights")}</span>
      </div>
    </div>
  )
})

const FooterSkeleton = React.memo(function FooterSkeleton() {
  return (
    <footer
      className="text-dark flex min-h-[400px] flex-col items-center justify-center gap-6 px-6 pb-4"
      role="status"
      aria-label="Loading footer"
    >
      <div className="flex h-[70px] min-h-[70px] w-full items-center justify-center">
        <div className="h-[70px] w-[110px] animate-pulse rounded bg-gray-200" aria-hidden="true" />
      </div>

      <nav className="flex w-full items-center justify-center gap-x-3 gap-y-2 max-[350px]:flex-wrap sm:gap-x-6">
        {footer_main_links.map((item) => (
          <div
            key={item.id}
            className="h-4 w-16 animate-pulse rounded bg-gray-200"
            aria-hidden="true"
          />
        ))}
      </nav>

      <section className="flex min-h-[120px] w-full flex-col justify-center space-y-3 text-center">
        <div className="mx-auto h-8 w-32 animate-pulse rounded bg-gray-200" aria-hidden="true" />
        <div className="mx-auto h-4 w-64 animate-pulse rounded bg-gray-200" aria-hidden="true" />
      </section>

      <div className="flex w-full flex-col items-center gap-4 border-t border-[#d4d4d4] pt-4">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200" aria-hidden="true" />
      </div>
    </footer>
  )
})

export default async function Footer({ data }: { data: FooterApiResponse["data"] | null }) {
  // const {data} = await fetchPageData<FooterApiResponse>("/layout/footer")
  if (!data) return <FooterSkeleton />
  const t = await getTranslations("footer")

  return (
    <footer className="text-dark flex flex-col items-center justify-center gap-6 px-6 pb-4">
      <FooterLogo />
      <FooterNavigation t={t} />
      <ConnectSection t={t} />
      <FooterBottom footer={data} t={t} />
    </footer>
  )
}
