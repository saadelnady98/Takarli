
"use client"

import React from "react"
import { HeroUIProvider } from "@heroui/react"
import { FiltersProvider } from "@/context/filters-context"
import { LangCurrProvider } from "@/context/langCurrContext"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ReactQueryProvider from "./react-query-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (

    <LangCurrProvider>
      <ReactQueryProvider>
        <HeroUIProvider>
          <FiltersProvider>
            {children}
          </FiltersProvider>
        </HeroUIProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryProvider>
    </LangCurrProvider>
  )
}