// middleware.ts
import createMiddleware from "next-intl/middleware";
import { locales, pathnames } from "../config/navigation";
import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  console.log("Middleware is running for path:", request.nextUrl.pathname);

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: "en",
    localeDetection: true,
    localePrefix: "as-needed",
    pathnames,
  });

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};