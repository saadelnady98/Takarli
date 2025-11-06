// lib/hooks/use-fetch-pages.ts
"use client"; 
import { useQuery, UseQueryResult } from "@tanstack/react-query"; 
// import { toast } from "sonner"; 
import { fetchPageData } from "@/lib/api-fetcher"; 
import { PaginatedResponse, ApiError, Pagination } from "@/types/api";
import { useLangCurr } from "@/context/langCurrContext";

export type { PaginatedResponse, Pagination, ApiError }; 
export function usePageData<T>(
  endpoint: string,
  params?: Record<string, unknown>,
  enabled = true
): UseQueryResult<PaginatedResponse<T>, Error> {
  const { language, currency } = useLangCurr(); 

  return useQuery<PaginatedResponse<T>, Error>({
    queryKey: ["pageData", endpoint, params, language, currency],    
    queryFn: async (): Promise<PaginatedResponse<T>> => {
      try {
        const response = await fetchPageData<T>(endpoint, params);
        return response;
      } catch (error) {
        // toast.error(
        //   (error as Error).message ||
        //     "Something went wrong while fetching data"
        // );
        throw error;
      }
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}