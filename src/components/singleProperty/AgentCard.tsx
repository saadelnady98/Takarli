"use client"
import React, { useState } from "react"
// import { Images } from "@/data/data"
import Image from "next/image"
import ContactForm from "../ContactForm"
import { Mail, X } from "lucide-react"
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page"
import { useTranslations } from "next-intl"
import { Button } from "../ui/button"
import Link from "next/link"

export default function AgentCard({
  propertyId,
  singlePropertyData,
}: {
  propertyId?: string
  singlePropertyData?: SinglePropertyResponse
}) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen((prev) => !prev)
  }
  const devImage = singlePropertyData?.developer?.image || "/assets/logo/footer-logo.png"
  const t = useTranslations("singleProperty")
  return (
    <>
      {!open && (
        <div className="from-badge flex w-full flex-col gap-4 bg-gradient-to-b to-white p-6">
          <h4 className="text-dark font-[galleds] text-xl lg:text-3xl">{t("contactAgent")}</h4>
          <div className="flex items-center gap-4">
            <Link
              href={`/developers/${singlePropertyData?.developer?.slug}`}
              className="block h-[88px] w-[88px]"
            >
              <Image
                src={devImage}
                alt="agent"
                width={1024}
                height={1080}
                className="h-[88px] w-[88px] object-contain"
              />
            </Link>
            <div className="flex flex-col gap-2">
              <h4 className="text-dark text-xl lg:text-2xl">
                {" "}
                {singlePropertyData?.developer?.name}
              </h4>
              {/* <span className="text-dark-grey !text-lg font-normal">Stags properties</span> */}
            </div>
          </div>

          {/* <div className="flex w-full flex-col gap-4 bg-white p-4"> */}
          {/* <Btn className="w-full gap-2.5 bg-black text-white">
              <Image src={Images.whiteCall} alt="whiteCall" width={20} height={20} />
              <Phone />
              Call Agent
            </Btn> */}
          <Button
            onClick={handleOpen}
            className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-none border border-black bg-white py-6 text-lg text-black hover:text-white"
          >
            {/* <Image src={Images.blackEnvlop} alt="whiteCall" width={20} height={20} /> */}
            <Mail />
            {t("requestDetails")}
          </Button>
          {/* </div> */}
        </div>
      )}
      {open && (
        <div className="border-border flex flex-col gap-3 p-6">
          <div className="flex w-full justify-between">
            <h2 className="text-dark font-[galleds] !text-3xl text-[2.5rem] !font-normal">
              {t("contactUs")}
            </h2>
            <button onClick={handleOpen} className="bg-dark hover:bg-dark/80 cursor-pointer p-2 text-white transition-colors rounded-full hidden xl:block">
                <X className="h-5 w-5 text-white" />
            </button>
          </div>
          <ContactForm agent={true} propertyId={propertyId} />
        </div>
      )}
    </>
  )
}
