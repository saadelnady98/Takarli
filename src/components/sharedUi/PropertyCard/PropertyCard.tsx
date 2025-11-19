"use client"

import React, { useState, memo, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import type { PropertyCardProps } from "./types"
import { getCurrencyIcon } from "@/lib/utils"

/**
 * PropertyCard Component
 * - Optimized for performance (lazy loading, reduced CLS, better image handling)
 * - Follows SOLID: Single Responsibility, small reusable utilities
 * - Fully responsive & accessible with unchanged visuals or logic
 */

const FALLBACK_IMAGE = "/assets/homepage/pic-1.svg"

function PropertyCardComponent({
  data,
  align = "left",
}: PropertyCardProps & { align?: "left" | "center" }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const propertyUrl = data.slug
    ? `/${data.country?.slug}/${data.slug}`
    : `/${data.country?.slug}/${data.id}`

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  const imageSrc = data?.cover || data?.image || FALLBACK_IMAGE
  const imageAlt = data?.name ?? "Property listing image"

  return (
    <Link
      href={propertyUrl}
      prefetch={false}
      className="group relative block w-full overflow-hidden shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-[3/4] w-full bg-gray-100">
        {/* Loader shown until image fully loaded */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 className="h-8 w-8 text-gray-500" />
            </motion.div>
          </div>
        )}

        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          quality={70}
          loading="lazy"
          onLoad={handleImageLoad}
          placeholder="blur"
          blurDataURL={imageSrc}
          priority={false}
          className={`object-cover brightness-80 transition-opacity duration-500 ease-in-out group-hover:brightness-100 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlay Effect */}
        <div className="absolute inset-0 bg-black/20 transition-colors duration-500 ease-in-out group-hover:bg-black/10" />
      </div>

      {/* Text Overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 lg:p-6 ${
          align === "center" ? "items-center text-center" : "items-start"
        }`}
      >
        {(data.name || data.title) && (
          <h4 className="text-lg font-semibold text-white lg:text-2xl">
            {data.name || data.title}
          </h4>
        )}
        {data.area && (
          <div
            className={`mt-1 flex items-center gap-1.5 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            <p className="text-xs font-light text-white/90 lg:text-[18px]">{data.area}</p>
          </div>
        )}
        {/* {data.starting_price && (
          <p className="mt-2 text-base font-bold text-white lg:text-xl">
            {`${data.currency ?? ""} ${data.starting_price}`}
          </p>
        )}  */}
        {data.starting_price && (
          <div className="mt-2 flex items-center gap-1">
            {data.currency && (
              <Image
                src={getCurrencyIcon(data.currency,false)}
                alt={data.currency}
                width={30}
                height={30}
                className="h-6 w-6"
                unoptimized
              />
            )}
            <span className="font-bold text-[#ddd] lg:text-lg">{`${data.starting_price}`}</span>
          </div>
        )}
      </div>
    </Link>
  )
}

export const PropertyCard = memo(PropertyCardComponent)
export default PropertyCard
