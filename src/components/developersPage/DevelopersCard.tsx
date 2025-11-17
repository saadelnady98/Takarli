// components/developersPage/DevelopersCard.tsx
"use client"

import React, { useState, memo, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Developer, DevelopersCardProps } from "./types"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

const DevelopersCard = memo(
  function DevelopersCard({ developer }: DevelopersCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)
    const t = useTranslations("developers")

    const { image, name, description, slug }: Developer = developer

     const imageSrc = useMemo(() => {
      return imageError || !image ? "/assets/homepage/pic-1.svg" : image
    }, [image, imageError])

    const handleImageLoad = () => {
      setIsImageLoaded(true)
    }

    const handleImageError = () => {
      if (!imageError) {
        setImageError(true)
        setIsImageLoaded(false)
      }
    }

    return (
      <div className="border-border2 overflow-hidden border transition-all duration-300 hover:shadow-lg">
        <div className="relative h-[200px] lg:h-[250px] w-full">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader2 className="h-8 w-8 text-gray-400" />
              </motion.div>
            </div>
          )}
          <Image
            src={imageSrc}
            alt={name || "Developer image"}
            width={400}
            height={250}
            quality={65}  
             loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`h-full w-full object-contain px-4 transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"  
          />
        </div>

        <div className="flex flex-col gap-4 px-4 py-6">
          <h2 className="text-dark-grey line-clamp-2 font-[galleds] text-[2rem] font-normal">
            {name}
          </h2>

          <p className="text-dark-grey line-clamp-4 min-h-[6rem] text-sm leading-relaxed font-light">
            {description}
          </p>
          <Link
            href={`/developers/${slug}`}
            title={`Discover more about ${name}`}
            className="bg-dark w-fit rounded-none px-4 py-2 font-[galleds] text-xs font-extralight text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800 lg:text-sm"
            prefetch={false}
            aria-label={`Discover more about ${name}`}
          >
            {t("discoverMore")}
          </Link>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.developer.id === nextProps.developer.id &&
      prevProps.developer.image === nextProps.developer.image
    )
  },
)

export default DevelopersCard
