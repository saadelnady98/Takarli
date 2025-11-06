"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import { useTranslations } from "next-intl";

export default function LoadingOverlay() {
  // const t = useTranslations("LoadingOverlay");

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/assets/logo/logo-footer.png" 
            alt="Logo"
            width={250}
            height={250}
            className="object-contain max-sm:w-[150px] max-sm:h-[150px]"
            priority
          />
        </motion.div>

        {/* <p className="mt-4 text-dark lg:text-2xl text-lg font-semibold">
          {t("loading")}
        </p> */}
      </div>
    </div>
  );
}
