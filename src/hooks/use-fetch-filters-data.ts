import { useLangCurr } from "@/context/langCurrContext"
import { serverApiClient } from "@/lib/new-api-client"
import { ApiResponse } from "@/types/api"
import { useQuery } from "@tanstack/react-query"

export function useFetchFilter<T = unknown>(
  endpoint: string,
  enabled: boolean = true
) {
  const { language, currency } = useLangCurr()

 const query = useQuery<T[], Error>({
  queryKey: ["filter", endpoint, language, currency],
  queryFn: async () => {
    if (!endpoint) return [] as T[];
    const res = await serverApiClient.get<ApiResponse<T[]>>(endpoint);
    return res.data?.data ?? [];
  },
  enabled,
  retry: 1,
  staleTime: 1000 * 60,
});


  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  }
}
