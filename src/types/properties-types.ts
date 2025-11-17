export type PropertiesClientProps = {
  locale: string
  propertySlug: string
  page: number
  per_page: number
}

export type Property = {
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

export type PropertiesPageData = {
  country: {
    id: number
    slug: string
    name: string
    description?: string
  }
  properties: Property[]
}
