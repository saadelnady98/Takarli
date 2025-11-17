/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import React, { Suspense } from "react"
import HomePropertySwiper from "@/components/sharedUi/homePropertyswiper/HomePropertySwiper"
import { serverApiClient } from "@/lib/new-api-client"
import GenericHeader from "@/components/sharedUi/generic-header"
import LoadingOverlay from "@/components/loading/loading"

export default async function page({ params }: { params: { slug: any } }) {
  const { slug } = params
  const { data } = await serverApiClient.get<{ data: any }>(`/developer/${slug}`)
  const response = data.data
  const img = response.image ?? "/assets/logo/logo-footer.png"
  const similarProperties = response.similar_properties
  const fallbackImage = "/assets/homepage/pic-1.svg"

  return (
    <div className="flex flex-col gap-6 lg:gap-11">
      <div className="mx-auto flex w-full items-center justify-center border-b border-b-gray-300">
        <div className="flex items-center justify-center border-b border-b-gray-300 py-6">
          <Image
            src={img ?? fallbackImage}
            alt={response.name}
            width={250}
            height={180}
            quality={65}
            priority
            fetchPriority="high"
            className="object-contain"
          />
        </div>
      </div>

      <div className="container-padding mb-10">
        <div className="flex flex-col items-center gap-4 lg:gap-7.5">
          {/* <h3 className="text-dark-grey lg:text-xl  text-lg ">Description</h3> */}
          <h3 className="text-dark text-3xl lg:text-5xl">{response.name}</h3>
          {response.description && (
            <p className="text-dark-grey text-center text-lg lg:text-xl">
              {response.description} 
            </p>
          )}

          <GenericHeader
            title="Properties"
            span={response.name}
            image={"/assets/single-property/img-5.webp"}
            altText="Developers page background"
            darkOverlay
            priority={false}
          />
          <Suspense fallback={<LoadingOverlay />}>
            {similarProperties?.length > 0 && (
              <HomePropertySwiper PropertyCards={similarProperties} className="w-full" />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
