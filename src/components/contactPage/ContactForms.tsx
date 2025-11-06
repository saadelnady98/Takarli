"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldInput } from "@/components/forms/form-field-inputs";
import { Loader2 } from "lucide-react";
import { useSendContact } from "@/hooks/use-send-contact";
import { useContactSchema, } from "@/components/contactPage/validations/contact-validations";
import { useTranslations } from "next-intl";
import { ContactFormData } from "./types";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const schema = useContactSchema();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const { sendContact } = useSendContact(false, "");
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ContactFormData) => {
    await sendContact(values);
    reset();
  };

  return (
    <section className="mx-auto w-full border border-[rgba(169,169,169,1)] p-5.25 lg:p-6">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 lg:gap-6" noValidate>
          <div className="flex gap-5 max-lg:flex-col lg:gap-6">
            <FormFieldInput
              control={control}
              name="firstName"
              label={t("firstNameLabel")}
              placeholder={t("firstNamePlaceholder")}
            />
            <FormFieldInput
              control={control}
              name="lastName"
              label={t("lastNameLabel")}
              placeholder={t("lastNamePlaceholder")}
            />
          </div>

          <FormFieldInput
            control={control}
            name="email"
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            type="email"
          />

          <FormFieldInput
            control={control}
            name="message"
            label={t("messageLabel")}
            placeholder={t("messagePlaceholder")}
            type="textarea"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-dark flex min-h-[33px] w-full cursor-pointer items-center justify-center gap-2 rounded-none px-7 py-4 text-sm text-white lg:min-h-[55px] lg:text-lg lg:font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> {t("sending")}
              </>
            ) : (
              t("send")
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
