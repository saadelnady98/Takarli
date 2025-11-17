import { fetchPageData } from "@/lib/api-fetcher";
import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type TermsData = {
  id: number;
  text: string;
  info: string;
  meta_description: string | null;
  meta_keywords: string | null;
  created_at: string;
  updated_at: string;
};

export const metadata: Metadata = {
  title: "Terms & Conditions | Takarli & Co",
  description:
    "Takarli & Co Real Estate Terms & Conditions — Understand the terms and conditions of our platform.",
};

export default async function TermsPage() {
  const t = await getTranslations("terms");
  const { data } = await fetchPageData<TermsData>("/terms");

  return (
    <main className="text-dark flex flex-col items-center lg:gap-8 gap-4 lg:pt-8 pt-4 lg:pb-24 pb-12 container-padding">
      <h1 className=" lg:text-4xl sm:text-3xl text-2xl text-center text-dark">
        {data.text}
      </h1>

      {data.meta_description && (
        <p className="text-text-darker lg:text-xl sm:text-lg text-sm font-light text-center max-w-4xl">
          {data.meta_description}
        </p>
      )}

      <article
        className="flex flex-col gap-4 w-full text-dark-grey lg:text-xl sm:text-lg text-sm font-light"
        dangerouslySetInnerHTML={{ __html: data.info }}
      />

      <span className="text-dark/70 lg:text-xl sm:text-lg text-sm text-start me-auto">
        {t("lastUpdated")}: {data.updated_at}
      </span>
    </main>
  );
}
