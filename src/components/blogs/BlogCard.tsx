"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types/blog-types";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface BlogCardComponentProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardComponentProps) {
  const t = useTranslations("blogs");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const fallbackImage = "/assets/logo/logo-footer.png";

  return (
    <div className="flex h-fit w-full flex-col lg:gap-4 gap-2">
      {/* صورة المقال */}
      <div className="relative lg:h-54 h-40 w-full bg-gray-100 overflow-hidden">
        {/* لودر مؤقت قبل تحميل الصورة */}
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
          src={blog.image ?? fallbackImage}
          alt={blog.title}
          width={500}
          height={300}
          priority
          onLoad={() => setIsImageLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* تفاصيل المقال */}
      <div className="flex h-full w-full flex-col lg:gap-4 gap-2">
        <h5 className=" lg:text-2xl text-lg lg:leading-8 min-h-16 line-clamp-2">
          {blog.title}
        </h5>

        <p className="text-text-darker  lg:text-base text-sm font-light lg:w-3/4 line-clamp-4 min-h-24">
          {blog.short_description}
        </p>

        <Link
          href={`/blogs/${blog.slug}`}
          className="bg-dark text-white font-extralight  lg:text-sm text-xs px-4 py-2 rounded-none w-fit hover:bg-gray-800 transition-colors"
        >
          {t("discoverMore")}
        </Link>
      </div>
    </div>
  );
}
