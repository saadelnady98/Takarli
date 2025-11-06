"use client"

import React, { useEffect, useState } from "react"
import { usePagination } from "@/hooks/shared-pagintaion"
import DevelopersCard from "@/components/developersPage/DevelopersCard"
import Pagination from "@/components/sharedUi/Pagenation/Pagenation"
import GenericHeader from "@/components/sharedUi/generic-header"
import { Developer } from "./types"
import LoadingOverlay from "../loading/loading"
import { useTranslations } from "next-intl" // ✅ اضفناها

interface DevelopersListProps {
  developers: Developer[]
  currentPage: number,
  totalPages: number 
}

export default function DevelopersList({
  developers,
  currentPage,
  totalPages,
}: DevelopersListProps) {

  const t = useTranslations("developers")  

  const { handlePageChange } = usePagination()
  const [isNavigating, setIsNavigating] = useState(false);

  const handlePageChangeWithLoading = (page: number) => {
    setIsNavigating(true);
    handlePageChange(page);
  };

  useEffect(() => {
    setIsNavigating(false);
  }, [currentPage]);

  if (isNavigating) {
    return <LoadingOverlay/>
  }

  return (
    <div className="mt-11 gap-[2.5rem] container-padding">
      <GenericHeader
        title={t("headerTitle")}  
        span={t("headerSpan")}    
        image={"/assets/single-property/img-5.svg"}
        altText="Developers page background"
        darkOverlay
      />

      <div className="my-11 grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-0  xl:grid-cols-3 2xl:grid-cols-4">
        {developers.map((developer) => (
          <DevelopersCard key={developer.id} developer={developer} />
        ))}
      </div>

      {/* No Developers Message */}
      {developers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {t("noDevelopers")}     
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChangeWithLoading}
        />
      )}
    </div>
  )
}
