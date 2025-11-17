"use client"

import Image from "next/image"

interface GenericHeaderProps {
  title: string
  span: string
  image: string
  altText: string
  darkOverlay?: boolean
  priority?: boolean
}

export default function GenericHeader({
  title,
  span,
  image,
  altText,
  darkOverlay,
  priority = true,
}: GenericHeaderProps) {
  return (
    <section className="relative h-auto w-full overflow-hidden">
      <div className="relative flex w-full items-center justify-center">
        <div className="relative h-[200px] w-full sm:h-[320px] md:h-[400px] lg:h-[350px]">
          <Image
            src={image}
            alt={altText}
            fill
            quality={75}
            priority={priority}
            fetchPriority="high"
            placeholder="blur"  
            blurDataURL={image}  
            sizes="100vw"
            className="h-full w-full object-cover"
          />

          {darkOverlay && <div className="absolute inset-0 bg-black/65" />}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="mb-3 rounded-full bg-white/20 px-5 py-1.5 backdrop-blur-sm">
            <p className="font-sans text-sm font-semibold tracking-wide text-white sm:text-base">
              {span}
            </p>
          </div>

          <h1 className="font-[galleds] text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
