// components/Footer/Footer.tsx
import Image from "next/image"
import Link from "next/link"
import {
  footer_main_links,
  footer_links2,
  // Mobile_Footer_Links,
} from "@/data/data"
import { AppPath } from "@/types/interfaceData"
import { getFooterData } from "@/hooks/fetch-footer"
// import { ContactInfo } from "./footer/contact-info"
import { SocialIcons } from "./footer/social-icons"
import { getTranslations } from "next-intl/server"
import React from "react"

// ✅ Footer Component — clean & responsive
export default async function Footer() {
  const footer = await getFooterData()
  const t = await getTranslations("footer")

  return (
    <footer className="px-6 flex flex-col items-center justify-center gap-6 pb-4 text-dark">
      {/* ---------- Logo ---------- */}
      <Link href="/" className="flex justify-center">
        <Image
          src="/assets/logo/logo-footer.png"
          alt="footer logo"
          width={110}
          height={70}
          className="hidden lg:block object-contain"
        />
        <Image
          src="/assets/logo/logo-nav.png"
          alt="footer logo mobile"
          width={110}
          height={70}
          className="block lg:hidden object-contain"
        />
      </Link>

      {/* ---------- Links (Mobile / Desktop unified pattern) ---------- */}
<nav className="w-full flex max-[350px]:flex-wrap  justify-center items-center sm:gap-x-6 gap-x-3 gap-y-2 sm:text-sm text-xs lg:text-base uppercase">
  {footer_main_links.map((item) => (
    <Link
      key={item.id}
      href={item.path as AppPath}
      className="relative text-dark-grey hover:text-dark transition-colors duration-300 group"
    >
      {t(`links.${item.titleKey}`)}
      {/* underline animation */}
      <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-dark transition-all duration-300 group-hover:w-full"></span>
    </Link>
  ))}
</nav>


      {/* ---------- Connect Section ---------- */}
      <section className="text-center space-y-3">
        <h6 className="font-[galleds] text-2xl lg:text-4xl">{t("connect")}</h6>
        <p className="text-dark-grey text-sm lg:text-base font-light max-w-md mx-auto">
          {t("connectDesc")}
        </p>
      </section>

      {/* ---------- Contact Info ---------- */}
      {/* <ContactInfo
        email={footer?.contacts?.email}
        phone1={footer?.contacts?.phone1}
        whatsapp={footer?.contacts?.whatsapp}
      /> */}

      {/* ---------- Bottom Section ---------- */}
      <div className="w-full border-t border-[#d4d4d4]  pt-4 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        {/* Social + Links + Rights unified row */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm lg:text-base text-dark-grey">
          <SocialIcons socials={footer?.social}   contacts={footer?.contacts} />

          {/* Divider */}
          <span className="hidden lg:inline-block h-4 w-px bg-gray-300" />

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {footer_links2.map((item, i) => (
              <React.Fragment key={item.id}>
                <Link
                  href={item.path}
                  className="hover:text-primary transition-colors"
                >
                  {t(
                    ["terms & conditions", "privacy policy","FAQs"].includes(
                      item.title.toLowerCase()
                    )
                      ? `legal.${item.title.replace(/\s/g, "").toLowerCase()}`
                      : `links.${item.title.replace(/\s/g, "").toLowerCase()}`
                  )}
                </Link>
                {i !== footer_links2.length - 1 && (
                  <span className="h-3 w-px bg-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Divider */}
          <span className="hidden lg:inline-block h-4 w-px bg-gray-300" />

          {/* Rights */}
          <span className="text-xs lg:text-sm text-dark-grey">
            {t("rights")}
          </span>
        </div>
      </div>
    </footer>
  )
}
