"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { useFilters } from "@/context/filters-context"
import { usePageData } from "@/hooks/use-fetch-pages"
import FilterBar from "@/components/sharedUi/Filters/FilterBar"
import PropertyCard from "@/components/sharedUi/PropertyCard/PropertyCard"
import Pagination from "@/components/sharedUi/Pagenation/Pagenation"
import { useTranslations } from "next-intl"
import LoadingOverlay from "../loading/loading"
import Error from "@/app/[locale]/[propertySlug]/error"

type PropertiesClientProps = {
  locale: string
  propertySlug: string
  page: number
  per_page: number
}
type Property = {
  id: number
  slug: string
  title: string
  starting_price: string
  currency: string
  area: string
  city: string
  country: {
    id: number
    name: string
    slug: string
  }
  image: string
}

type PropertiesPageData = {
  country: {
    id: number
    slug: string
    name: string
    description?: string
  }
  properties: Property[]
}
export default function PropertiesClient({
  locale,
  propertySlug,
  page,
  per_page,
}: PropertiesClientProps) {
  const { filters } = useFilters()
  const [isNavigating, setIsNavigating] = useState(false)
  const t = useTranslations("properties")

  const queryParams: Record<string, string | number | undefined> = {
    page,
    per_page,
    country: filters.country?.slug || propertySlug,
    city: filters.city?.id,
    category: filters.category?.id,
    property_type: filters.property?.id,
    developer: filters.developers?.id,
    sort: filters.sort?.value,
    area: filters.area?.id,
  }

  if (filters.priceRange?.min != null && filters.priceRange?.max != null) {
    queryParams.price = `${filters.priceRange.min},${filters.priceRange.max}`
  }

const { data: response ,error,refetch} = usePageData<PropertiesPageData>(`/property`, queryParams);

  const handlePageChange = (page: number) => {
    setIsNavigating(true)
    redirect(`/${locale}/${propertySlug}?page=${page}`)
  }

  useEffect(() => setIsNavigating(false), [page])
// لو في خطأ → نعرض شاشة الخطأ
if (error) {
  return <Error error={error} reset={refetch} />
}

  if (isNavigating || !response) {
    return <LoadingOverlay />
  }

  const totalPages = response?.pagination?.last_page || 1

  return (
    <>
      <FilterBar />
      <div className="container-padding flex flex-col items-center gap-6 pt-4 pb-6 lg:pt-8 lg:pb-12">
        <h2 className="text-dark text-center text-2xl font-bold">
          {response?.data.country.name} {t("properties")}
        </h2>
        <p className="text-dark-grey m-auto text-center font-sans text-base lg:w-3/4 lg:text-xl">
          {response?.data.country.description}
        </p>
      </div>
      <div className="container-padding mt-4 mb-5 lg:mb-10">
        {response?.data?.properties?.length === 0 && (
          <main className="container-padding flex min-h-fit flex-col items-center justify-center gap-5 lg:gap-10">
            {/* <Image
              src="/assets/not-found.webp"
              quality={100}
              alt="not-found"
              width={326}
              height={263}
              className="object-contain"
            />

            <h1 className="text-center text-2xl capitalize lg:text-4xl">{t("title")}</h1> */}
            <h2 className="text-center text-2xl font-bold capitalize lg:text-[3rem]">
              {t("NoPropertiesFound")}
            </h2>
          </main>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {response?.data?.properties?.map((property: Property) => (
            <PropertyCard key={property.id} data={property} />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
      )}
    </>
  )
}
