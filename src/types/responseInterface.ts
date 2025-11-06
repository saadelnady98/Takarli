// export interface ApiHomePageResponse {
//   message: string;
//   data: HomePageData;
//   pagination: PaginationProps | null;
//   errors: null;
// }

export interface ApiAboutResponse {
  data: dataTypesProp;
}

export interface dataTypesProp {
  whoweare: Whoweareprops[];
}

export interface Whoweareprops {
  id: number;
  title: string;
  short_description: string;
}
