import { fetchPageData } from "@/lib/api-fetcher"
import { FooterApiResponse } from "@/types/footer"

export async function getFooterData(): Promise<FooterApiResponse | null> {
  try {
    const res = await fetchPageData<FooterApiResponse>("/layout/footer")
    return res?.data ?? null
  } catch (error) {
    console.error("Failed to fetch footer data:", error)
    return null
  }
}
