type SocialLinks = {
  Thread?: string
  tiktok?: string
  Twitter?: string
  youtube?: string
  Telegram?: string
  facebook?: string
  linkedin?: string
  nstagram?: string // typo from backend
  instagram?: string
  snapchat?: string
}
// ✅ نوع البيانات بناءً على schema
export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type ContactResponse = {
  headers: {
    id: number
    slug: string
    image: string[]
  }
  Social: {
    social: SocialLinks
    contacts: {
      email: string
      phone1: string
      phone2: string
      whatsapp: string
    }
    location: {
      lat: number
      long: number
    }
    address: {
      text: string
    }
    contact_info: {
      text: string
    }
  }
}