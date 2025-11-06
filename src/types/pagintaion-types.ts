export interface PaginationMeta {
  per_page: number
  total: number
  current_page: number
  path: string
  next_page_url: string | null
  previous_page_url: string | null
  last_page: number
  has_more_pages: boolean
}


export interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}