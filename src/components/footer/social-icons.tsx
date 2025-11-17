import { Facebook, Instagram, Linkedin, Mail, MessageCircle, PhoneCall } from "lucide-react"
import Link from "next/link"

interface SocialIconsProps {
  socials?: Record<string, string>
  contacts?: Record<string, string>
}

// أنواع الاتصال
type ContactType = "email" | "whatsapp" | "phone1" | "phone2"
type SocialType = "facebook" | "linkedin" | "instagram"

// تكوين الأيقونات
const SOCIAL_ICONS: Record<SocialType, React.ReactNode> = {
  facebook: <Facebook />,
  linkedin: <Linkedin />,
  instagram: <Instagram />,
}

const CONTACT_ICONS: Record<ContactType, React.ReactNode> = {
  phone1: <PhoneCall />,
  phone2: <PhoneCall />,
  email: <Mail />,
  whatsapp: <MessageCircle />,
}

// معالج الروابط
class LinkProcessor {
  static processEmail(email: string): string {
    return `mailto:${email.trim()}`
  }

  static processWhatsApp(phone: string): string {
    const cleanNumber = phone.replace(/\D/g, "")
    const whatsappNumber = cleanNumber

    return `https://wa.me/${whatsappNumber}`
  }

  static processPhone(phone: string): string {
    const cleanNumber = phone.replace(/\D/g, "")
    return `tel:${cleanNumber}`
  }

  static processContact(key: string, value: string): string {
    const lowerKey = key.toLowerCase() as ContactType

    switch (lowerKey) {
      case "email":
        return this.processEmail(value)
      case "whatsapp":
        return this.processWhatsApp(value)
      case "phone1":
      case "phone2":
        return this.processPhone(value)
      default:
        return value
    }
  }

  static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  static isValidPhone(phone: string): boolean {
    const cleanNumber = phone.replace(/\D/g, "")
    return cleanNumber.length >= 10
  }

  static isValidLink(key: string, value: string): boolean {
    if (!value) return false

    const lowerKey = key.toLowerCase()

    if (lowerKey === "email") {
      return this.isValidEmail(value)
    }

    if (["phone1", "phone2", "whatsapp"].includes(lowerKey)) {
      return this.isValidPhone(value)
    }

    return true
  }
}

// مكون الأيقونة الاجتماعية
const SocialIcon = ({ type, url }: { type: SocialType; url: string }) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit our ${type} page`}
    title={`Visit our ${type} page`}
    className="border-dark-grey/25 text-dark-grey hover:bg-dark flex h-[35px] w-[35px] items-center justify-center rounded-full border transition-all duration-300 hover:text-white"
  >
    <div className="flex h-4 w-4 items-center justify-center">{SOCIAL_ICONS[type]}</div>
  </Link>
)

// مكون أيقونة الاتصال
const ContactIcon = ({ type, value }: { type: ContactType; value: string }) => {
  const processedLink = LinkProcessor.processContact(type, value)

  return (
    <Link
      href={processedLink}
      target={type === "email" ? "_self" : "_blank"}
      rel={type === "email" ? undefined : "noopener noreferrer"}
      aria-label={`Contact via ${type}`} // ✅ أضف هذا
      title={`Contact via ${type}`} // يظهر tooltip عند hover
      className="border-dark-grey/25 text-dark-grey hover:bg-dark flex h-[35px] w-[35px] items-center justify-center rounded-full border transition-all duration-300 hover:text-white"
    >
      <div className="flex h-4 w-4 items-center justify-center">{CONTACT_ICONS[type]}</div>
    </Link>
  )
}

export function SocialIcons({ socials = {}, contacts = {} }: SocialIconsProps) {
  return (
    <div className="flex justify-center gap-2 max-[350px]:flex-wrap sm:gap-4">
      {/* Social Media Icons */}
      {Object.entries(socials)
        .filter(
          ([key, url]) =>
            LinkProcessor.isValidLink(key, url) &&
            SOCIAL_ICONS.hasOwnProperty(key.toLowerCase() as SocialType),
        )
        .map(([key, url]) => (
          <SocialIcon key={`social-${key}`} type={key.toLowerCase() as SocialType} url={url} />
        ))}

      {/* Contact Icons */}
      {Object.entries(contacts)
        .filter(
          ([key, value]) =>
            LinkProcessor.isValidLink(key, value) &&
            CONTACT_ICONS.hasOwnProperty(key.toLowerCase() as ContactType),
        )
        .map(([key, value]) => (
          <ContactIcon
            key={`contact-${key}`}
            type={key.toLowerCase() as ContactType}
            value={value}
          />
        ))}
    </div>
  )
}
