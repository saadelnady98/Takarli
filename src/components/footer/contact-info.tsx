// import { Mail, Phone, MessageCircle, MapPin } from "lucide-react"
import Link from "next/link"

interface ContactInfoProps {
  email?: string
  phone1?: string
  whatsapp?: string
}

export function ContactInfo({ email, phone1, whatsapp }: ContactInfoProps) {
  return (
    <div className="grid xl:grid-cols-3 grid-cols-2 max-sm:hidden   justify-between w-full flex-wrap items-center lg:gap-6 gap-4 text-dark-grey text-center">
     
      {email && (
        <Link href={`mailto:${email}`} className="flex w-full items-center gap-2 justify-center text-center hover:text-dark border-[#D2D2D2] lg:border-b-1 pb-3 hover:border-dark ">
          {email}
        </Link>
      )}
      {phone1 && (
        <Link href={`tel:${phone1}`} className="flex  w-full items-center gap-2 justify-center text-center border-[#D2D2D2] lg:border-b-1 pb-3 hover:border-dark ">
          {phone1}
        </Link>
      )}
      {whatsapp && (
        <Link
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-2 border-[#D2D2D2] justify-center text-center lg:border-b-1 pb-3 hover:border-dark "
        >
         {whatsapp}
        </Link>
      )}
    </div>
  )
}
