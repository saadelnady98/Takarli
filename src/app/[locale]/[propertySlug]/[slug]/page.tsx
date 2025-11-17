import HeroProperty from "@/components/singleProperty/HeroProperty"
import React from "react"
import SinglePropertyTitle from "@/components/singleProperty/SinglePropertyTitle"
import SinglePropertyDes from "@/components/singleProperty/SinglePropertyDes"
import SinglePropertyFeatures from "@/components/singleProperty/SinglePropertyFeatures"
import SinglePropertyFloor from "@/components/singleProperty/SinglePropertyFloor"
import SinglePropertyMapSection from "@/components/singleProperty/SinglePropertyMap"
import SinglePropertySimiler from "@/components/singleProperty/SinglePropertySimiler"
import AgentCard from "@/components/singleProperty/AgentCard"
import { fetchPageData } from "@/lib/api-fetcher"

type PropertyImage = string

type MapData = {
  id: number
  slug: string
  title: string
  country: string
  city: string
  area: string
  beds: number
  baths: number
  lat: number
  lng: number
  image: PropertyImage
}

type Developer = {
  id: number
  slug: string
  name: string
  image: PropertyImage
  description: string
}

type Amenity = {
  id: number
  name: string
  image: PropertyImage
}

type SimilarProperty = {
  id: number
  slug: string
  name: string
  category: string
  starting_price: string
  currency: string
  city: string
  area: string
  cover: PropertyImage
}

export type Room = {
  id: number
  name: string
  length: string
  width: string
  area: string
}

export type Apartment = {
  id: number
  type: string
  title: string
  unit_description: string
  rooms_count: number
  suite_length: string
  suite_width: string
  suite_area: string
  balcony_length: string
  balcony_width: string
  balcony_area: string
  total_area: string
  image: string
  rooms: Room[]
}

export type FloorData = {
  id: number
  name: string
  number: number
  total_apartments: number
  pdf_file: string
  apartments: Apartment[]
}

export type SinglePropertyResponse = {
  id: number
  slug: string
  name: string
  description: string
  starting_price: string
  currency: string
  handover_date: string | null
  address: string
  maps: MapData
  developer: Developer
  country: string
  city: string
  area: string
  Property_size: number
  bedroom_count: number
  bathroom_count: number
  furnished: string
  property_type: string
  category: { id: number; name: string }
  images: PropertyImage[]
  amenities: Amenity[]
  similar_properties: SimilarProperty[]
  cover: PropertyImage
  floor: FloorData | null
}

export default async function Page({ params }: { params: { slug: string } }) {
  const param = await params
  const slug = param.slug

  const { data } = await fetchPageData<SinglePropertyResponse>(`property/${slug}`)
  const singlePropertyData = data

  return (
    <div className="container-padding flex flex-col gap-5 lg:gap-8">
      <div className="block">
        <HeroProperty singlePropertyData={singlePropertyData} />
      </div>

      <div className="flex w-full gap-6">
        <div className="flex w-full flex-col gap-5 lg:gap-8 xl:w-[60%]">
          <SinglePropertyTitle singlePropertyData={singlePropertyData} />
          <span className="block w-full border-b-1 border-[rgba(210,210,210,1)]" />
          <SinglePropertyDes singlePropertyData={singlePropertyData} />
          <span className="block w-full border-b-1 border-[rgba(210,210,210,1)]" />
          <SinglePropertyFeatures singlePropertyData={singlePropertyData} />
          <SinglePropertyFloor singlePropertyData={singlePropertyData} />
          <span className="block w-full border-b-1 border-[rgba(210,210,210,1)]" />
          <SinglePropertyMapSection singlePropertyData={singlePropertyData} />
          <span className="block w-full border-b-1 border-[rgba(210,210,210,1)]" />
        </div>

        <div className="hidden xl:block xl:w-[38%]">
          <AgentCard
            singlePropertyData={singlePropertyData}
            propertyId={singlePropertyData?.id?.toString()}
          />
        </div>
      </div>

      <SinglePropertySimiler singlePropertyData={singlePropertyData} />
    </div>
  )
}
