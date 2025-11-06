"use client";
import { PaginationProps } from "@/types/pagintaion-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange
}: PaginationProps) {
  const t = useTranslations("pagination")
  
  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;

  const getVisiblePages = (): number[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: number[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-6 mb-10 flex items-center justify-center gap-2 select-none max-[350px]:flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={`
          flex items-center justify-center h-10 px-4 border border-gray-300 
          text-sm font-medium transition-colors min-w-[100px]
          ${canGoPrevious
            ? "text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            : "text-gray-400 bg-gray-100 cursor-not-allowed"
          }
        `}
      >
        <ChevronLeft size={16} className="mr-1" />
        {t("previous")}
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              flex items-center justify-center h-10 w-10 border 
              text-sm font-medium transition-colors
              ${page === currentPage
                ? "bg-black text-white border-black cursor-pointer"
                : "border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`
          flex items-center justify-center h-10 px-4 border border-gray-300 
          text-sm font-medium transition-colors min-w-[100px]
          ${canGoNext
            ? "text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            : "text-gray-400 bg-gray-100 cursor-not-allowed"
          }
        `}
      >
        {t("next")}
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
}