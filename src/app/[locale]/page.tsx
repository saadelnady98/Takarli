import React from "react"
import HeroHome from "@/components/HeroHome"
import AboutTakarli from "@/components/homePage/AboutTakarli"
import ContactHome from "@/components/homePage/ContactHome"
import HomeVilla from "@/components/homePage/HomeVilla"
import ReadyOffSection from "@/components/homePage/ReadyOffSection"
// import { OffPlanHome, ReadyHome, PropertyCards } from "@/data/data"
import { fetchPageData } from "@/lib/api-fetcher"
import { HomePageResponse } from "@/types/home-types"

export default async function Home() {
  const { data } = await fetchPageData<HomePageResponse>("home")

  return (
    <main className="relative flex w-full flex-col items-center justify-center gap-16 lg:gap-20">
      <HeroHome data={data} />
      <AboutTakarli data={data} />
     {data?.off_plan?.countries?.length > 0 && <ReadyOffSection sectionType="off_plan" data={data.off_plan} />}

      {data?.ready_to_move?.countries?.length > 0 && <ReadyOffSection sectionType="ready_to_move" data={data.ready_to_move} />}

      <HomeVilla data={data} />
      <ContactHome />
    </main>
  )
}
