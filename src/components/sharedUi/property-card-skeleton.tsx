"use client"

import React from "react"

export default function PropertyCardSkeleton() {
  return (
    <div className="group relative block w-full overflow-hidden rounded-2xl shadow-md animate-pulse">
      <div className="aspect-[3/4] w-full shimmer " />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 lg:p-6">
        <div className="h-5 w-3/4 rounded bg-gray-300 mb-2"></div>
        <div className="h-3 w-1/2 rounded bg-gray-300 mb-3"></div>
        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
      </div>
    </div>
  )
}
