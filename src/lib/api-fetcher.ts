// lib/api/fetcher.ts
import { AxiosError } from "axios"; 
import { ApiResponse, PaginatedResponse, ApiError } from "@/types/api";
import { serverApiClient } from "./new-api-client";

export async function fetchPageData<T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<PaginatedResponse<T>> {
  try {
    const response = await serverApiClient.get<ApiResponse<T>>(endpoint, {
      params,
    });
    
    const responseData = response.data;
    
    if (Array.isArray(responseData)) {
      return {
        data: responseData as unknown as T
      };
    }
    
    if (responseData && typeof responseData === 'object' && 'data' in responseData) {
      return {
        data: responseData.data,
        pagination: responseData.pagination
      };
    }
    
    return {
      data: responseData as T
    };
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    console.error("Failed to fetch data:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
}