/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import React from "react"
 import HomePropertySwiper from "@/components/sharedUi/homePropertyswiper/HomePropertySwiper"
import { serverApiClient } from "@/lib/new-api-client"
import GenericHeader from "@/components/sharedUi/generic-header"

export default async function page({ params }: { params: { slug: any } }) {
  const { slug } = params
  const { data } = await serverApiClient.get<{ data: any }>(`/developer/${slug}`)
  const response = data.data
  const img = response.image ?? '/assets/logo/logo-footer.png'
  const similarProperties = response.similar_properties
  const fallbackImage = '/assets/homepage/pic-1.svg';

  return (
    <div className="flex flex-col lg:gap-11 gap-6">
      <div className="mx-auto flex w-full items-center justify-center border-b border-b-gray-300 ">
        <div className="h-[180px] w-[250px]">
          <Image
            src={img ?? fallbackImage}
            alt="imtiaz"
            width={1024}
            height={1080}
            className="h-full w-full object-contain"
            priority
            quality={75}
          />
        </div>
      </div>

      <div className="container-padding  mb-10 ">
        <div className="flex flex-col items-center lg:gap-7.5 gap-4">
          {/* <h3 className="text-dark-grey lg:text-xl font-sans text-lg ">Description</h3> */}
          <p className="text-dark font-[galleds] lg:text-5xl text-3xl ">{response.name}</p>
          <p className="text-dark-grey text-center lg:text-xl font-sanstext-lg">{response.description}</p>
         
          <GenericHeader
            title="Properties"
            span={response.name}
            image={"/assets/single-property/img-5.svg"}
            altText="Developers page background"
            darkOverlay
          />
        {similarProperties?.length > 0 && <HomePropertySwiper PropertyCards={similarProperties} className="w-full" />}
        </div>
      </div>
    </div>
  )
}
