"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormFieldInput } from "@/components/forms/form-field-inputs";
import { useSendContact } from "@/hooks/use-send-contact";
import { useContactSchema, } from "@/components/contactPage/validations/contact-validations";
import { useTranslations } from "next-intl";
import { ContactFormData } from "./contactPage/types";

export default function ContactForm({
  agent = false,
  propertyId = "",
}: {
  agent?: boolean;
  propertyId?: string;
}) {
  const pathname = usePathname();
  const isHome = ["/", "/en", "/fr"].includes(pathname);
  const t = useTranslations("contact.form");

  const contactSchema = useContactSchema();
  const { sendContact } = useSendContact(agent, propertyId);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ContactFormData) => {
    await sendContact(values);
    reset();
  };

  return (
    <section
      className={`mx-auto w-full ${isHome ? "border-none" : "border border-[rgba(169,169,169,1)] p-5.25 lg:p-6"
        }`}
    >
      <h3 className= {`${isHome ? "text-white" : "text-dark"}  text-2xl mb-5`}>
        {t("title")}
      </h3>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 lg:gap-6"
          noValidate
        >
          <div className={`flex gap-5 max-lg:flex-col lg:gap-6 ${agent ? "flex-col" : ""}`}>
            <FormFieldInput
              control={control}
              name="firstName"
              label={t("firstName")}
              placeholder={t("firstName")}
              isHome={isHome}
            />

            <FormFieldInput
              control={control}
              name="lastName"
              label={t("lastName")}
              placeholder={t("lastName")}
              isHome={isHome}
            />
          </div>

          <FormFieldInput
            control={control}
            name="email"
            label={t("email")}
            placeholder={t("email")}
            isHome={isHome}
            type="email"
          />

          <FormFieldInput
            control={control}
            name="message"
            label={t("message")}
            placeholder={t("message")}
            type="textarea"
            isHome={isHome}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`text-dark flex h-14 cursor-pointer items-center justify-center gap-2 rounded-none text-lg font-medium ${isHome ? "w-44 bg-white/80 transition-colors hover:bg-white" : "bg-dark w-full transition-colors hover:bg-gray-800 text-white"
              }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> {t("sending")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
