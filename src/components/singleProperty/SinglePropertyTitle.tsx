"use client"
import React from "react"
import Image from "next/image"
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
            <Image src="/assets/icons/location.svg" alt="pin" width={24} height={24} />
            <p className="text-dark-grey text-sm lg:text-lg">{singlePropertyData?.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/assets/icons/house.svg" alt="home" width={24} height={24} />
            <p className="text-dark-grey p-0 text-sm lg:text-xl m-0">{singlePropertyData?.property_type}</p>
          </div>
        </div>

        <button onClick={handleShare} className="cursor-pointer transition hover:scale-110">
          <Image src={"/assets/icons/telegram-white.svg"} alt="share" width={28} height={28} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className=" text-3xl lg:text-3xl">{singlePropertyData?.name}</h2>
        <div className="flex w-full items-center justify-between">
          <span className="text-dark text-lg font-bold lg:text-xl">
            {singlePropertyData?.currency} {singlePropertyData?.starting_price}
          </span>

          <button
            className="bg-badge text-dark hover:bg-dark block cursor-pointer px-3 py-2.5  text-sm capitalize hover:text-white xl:hidden"
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
