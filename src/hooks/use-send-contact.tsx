"use client"

import { toast } from "sonner"
import { serverApiClient } from "@/lib/new-api-client"
import type { AxiosError } from "axios"
import { ContactFormData } from "@/components/contactPage/types"

export function useSendContact(agent = false, propertyId: string) {
  const sendContact = async (values: ContactFormData) => {
    try {
      const formData = new FormData()
      formData.append("firstName", values.firstName)
      formData.append("lastName", values.lastName)
      formData.append("email", values.email)
      formData.append("message", values.message)


      agent && propertyId && formData.append("property", propertyId)

      agent
        ? await serverApiClient.post("/propertyrequest", formData)
        : await serverApiClient.post("/contacts", formData)

      toast.success("Message sent successfully!")
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>
      const errorMessage = err.response?.data?.message || "Failed to send message"
      toast.error(errorMessage)
    }
  }

  return { sendContact }
}
