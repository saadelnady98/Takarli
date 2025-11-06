export interface FooterApiResponse {
  social?: Record<string, string>
  contacts?: {
    email?: string
    phone1?: string
    phone2?: string
    whatsapp?: string
  }
  location?: {
    lat?: number
    long?: number
  }
  address?: {
    text?: string
  }
  contact_info?: {
    text?: string
  }
}
