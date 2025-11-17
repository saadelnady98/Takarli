import React from "react"
import { useTranslations } from "next-intl"
import GenericHeader from "@/components/sharedUi/generic-header"
import TalkToExpertForm from "@/components/talkToExpertPage/TalkToExpertForm"

export default function TalkToExpertPage() {
  const t = useTranslations("talkToExpert")

  return (
    <div className="flex flex-col gap-[2.5rem] lg:px-[8.75rem]">
      <div className="mt-[3rem]">
        <GenericHeader
          title={t("header.title")}
          span={t("header.span")}
          image="/assets/single-property/img-5.webp"
          altText={t("header.altText")}
          darkOverlay
        />
      </div>

      <div className="flex flex-col items-center text-center lg:gap-5 gap-4 lg:mt-10 mt-6">
        <h1 className="text-dark  lg:text-xl text-lg font-bold">
          {t("heading")}
        </h1>
        <p className=" lg:text-4xl text-2xl capitalize lg:mb-5 mb-2 text-dark">
          {t("subheading")}
        </p>
      </div>

      <TalkToExpertForm />
    </div>
  )
}
