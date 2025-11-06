"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Developer, DevelopersCardProps } from "./types";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const DevelopersCard = ({ developer }: DevelopersCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const t = useTranslations("developers");

  const { image, name, description, slug }: Developer = developer;
  const fallbackImage = "/assets/homepage/pic-1.svg";

  return (
    <div className="border border-border2 overflow-hidden">
      <div className="relative h-[250px] w-full ">
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
          src={image ?? fallbackImage}
          alt={name || "Developer image"}
          width={600}
          height={800}
          priority
          quality={75}
          onLoad={() => setIsImageLoaded(true)}
          className={`h-full w-full object-contain transition-opacity duration-500 ease-in-out px-4 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="px-4 py-6 flex flex-col gap-4">
        <h3 className="text-dark-grey font-[galleds] text-[2.5rem] font-normal">
          {name}
        </h3>
        <p className="text-dark-grey text-1  font-light line-clamp-4 min-h-24">
          {description}
        </p>
        <Link
          href={`/developers/${slug}`}
          className="bg-dark text-white font-extralight font-[galleds] lg:text-sm text-xs px-4 py-2 rounded-none w-fit hover:bg-gray-800 transition-colors"
        >
          {t("discoverMore")}
        </Link>
      </div>
    </div>
  );
};

export default DevelopersCard;
