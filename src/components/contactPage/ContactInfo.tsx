"use client"

import { ContactInfoItem } from "./contact-info-item"
import { ContactResponse } from "./types"
import { useTranslations } from "next-intl"

export default function ContactInfo({ data }: { data: ContactResponse }) {
  const t = useTranslations("contact.info")

  return (
    <section className="lg:my-10 my-5 w-full">
      {/* العنوان الرئيسي */}
      <p className="text-dark lg:text-xl text-sm font-bold">
        {t("title")}
      </p>

      <h3 className="lg:text-4xl text-2xl font-[galleds] lg:my-6 my-2.5 text-dark">
        {t("subtitle")}
      </h3>

      {/* معلومات الاتصال */}
      <div className="grid sm:grid-cols-4 grid-cols-2 justify-between items-center gap-4  ">
        {data?.Social?.contacts?.phone1 && (
          <ContactInfoItem
            icon="/assets/contactpage/tablet.svg"
            alt={t("phone1")}
            text={data.Social.contacts.phone1}
            link={`https://wa.me/${data.Social.contacts.phone1}`}
          />
        )}

        {data?.Social?.contacts?.phone2 && (
          <ContactInfoItem
            icon="/assets/contactpage/tablet.svg"
            alt={t("phone2")}
            text={data.Social.contacts.phone2}
            link={`https://wa.me/${data.Social.contacts.phone2}`}
          />
        )}

        {data?.Social?.contacts?.email && (
          <ContactInfoItem
            icon="/assets/contactpage/email-action-unread.svg"
            alt={t("email")}
            text={data.Social.contacts.email}
            link={`mailto:${data.Social.contacts.email}`}
          />
        )}

        {data?.Social?.contacts?.whatsapp && (
          <ContactInfoItem
            icon="/assets/contactpage/whatsapp.svg"
            alt={t("whatsapp")}
            text={data.Social.contacts.whatsapp}
            link={`https://wa.me/${data.Social.contacts.whatsapp}`}
          />
        )}
      </div>

      {/* <p className="text-dark-grey lg:text-xl text-xs">{t("social")}</p> */}
    </section>
  )
}
