
interface country {
  id: number
  name: string
  slug: string
}
export interface PropertyCardsProps {
  id?: number | string
  name?: string
  title?: string
  area?: string
  starting_price?: string
  cover?: string
  image?: string
  currency?: string
  slug?: string
  category?: string
  country?: country
}
export interface PropertyCardProps {
  data: PropertyCardsProps
}
