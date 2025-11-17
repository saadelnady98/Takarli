// components/developersPage/DevelopersList.tsx
"use client"

import React, { useEffect, useState, useCallback, memo, useMemo } from "react"
import { usePagination } from "@/hooks/use-pagination"
import DevelopersCard from "@/components/developersPage/DevelopersCard"
import Pagination from "@/components/sharedUi/Pagenation/Pagenation"
import { Developer } from "./types"
import LoadingOverlay from "../loading/loading"
import { useTranslations } from "next-intl"

interface DevelopersListProps {
  developers: Developer[]
  currentPage: number
  totalPages: number
}

const DevelopersList = memo(function DevelopersList({ 
  developers, 
  currentPage, 
  totalPages 
}: DevelopersListProps) {
  const t = useTranslations("developers")
  const { handlePageChange } = usePagination()
  const [isNavigating, setIsNavigating] = useState(false)

   const memoizedDevelopers = useMemo(() => developers, [developers])

  const handlePageChangeWithLoading = useCallback((page: number) => {
    if (page !== currentPage) {
      setIsNavigating(true)
      handlePageChange(page)
    }
  }, [handlePageChange, currentPage])

  useEffect(() => {
    setIsNavigating(false)
  }, [currentPage])

   const developersCards = useMemo(() => (
    memoizedDevelopers.map((developer) => (
      <DevelopersCard 
        key={developer.id} 
        developer={developer} 
      />
    ))
  ), [memoizedDevelopers])

  if (isNavigating) {
    return <LoadingOverlay />
  }

  return (
    <div >
    
      
      <div className="my-11 grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-0 xl:grid-cols-3 2xl:grid-cols-4">
        {developersCards}
      </div>

      {memoizedDevelopers.length === 0 && (
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
})

export default DevelopersList