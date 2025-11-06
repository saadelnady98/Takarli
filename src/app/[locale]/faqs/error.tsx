"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-3">
      <h2 className="text-red-500 text-xl font-semibold">
        {t("title")}
      </h2>

      <p className="text-gray-600">
        {error.message || t("defaultMessage")}
      </p>

      <button
        onClick={() => reset()}
        className="bg-dark text-white px-4 py-2 rounded-none hover:bg-dark/80 transition-all mt-2 cursor-pointer"
      >
        {t("tryAgain")}
      </button>
    </div>
  );
}
