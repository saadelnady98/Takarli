
import React from "react"
import { fetchPageData } from "@/lib/api-fetcher"
import { ContactResponse } from "@/components/contactPage/types"
import Contact from "@/components/contactPage/Index"

export default async function ContactPage() {
  const { data } = await fetchPageData<ContactResponse>("/contacts")

  return (
    <Contact data={data} />
  )
}
