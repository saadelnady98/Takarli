import localFont from "next/font/local";
import type { Metadata } from "next";

import "./globals.css";

if (typeof window !== "undefined") {
  import("leaflet/dist/leaflet.css");
}

const galledsStars = localFont({
  src: [
    {
      path: './fonts/GalledsStars.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-galleds-stars',
  display: 'swap',
  preload: true, 
  adjustFontFallback: false, 
});

export const metadata: Metadata = {
  title: {
    default: "Takarli",
    template: "%s | Takarli",
  },
  description: "Your Gateway to Luxury Properties in UAE and Monaco.",
  keywords: ["luxury properties", "UAE", "Monaco", "real estate"],
  robots: "index, follow",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Takarli',
  },
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${galledsStars.variable} ${galledsStars.className} antialiased min-h-screen bg-background `}
      >
        {children}
      </body>
    </html>
  );
}
