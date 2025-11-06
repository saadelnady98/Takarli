// types/api.ts
export interface ApiError {
  message?: string;
  status?: number;
} 

export interface Pagination {
  per_page: number;
  path: string;
  total: number;
  current_page: number;
  next_page_url?: string | null;
  previous_page_url?: string | null;
  last_page: number;
  has_more_pages: boolean;
} 

export interface ApiResponse<T> {
  message: string;
  data: T;
  pagination?: Pagination;
  errors: string  | null | ApiError;
} 

export type PaginatedResponse<T> = {
  data: T;
  pagination?: Pagination;
};