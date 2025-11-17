"use client";
import { usePagination } from "@/hooks/use-pagination";
import { BlogsSection } from "./BlogsSection";
import { BlogCardList } from "./blog-card-list";
import Pagination from "@/components/sharedUi/Pagenation/Pagenation";
import { Blog } from "@/types/blog-types";
import { useEffect, useState } from "react";
import LoadingOverlay from "../loading/loading";
import GenericHeader from "@/components/sharedUi/generic-header";
import { useTranslations } from "next-intl";

interface BlogPageContentProps {
  latestBlogs: Blog[];
  moreBlogs: Blog[];
  currentPage: number;
  totalPages: number;
}

export function BlogPageContent({
  latestBlogs,
  moreBlogs,
  currentPage,
  totalPages
}: BlogPageContentProps) {
  const { handlePageChange } = usePagination();
  const [isNavigating, setIsNavigating] = useState(false);
  const t = useTranslations("blogs");
  const handlePageChangeWithLoading = (page: number) => {
    setIsNavigating(true);
    handlePageChange(page);
  };

  useEffect(() => {
    setIsNavigating(false);
  }, [currentPage]);

  if (isNavigating) {
    return (
      <LoadingOverlay />
    );
  }

  return (

    <div className="lg:mt-12 mt-6 lg:mb-24 mb-12 flex w-full flex-col items-center lg:gap-12 gap-6 container-padding ">
      <GenericHeader
        title={t("title")}
        span={t("span")}
        image="/assets/single-property/img-5.webp"
        altText={t("alt")}
        darkOverlay
      />
      <>
        <h1 className="lg:text-5xl sm:text-3xl text-2xl text-dark text-center">
          {t("latestBlogs")}
        </h1>

        <BlogsSection blogs={latestBlogs} />

        <h2 className="lg:text-5xl sm:text-3xl text-2xl text-dark text-center mt-12">
          {t("moreBlogs")}
        </h2>

        <BlogCardList blogs={moreBlogs} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChangeWithLoading}
          />
        )}
      </>
    </div>
  );
}