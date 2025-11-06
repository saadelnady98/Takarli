export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const pathnames = {
  "/": "/",
  "/about-us": {
    en: "/about-us",
    fr: "/à-propos",
  },
  "/privacy": {
    en: "/privacy",
    fr: "/Confidentialité",
  },
  "/uae": {
    en: "/uae",
    fr: "/uae",
  },
  "/monaco": {
    en: "/monaco",
    fr: "/monaco",
  },
  "/contact-us": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
  "/terms": {
    en: "/terms",
    fr: "/conditions-generales",
  },
  "/developers": {
    en: "/developers",
    fr: "/développeurs",
  },
  "/blogs": {
    en: "/blogs",
    fr: "/blogs",
  },
  "/faqs": {
    en: "/faqs",
    fr: "/faqs",
  },
  "/talk-to-expert": {
    en: "/talk-to-expert",
    fr: "/parler-a-un-expert",
  },
} as const;