import { AxiosError } from "axios"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import Providers from "../providers"
import Footer from "@/components/Footer"
import { Toaster } from "sonner"
import Navbar from "@/components/Navbar"
import { NavbarResponse } from "@/types/navbar-types"
import { serverApiClient } from "@/lib/new-api-client"
import { FooterApiResponse } from "@/types/footer"

const locales = ["en", "fr"]
export const revalidate = 3600
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) notFound()

  const messagesPromise = getMessages()

  const { data: navbar } = await serverApiClient.get<NavbarResponse>("/layout/navbar")
  const { data: footer } = await serverApiClient.get<FooterApiResponse>("/layout/footer")

  const messages = await messagesPromise

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <Navbar data={"data" in navbar ? navbar.data : null} />

        <main role="main">{children}</main>

        <Footer data={"data" in footer ? footer.data : null} />
        <Toaster />
      </Providers>
    </NextIntlClientProvider>
  )
}
