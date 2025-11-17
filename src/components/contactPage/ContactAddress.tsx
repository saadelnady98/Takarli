import { ContactInfoItem } from "./contact-info-item"
import { ContactResponse } from "./types"
import { useTranslations } from "next-intl"

export default function ContactAddress({ data }: { data: ContactResponse }) {
  const t = useTranslations("contact.address")

  return (
    <section className="w-full mt-10 lg:mb-7.5 mb-4.5 flex flex-col lg:gap-6 gap-2.5">
      <p className="text-dark lg:text-xl text-sm font-bold">{t("title")}</p>
      <h4 className="lg:text-3xl text-xl  text-dark">
        {t("heading")}
      </h4>
      <p className="text-dark-grey lg:text-xl text-sm">
        {t("description")}
      </p>
      <ContactInfoItem
        icon={"/assets/contactpage/mapIcon.svg"}
        alt={t("alt")}
        text={data?.Social?.address?.text}
      />
    </section>
  )
}
