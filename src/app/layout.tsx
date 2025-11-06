import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: {
    default: "Takarli",
    template: "%s | Takarli",
  },
  description: "Your Gateway to Luxury Properties in UAE and Monaco.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body suppressHydrationWarning className="font-galleds antialiased">
        {children}
      </body>
    </html>
  );
}
