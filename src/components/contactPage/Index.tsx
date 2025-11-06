import ContactInfo from "@/components/contactPage/ContactInfo"
import ContactAddress from "@/components/contactPage/ContactAddress"
import ContactMap from "@/components/contactPage/ContactMap"
import GenericHeader from "@/components/sharedUi/generic-header"
import ContactForm from "@/components/ContactForm"
import { useTranslations } from "next-intl"
import { ContactResponse } from "./types"

const Contact = ({ data }: { data: ContactResponse }) => {
    const t = useTranslations("contact")

    return (
        <main className="flex min-h-screen flex-col items-center lg:mt-7.5 mt-5 container-padding">
            <GenericHeader
                title={data.headers.slug}
                span={t("header.span")}
                image={data.headers.image[0] || "/assets/logo/logo-footer.png"}
                altText={t("header.altText")}
                darkOverlay
            />
            <ContactInfo data={data} />
            <ContactForm />
            <ContactAddress data={data} />
            <ContactMap data={data} />
        </main>
    )
}

export default Contact
