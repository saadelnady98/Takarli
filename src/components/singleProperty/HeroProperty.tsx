"use client";

import Image from "next/image";
import React, { useState } from "react";
import SharedModal from "../sharedUi/SharedModal";
import GalleryHero from "./galleryhero/GalleryHero";
import MobileSwiper from "./MobileSwiper";
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page";

export default function HeroProperty({
  singlePropertyData,
}: {
  singlePropertyData?: SinglePropertyResponse;
}) {
  const images = singlePropertyData?.images || [];
  const remainingCount = Math.max(images.length - 2, 0);

  return (
    <div className="h-fit">
      {/* 🖥️ Desktop layout */}
      <div className="hidden gap-6 pt-8 xl:flex">
        {singlePropertyData && (
          <div className="h-149 w-[62%] relative overflow-hidden">
            <ImageWithSkeleton
              src={singlePropertyData?.cover}
              alt="property-cover"
              width={1024}
              height={1080}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex w-[38%] flex-col gap-6">
          {images.slice(0, 2).map((img, idx) => (
            <div key={idx} className="relative w-full overflow-hidden">
              <ImageWithSkeleton
                src={img}
                alt={`property-img-${idx}`}
                width={2000}
                height={286}
                className="h-[286px] w-full object-cover"
              />

              {idx === 1 && remainingCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <SharedModal>
                    {/* الزر فوق الصورة */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[2rem] font-semibold cursor-pointer transition hover:bg-black/60">
                      +{remainingCount}
                    </div>
                    {/* محتوى المودال */}
                    <GalleryHero data={images} />
                  </SharedModal>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 📱 Mobile layout */}
      <div className="block xl:hidden py-5 w-full aspect-[4/3]">
        {singlePropertyData && <MobileSwiper data={images} />}
      </div>
    </div>
  );
}

function ImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-full h-full" suppressHydrationWarning>
      {/* skeleton يظهر فقط بعد ما الصفحة تتحمّل في الكلاينت */}
      {isClient && !isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={75}
        priority
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

