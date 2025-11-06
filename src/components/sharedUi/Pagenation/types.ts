export type PaginationMeta = {
  current_page: number
  has_more_pages: boolean
  last_page: number
  next_page_url: string | null
  previous_page_url: string | null
  path: string
  per_page: number
  total: number
}
