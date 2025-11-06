// import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const t = useTranslations("NotFoundPage")

  return (
    <main className="container-padding my-12 flex min-h-[80vh] flex-col items-center justify-center gap-5 lg:gap-10">
      {/* <Image
        src="/assets/not-found.webp"
        quality={100}
        alt="not-found"
        width={326}
        height={263}
        className="object-contain"
      />

      <h1 className="text-center text-2xl capitalize lg:text-4xl">{t("title")}</h1>

      <p className="text-center text-base lg:text-xl">{t("description")}</p>

      <Link
        href="/"
        className="bg-dark flex h-[55px] w-[296px] items-center justify-center p-[12px_20px] text-white lg:w-[634px] lg:p-[16px_28px]"
      >
        {t("button")}
      </Link> */}
      <h1 className="text-center text-2xl text-[10rem] font-bold capitalize">404</h1>
      <p className="text-center text-base lg:text-xl">{t("description2")}</p>
      <Link
        href="/"
        className="bg-dark flex h-[55px] w-[296px] items-center justify-center p-[12px_20px] text-white lg:w-[634px] lg:p-[16px_28px]"
      >
        {t("button2")}
      </Link>
    </main>
  )
}
