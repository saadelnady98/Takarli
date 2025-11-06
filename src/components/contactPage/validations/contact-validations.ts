"use client";

import * as z from "zod";
import { useTranslations } from "next-intl";

// Hook لإرجاع schema مترجم
export const useContactSchema = () => {
  const t = useTranslations("contact.form.validation");

  return z.object({
    firstName: z.string().min(2, { message: t("firstName") }),
    lastName: z.string().min(2, { message: t("lastName") }),
    email: z.string().email({ message: t("email") }),
    message: z.string().min(5, { message: t("message") }),
  });
};

