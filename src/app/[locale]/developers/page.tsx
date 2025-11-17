import { redirect } from "next/navigation"
import { fetchPageData } from "@/lib/api-fetcher"
import DevelopersList from "@/components/developersPage/DevelopersList"
import { Developer } from "@/components/developersPage/types"
import { Suspense } from "react"
import GenericHeader from "@/components/sharedUi/generic-header"
import { getTranslations } from "next-intl/server"

interface DevelopersPageProps {
  params: { locale: string }
  searchParams: { page?: string }
}

function DevelopersLoading() {
  return (
    <div className="container-padding mt-11 gap-[2.5rem]">
      <div className="animate-pulse">
        <div className="mb-8 h-64 rounded bg-gray-200"></div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-200">
              <div className="h-48 bg-gray-200"></div>
              <div className="space-y-3 p-4">
                <div className="h-6 rounded bg-gray-200"></div>
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function DevelopersPage({ params, searchParams }: DevelopersPageProps) {
  const resolvedSearchParams = await searchParams

  const t = await getTranslations("developers")

  let currentPage = parseInt(resolvedSearchParams.page || "1")
  if (currentPage < 1 || isNaN(currentPage)) {
    currentPage = 1
  }

  const perPage = 8

  try {
    // إضافة timeout للطلب
    const developersResponse = await Promise.race([
      fetchPageData<Developer[]>("/developer", {
        per_page: perPage,
        page: currentPage,
      }),
      new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 10000),
      ),
    ])

    if (!developersResponse || !developersResponse.data) {
      throw new Error("Invalid API response")
    }

    const totalPages = developersResponse.pagination?.last_page || 1

    if (currentPage > totalPages && totalPages > 0) {
      redirect(`/${params.locale}/developers?page=1`)
    }

    return (
      <div className="container-padding mt-11 gap-[2.5rem]">
        <GenericHeader
          title={t("headerTitle")}
          span={t("headerSpan")}
          image={"/assets/single-property/img-5.webp"}
          altText="Developers page background"
          darkOverlay
        />
        <Suspense fallback={<DevelopersLoading />}>
          <DevelopersList
            developers={developersResponse.data}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error("Error fetching developers:", error)
    redirect(`/${params.locale}/developers?page=1`)
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: "Developers",
    description: "Browse our list of developers",
  }
}
