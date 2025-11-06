
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import Providers from "../providers"
import Footer from "@/components/Footer"
import { Toaster } from "sonner"
// import PageTransition from "@/components/sharedUi/page-transition"
import Navbar from "@/components/Navbar"
const locales = ["en", "fr"]


export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* <html lang={locale} className="scroll-smooth" suppressHydrationWarning> */}
      <main
        className={`min-h-screen bg-background font-sans antialiased`}        >
        <Providers>
          <div className="relative  flex min-h-screen flex-col">
            {/* <PageTransition> */}
              < Navbar />
              <main className="flex-1 w-full mx-auto ">
                {children}
              </main>
              <Footer />
            {/* </PageTransition> */}
          </div>
          <Toaster />
        </Providers>
      </main>
      {/* </html> */}
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}