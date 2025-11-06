"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"
import { MoveLeft, MoveRight } from "lucide-react"
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page"
import Link from "next/link"

// Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useTranslations } from "next-intl"

export default function SinglePropertySwiper({
  singlePropertyData,
}: {
  singlePropertyData?: SinglePropertyResponse
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const t = useTranslations("singleProperty")

  const floor = singlePropertyData?.floor
  const apartments = floor?.apartments

  if (!floor) return null

  return (
    <div className="flex flex-col gap-6 lg:gap-10 pt-0 lg:pt-6 px-4 lg:px-0">
      {/* Navigation */}
      <div className="flex items-center justify-end gap-2">
        <button
          ref={prevRef}
          onClick={() => swiperInstance?.slidePrev()}
          className="border-border text-dark flex h-10 w-10 lg:h-8 lg:w-8 items-center justify-center rounded-full border hover:bg-gray-100 transition-colors active:scale-95"
          aria-label={t("previousSlide")}
        >
          <MoveLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        <button
          ref={nextRef}
          onClick={() => swiperInstance?.slideNext()}
          className="border-border text-dark flex h-10 w-10 lg:h-8 lg:w-8 items-center justify-center rounded-full border hover:bg-gray-100 transition-colors active:scale-95"
          aria-label={t("nextSlide")}
        >
          <MoveRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>

      {/* Swiper Section */}
      <div className="flex flex-col items-start justify-between">
        <Swiper
          modules={[Navigation]}
          onSwiper={setSwiperInstance}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean") {
              const navigation = swiper.params.navigation
              if (navigation) {
                navigation.prevEl = prevRef.current
                navigation.nextEl = nextRef.current
              }
            }
          }}
          spaceBetween={20}
          slidesPerView={1}
          className="pb-12 w-full"
          touchRatio={1.5}
          grabCursor={true}
        >
          {apartments?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col lg:flex-row justify-between gap-6 text-start">
                {/* Left Side (Details) */}
                <div className="flex w-full flex-col gap-4 lg:w-1/2 order-2 lg:order-1">

                  {/* Header Info */}
                  {(item?.title || item?.type) && (
                    <div className="rounded-lg">
                      {item?.title && (
                        <h3 className="text-dark font-bold text-lg lg:text-xl mb-2">
                          {item.title}
                        </h3>
                      )}
                      {item?.type && (
                        <p className="text-dark-grey text-sm">
                          <span className="font-medium text-dark">{t("type")}:</span> {item.type}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Unit Description */}
                  {item?.unit_description && (
                    <div>
                      <p className="text-dark font-medium text-sm lg:text-base">{t("unitDescription")}:</p>
                      <p className="text-dark-grey text-sm lg:text-base">{item.unit_description}</p>
                    </div>
                  )}

                  {/* Rooms Count */}
                  {item?.rooms_count && (
                    <div>
                      <p className="text-dark font-medium text-sm lg:text-base">{t("roomsCount")}:</p>
                      <p className="text-dark-grey text-sm lg:text-base">
                        {item.rooms_count} {t("rooms")}
                      </p>
                    </div>
                  )}

                  {/* Suite Dimensions */}
                  {(item?.suite_length || item?.suite_width || item?.suite_area) && (
                    <div className="rounded">
                      <p className="text-dark font-semibold text-sm lg:text-base mb-2">{t("suiteDimensions")}:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {item?.suite_length && (
                          <div>
                            <p className="text-dark font-medium">{t("length")}:</p>
                            <p className="text-dark-grey">{item.suite_length} ft</p>
                          </div>
                        )}
                        {item?.suite_width && (
                          <div>
                            <p className="text-dark font-medium">{t("width")}:</p>
                            <p className="text-dark-grey">{item.suite_width} ft</p>
                          </div>
                        )}
                      </div>
                      {item?.suite_area && (
                        <div className="mt-2">
                          <p className="text-dark font-medium">{t("suiteArea")}:</p>
                          <p className="text-dark-grey font-semibold">{item.suite_area} sq.ft.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Balcony Dimensions */}
                  {(item?.balcony_length || item?.balcony_width || item?.balcony_area) && (
                    <div className="rounded">
                      <p className="text-dark font-semibold text-sm lg:text-base mb-2">{t("balconyDimensions")}:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {item?.balcony_length && (
                          <div>
                            <p className="text-dark font-medium">{t("length")}:</p>
                            <p className="text-dark-grey">{item.balcony_length} ft</p>
                          </div>
                        )}
                        {item?.balcony_width && (
                          <div>
                            <p className="text-dark font-medium">{t("width")}:</p>
                            <p className="text-dark-grey">{item.balcony_width} ft</p>
                          </div>
                        )}
                      </div>
                      {item?.balcony_area && (
                        <div className="mt-2">
                          <p className="text-dark font-medium">{t("balconyArea")}:</p>
                          <p className="text-dark-grey font-semibold">{item.balcony_area} sq.ft.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Total Area */}
                  {item?.total_area && (
                    <div className="rounded">
                      <p className="text-dark font-semibold text-sm lg:text-base">{t("totalArea")}:</p>
                      <p className="text-dark-grey text-lg font-bold">{item.total_area} sq.ft.</p>
                    </div>
                  )}

                  {/* Rooms Details */}
                  {item?.rooms?.length > 0 && (
                    <div className="rounded">
                      <p className="text-dark font-semibold text-sm lg:text-base mb-2">{t("roomDetails")}:</p>
                      {item.rooms.map((room) => (
                        (room?.name || room?.length || room?.width || room?.area) && (
                          <div key={room.id} className="mb-3 last:mb-0 rounded">
                            {room?.name && <p className="text-dark font-medium text-sm">{room.name}</p>}
                            <div className="grid grid-cols-3 gap-2 text-xs mt-1">
                              {room?.length && <p className="text-dark-grey">{t("length")}: {room.length} ft</p>}
                              {room?.width && <p className="text-dark-grey">{t("width")}: {room.width} ft</p>}
                              {room?.area && <p className="text-dark-grey">{t("area")}: {room.area} sq.ft.</p>}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side (Image) */}
                <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[600px] order-1 lg:order-2">
                  <Image
                    src={item.image}
                    alt={`${item.title} - ${item.type}`}
                    width={800}
                    height={800}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Download Button */}
      {floor.pdf_file && (
        <Link
          href={floor.pdf_file}
          className="bg-dark sm:w-fit text-center px-6 lg:px-8 py-3 text-white hover:opacity-90 transition-opacity text-sm lg:text-base rounded"
        >
          {t("downloadFloorPlan")}
        </Link>
      )}
    </div>
  )
}
