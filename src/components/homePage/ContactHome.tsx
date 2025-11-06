import React from "react";
import ContactForm from "@/components/ContactForm";
import { useTranslations } from "next-intl";

export default function ContactHome() {
  const t = useTranslations("home");
  return (
    <div className="relative  mb-8 lg:min-h-200 min-h-fit bg-black  w-full container-padding bg-[url(/assets/homepage/home-contact-us-bg.svg)] bg-contain bg-right bg-no-repeat flex items-center py-16 ">
        <div className="flex flex-col lg:gap-4 gap-2">
            <h6 className="font-[galleds] text-white text-4xl "> {t("contactSectionTitle")}</h6>
            <p className="md:w-[80%] lg:text-xl text-base font-light text-wrap text-white capitalize mb-4">
              {t("contactSectionDescription")}
            </p>
            <ContactForm />
        </div>
    </div>
  );
}
