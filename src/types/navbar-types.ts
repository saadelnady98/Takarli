export interface City {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  slug: string;
  name: string;
  cities: City[];
}

export interface NavbarData {
  id: number;
  slug: string;
  name: string;
  cities: City[];
}

export interface NavbarResponse {
  message: string;
  data: NavbarData[];  
  pagination: null | {
    current_page: number;
    per_page: number;
    total: number;
  };
  errors: null | Record<string, unknown>;
}
