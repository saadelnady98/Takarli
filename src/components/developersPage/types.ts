

export type Developer = {
  id: number
  name: string
  slug: string
  description?: string | null
  image: string
}


export interface DevelopersCardProps {
   developer: Developer
}