"use client"
import React from "react"
import Image from "next/image"
import { Images } from "@/data/data"
import MobileAgentCard from "./MobileAgentCard"
import ShareModal from "./share-icon-modal"
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page"
import { useTranslations } from "next-intl"

export default function SinglePropertyTitle({
  singlePropertyData,
}: {
  singlePropertyData: SinglePropertyResponse
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [shareOpen, setShareOpen] = React.useState(false)
  const t = useTranslations("singleProperty")
  const handleContact = () => setIsOpen((prev) => !prev)
  const handleShare = () => setShareOpen(true)
  const closeShare = () => setShareOpen(false)

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Image src={Images.pin} alt="pin" width={24} height={24} />
            <p className="text-dark-grey text-sm lg:text-lg">{singlePropertyData?.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src={Images.home} alt="home" width={24} height={24} />
            <p className="text-dark-grey text-sm lg:text-lg">{singlePropertyData?.property_type}</p>
          </div>
        </div>

        <button onClick={handleShare} className="cursor-pointer transition hover:scale-110">
          <Image src={"/assets/icons/telegram-white.svg"} alt="share" width={28} height={28} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-[galleds] text-3xl lg:text-5xl">{singlePropertyData?.name}</h2>
        <div className="flex w-full items-center justify-between">
          <span className="text-dark text-lg font-bold lg:text-3xl">
            {singlePropertyData?.currency} {singlePropertyData?.starting_price}
          </span>

          <button
            className="bg-badge text-dark hover:bg-dark block cursor-pointer px-3 py-2.5 font-[galleds] text-sm capitalize hover:text-white xl:hidden"
            onClick={handleContact}
          >
            {t("contactAgent")}
          </button>
        </div>
      </div>

      <MobileAgentCard
        isOpen={isOpen}
        onClose={handleContact}
        singlePropertyData={singlePropertyData}
        propertyId={singlePropertyData?.id?.toString()}
      />

      {/* Share Modal */}
      <ShareModal isOpen={shareOpen} onClose={closeShare} url={currentUrl} />
    </div>
  )
}
