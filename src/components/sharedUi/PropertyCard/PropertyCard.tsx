"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PropertyCardProps } from "./types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function PropertyCard({
  data,
  align = "left",
}: PropertyCardProps & { align?: "left" | "center" }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const fallbackImage = "/assets/homepage/pic-1.svg";
  const propertyUrl = data.slug
    ? `/${data.country?.slug}/${data.slug}`
    : `/${data.country?.slug}/${data.id}`;

  return (
    <Link
      href={propertyUrl}
      className="group relative block w-full overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-xl"
    >
      {/* الصورة */}
      <div className="aspect-[3/4] w-full relative bg-gray-100">
        {/* لودر قبل تحميل الصورة */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 className="w-8 h-8 text-gray-500" />
            </motion.div>
          </div>
        )}

        <Image
          src={data?.cover || data?.image || fallbackImage}
          alt={data?.name ?? "Property listing image"}
          width={600}
          height={800}
          quality={100}
          priority
          onLoad={() => setIsImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 ease-in-out brightness-80 group-hover:brightness-100 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* تأثير overlay */}
        <div className="absolute inset-0 bg-black/20 transition-all duration-500 ease-in-out group-hover:bg-black/10" />
      </div>

      {/* النصوص فوق الصورة */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-4 lg:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${
          align === "center" ? "items-center text-center" : "items-start"
        }`}
      >
        {(data.name || data.title) && (
          <h5 className="font-[galleds] text-lg font-semibold text-white lg:text-2xl">
            {data?.name || data?.title}
          </h5>
        )}

        {data.area && (
          <div
            className={`mt-1 flex items-center gap-1.5 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            <p className="text-xs font-light text-white/90 lg:text-sm">
              {data.area}
            </p>
          </div>
        )}

        {data.starting_price && (
          <p className="mt-2 text-base font-bold text-white lg:text-xl">
            {data.currency + " " + data.starting_price}
          </p>
        )}
      </div>
    </Link>
  );
}
