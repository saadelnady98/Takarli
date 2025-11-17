import React from "react"
import { HomePageResponse } from "@/types/home-types"
import { useTranslations } from "next-intl"

export default function AboutTakarli({ data }: { data: HomePageResponse }) {
  const t = useTranslations("home")
  return (
    <section className="container-padding flex flex-col items-center gap-5 lg:gap-6">
      <h2 className="text-dark bg-badge flex items-center justify-center rounded-[7.5px] px-3.5 py-1.5 text-sm font-semibold lg:rounded-4xl lg:px-7.5 lg:py-3 lg:text-xl">
        {t("aboutSectionTitle")}{" "}
      </h2>
      <p className="text-dark m-auto text-center text-lg text-pretty capitalize sm:text-2xl lg:w-3/4 lg:text-4xl lg:leading-[174%]">
        {data?.Who_We_Are?.title}
        <span className="text-text-Paragraph ml-2.5">{data?.Who_We_Are?.short_description}</span>
      </p>
    </section>
  )
}
