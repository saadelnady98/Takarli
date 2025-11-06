

export interface Property {
  id: number;
  slug: string;
  title: string;
  country: string;
  city: string;
  area: string;
  beds: number;
  baths: number;
  lat: number;
  lng: number;
  image: string;
}

export interface CountryGroup {
  country: string;
  properties: Property[];
}

export interface PropertyCategory {
  id: number;
  name: string;
  title: string;
  short_description: string;
  countries: CountryGroup[];
}

export interface HomePageResponse {
  slider: {
    id: number;
    text: string;
    description: string;
    images: string[];
  };

  statistics: {
    off_plan: number;
    ready_to_move: number;
    developers: number;
  };

  Who_We_Are: {
    id: number;
    title: string;
    short_description: string;
  };

  ready_to_move: PropertyCategory;
  off_plan: PropertyCategory;

  Our_Story: {
    id: number;
    title: string;
    short_description: string;
  };

  contact: {
    social: Record<string, string>;
    contacts: {
      email: string;
      phone1: string;
      phone2: string;
      whatsapp: string;
    };
    location: {
      lat: number;
      long: number;
    };
    address: {
      text: string;
    };
    contact_info: {
      text: string;
    };
  };
}
