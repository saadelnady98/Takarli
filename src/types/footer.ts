export interface footerData {
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
export interface FooterApiResponse {
  data: footerData
}
export interface FooterLinkItem {
  id: string | number
  path: string
  titleKey: string
}

export interface LegalLinkItem {
  id: string | number
  path: string
  title: string
}

export interface FooterNavigationProps {
  t: (key: string) => string
}

export interface ConnectSectionProps {
  t: (key: string) => string
}

export interface FooterBottomProps {
  footer: footerData
  t: (key: string) => string
}
