import {
  blogs_SectionProps,
  BlogsCardsProps,
  currencyProps,
  Developers_dataProprs,
  dummy_ImagesProps,
  floorPlanUtilsProps,
  footer_links2Props,
  footer_linksProps,
  footer_main_linksProps,
  languageProps,
  monacoPageProps,
  navbar_linksProps,
  OffPlanHomeProps,
  propertyAmninityProps,
  PropertyCardsProps,
  ReadyHomeProps,
  uaePageProps,
} from "../../src/types/interfaceData"
import footerlogo from "../../public/assets/logo/footer-logo.svg"
import navlogo from "../../public/assets/logo/logo.svg"
import english from "../../public/assets/icons/english.svg"
import linkedin from "../../public/assets/icons/linkedin.svg"
import facebook from "../../public/assets/icons/facebook.svg"
import insta from "../../public/assets/icons/insta.svg"
import youtube from "../../public/assets/icons/youtube.svg"
import navlogowhite from "../../public/assets/logo/white-logo.svg"
import herohomeImage from "../../public/assets/homepage/hero-home.svg"
import homevilla from "../../public/assets/homepage/home-vila.svg"
import contactusbg from "../../public/assets/homepage/home-contact-us-bg.svg"
import pic1 from "../../public/assets/homepage/pic-1.svg"
import pic2 from "../../public/assets/homepage/pic-2.svg"
import pic3 from "../../public/assets/homepage/pic-3.svg"
import rightArrow from "../../public/assets/icons/right-arrow.svg"
import leftArrow from "../../public/assets/icons/left-arrow.svg"
import homeimage2 from "../../public/assets/homepage/home-image2.svg"
import homeimage3 from "../../public/assets/homepage/home-image3.svg"
import arrowdownblack from "../../public/assets/icons/arrow-down-black.svg"
import arrowdownwhite from "../../public/assets/icons/arrow-down-white.svg"
import blackglob from "../../public/assets/icons/black-global.svg"
import whiteglob from "../../public/assets/icons/white-global.svg"
import close from "../../public/assets/icons/close.svg"
import propertyimg1 from "../../public/assets/single-property/big-img.svg"
import propertyimg2 from "../../public/assets/single-property/big-img2.svg"
import propertyimg3 from "../../public/assets/single-property/big-img3.svg"
import pin from "../../public/assets/icons/location.svg"
import home from "../../public/assets/icons/house-2.svg"
import tele from "../../public/assets/icons/telegram-white.svg"
import bed from "../../public/assets/icons/hotel-double-bed-1.svg"
import bath from "../../public/assets/icons/bathroom-tub-person.svg"
import size from "../../public/assets/icons/resize-expand-sides.svg"
import daysun from "../../public/assets/icons/day-sunset-1.svg"
import kitchen from "../../public/assets/icons/tools-kitchen-serving-dome.svg"
import Tv from "../../public/assets/icons/modern-tv-flat.svg"
import wifi from "../../public/assets/icons/wifi.svg"
import parking from "../../public/assets/icons/discount-parking-2.svg"
import floormap from "../../public/assets/single-property/floor-map.svg"
import mapimg from "../../public/assets/single-property/map-img.svg"
import agent from "../../public/assets/single-property/agent.svg"
import whiteCall from "../../public/assets/icons/white-call.svg"
import blackEnvlop from "../../public/assets/icons/black-envlop.svg"
import closecon from "../../public/assets/icons/x-with-black.svg"
import img1 from "../../public/assets/single-property/img-1.svg"
import img2 from "../../public/assets/single-property/img-2.svg"
import img4 from "../../public/assets/single-property/img-4.svg"
import img5 from "../../public/assets/single-property/img-5.svg"
import roundright from "../../public/assets/icons/round-right.svg"
import roundleft from "../../public/assets/icons/round-left.svg"
import imtiaz from "../../public/assets/developers/imtiaz.png"
import ellington from "../../public/assets/developers/ellington.png"
import nakheel from "../../public/assets/developers/nakheel.png"
import ohana from "../../public/assets/developers/ohana.png"
import palma from "../../public/assets/developers/palma.png"
import mclaren from "../../public/assets/blogs/mclaren.svg"
import squares from "../../public/assets/icons/squares.svg"
import moneyrange from "../../public/assets/icons/money-range.svg"
import whiteSearch from "../../public/assets/icons/white-search.svg"
import filter from "../../public/assets/icons/filters.svg"
import sort from "../../public/assets/icons/sort.svg"
import menu from "../../public/assets/icons/menu.svg"
import mobilelogo from "../../public/assets/icons/mobile-footer-logo.svg"

export const Images = {
  mobilelogo,
  menu,
  squares,
  imtiaz,
  footerlogo,
  navlogo,
  english,
  navlogowhite,
  herohomeImage,
  homevilla,
  contactusbg,
  pic1,
  pic2,
  pic3,
  rightArrow,
  leftArrow,
  homeimage2,
  homeimage3,
  arrowdownblack,
  arrowdownwhite,
  blackglob,
  whiteglob,
  close,
  propertyimg1,
  propertyimg2,
  propertyimg3,
  linkedin,
  facebook,
  insta,
  youtube,
  pin,
  home,
  tele,
  bed,
  floormap,
  mapimg,
  agent,
  whiteCall,
  blackEnvlop,
  closecon,
  roundright,
  roundleft,
  img5,
  mclaren,
  moneyrange,
  whiteSearch,
  sort,
  filter,
}

export const FilterData = [
  { id: 1, title: "Country", img: pin },
  { id: 2, title: "City", img: pin },
  { id: 3, title: "Category", img: squares },
  { id: 4, title: "Price", img: moneyrange },
]

export const beforeImage = [
  { id: 1, img: pin },
  { id: 2, img: pin },
  { id: 3, img: squares },
  { id: 4, img: moneyrange },
]

export const formFields = [
  {
    id: 1,
    name: "firstName",
    label: "First Name",
    placeholder: "First Name",
    errorText: "Please enter your name",
    type: "text",
  },
  {
    id: 2,
    name: "lastName",
    label: "Full Name",
    placeholder: "Full Name",
    errorText: "Please enter your name",
    type: "text",
  },
  {
    id: 3,
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    errorText: "Please enter your email",
    type: "email",
  },
]

export const BlogsCards: BlogsCardsProps[] = [
  {
    id: 1,
    img: img1,
    title: "Real Estate as a Long-Term Investment in Monaco",
    description:
      "From Monte Carlo’s glamour to Fontvieille’s quiet luxury, Monaco offers diverse options for investors. ",
  },
  {
    id: 2,
    img: img2,
    title: "Real Estate as a Long-Term Investment in Monaco",
    description:
      "From Monte Carlo’s glamour to Fontvieille’s quiet luxury, Monaco offers diverse options for investors. ",
  },
  {
    id: 3,
    img: img4,
    title: "Real Estate as a Long-Term Investment in Monaco",
    description:
      "From Monte Carlo’s glamour to Fontvieille’s quiet luxury, Monaco offers diverse options for investors. ",
  },
  {
    id: 4,
    img: img5,
    title: "Real Estate as a Long-Term Investment in Monaco",
    description:
      "From Monte Carlo’s glamour to Fontvieille’s quiet luxury, Monaco offers diverse options for investors. ",
  },
  {
    id: 5,
    img: img4,
    title: "Real Estate as a Long-Term Investment in Monaco",
    description:
      "From Monte Carlo’s glamour to Fontvieille’s quiet luxury, Monaco offers diverse options for investors. ",
  },
  {
    id: 6,
    img: img2,
    title: "Real Estate as a Long-Term Investment in Monaco",
    description:
      "From Monte Carlo’s glamour to Fontvieille’s quiet luxury, Monaco offers diverse options for investors. ",
  },
]

export const Developers_data: Developers_dataProprs[] = [
  {
    id: 1,
    title: "imtiaz",
    img: imtiaz,
    description:
      "Dubai-based Nakheel, a member of Dubai Holding, is a world-leading master developer whose innovative, landmark projects form an iconic portfolio of master communities",
  },
  {
    id: 2,
    title: "ellington",
    img: ellington,
    description:
      "Dubai-based Nakheel, a member of Dubai Holding, is a world-leading master developer whose innovative, landmark projects form an iconic portfolio of master communities",
  },
  {
    id: 3,
    title: "nakheel",
    img: nakheel,
    description:
      "Dubai-based Nakheel, a member of Dubai Holding, is a world-leading master developer whose innovative, landmark projects form an iconic portfolio of master communities",
  },
  {
    id: 4,
    title: "ohana",
    img: ohana,
    description:
      "Dubai-based Nakheel, a member of Dubai Holding, is a world-leading master developer whose innovative, landmark projects form an iconic portfolio of master communities",
  },
  {
    id: 5,
    title: "palma",
    img: palma,
    description:
      "Dubai-based Nakheel, a member of Dubai Holding, is a world-leading master developer whose innovative, landmark projects form an iconic portfolio of master communities",
  },
]

export const blogs_Section: blogs_SectionProps[] = [
  {
    id: 1,
    title: "Real Estate Ownership Laws for Foreigners in the UAE",
    description:
      "From Monte Carlo’s glamour to Fontvieille’s quiet luxury, Monaco offers diverse options for investors. Each district has its unique charm and potential for high returns Freehold zones allow foreigners to own property in the Emirates, boosting investor confidence. Recent reforms have made ownership From Monte Carlo’s .",
    img: img1,
  },
  {
    id: 2,
    title: "Real Estate Ownership Laws for Foreigners in the UAE",
    description:
      "From Monte Carlo’s glamour to Fontvieille’s quiet luxury, Monaco offers diverse options for investors. Each district has its unique charm and potential for high returns Freehold zones allow foreigners to own property in the Emirates, boosting investor confidence. Recent reforms have made ownership From Monte Carlo’s .",
    img: img2,
  },
  {
    id: 3,
    title: "Real Estate Ownership Laws for Foreigners in the UAE",
    description:
      "From Monte Carlo’s glamour to Fontvieille’s quiet luxury, Monaco offers diverse options for investors. Each district has its unique charm and potential for high returns Freehold zones allow foreigners to own property in the Emirates, boosting investor confidence. Recent reforms have made ownership From Monte Carlo’s .",
    img: img4,
  },
]

export const dummy_Images: dummy_ImagesProps[] = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img1 },
  { id: 4, img: img5 },
  { id: 5, img: img2 },
]

export const floorPlanUtils: floorPlanUtilsProps[] = [
  { id: 1, title: "Unit : ", des: "1 Bedroom + 1 Powder Room + 1 Balcony" },
  { id: 2, title: "Suite : ", des: "478.78 – 478.89 sq.ft." },
  { id: 3, title: "Balcony : ", des: "86.22 – 86.33 sq.ft." },
  { id: 4, title: "Total : ", des: "565.10 – 565.21 sq.ft." },
]

export const propertyAmninity: propertyAmninityProps[] = [
  { id: 1, title: "3 Beds", img: bed },
  { id: 2, title: "3 Baths", img: bath },
  { id: 3, title: "180 sqft", img: size },
  { id: 4, title: "Sun View ", img: daysun },
  { id: 5, title: "Kitchen ", img: kitchen },
  { id: 6, title: "TV ", img: Tv },
  { id: 7, title: "Wifi", img: wifi },
  { id: 8, title: "Parking Area", img: parking },
  { id: 9, title: "3 Beds ", img: bed },
]

export const languages: languageProps[] = [
  { id: 1, label: "English", value: "en" },
  { id: 2, label: "French", value: "fr" },
]

export const currency: currencyProps[] = [
  { id: 1, label: "USD", value: "Dollar" },
  { id: 2, label: "EUR", value: "Euro" },
  { id: 2, label: "AED", value: "Dirham" },
]

export const uaePage: uaePageProps[] = [
  {
    id: 1,
    title: "UAE Properties",
    short: "Experience Exceptional Living in the UAE",
    des: "From modern Dubai skyscrapers to serene Abu Dhabi villas, explore premium residences across the UAE designed for comfort, style, and long-term value.",
  },
]

export const monacoPage: monacoPageProps[] = [
  {
    id: 1,
    title: "Monaco Properties",
    short: "Discover Exclusive Monaco Residences",
    des: "Step into the world of elegance with premier apartments and penthouses in Monaco, offering unmatched luxury, stunning views, and a lifestyle reserved for the elite.",
  },
]

export const PropertyCards: PropertyCardsProps[] = [
  {
    id: 1,
    slug: "chelsia",
    name: "Chelsia",
    category: "Off plan",
    starting_price: "590,878",
    currency: "USD",
    city: "Dubai",
    area: "Al Rawda",
    cover: "",
  },
  {
    id: 2,
    slug: "emerald-bay",
    name: "Emerald Bay",
    category: "Off plan",
    starting_price: "1,200,000",
    currency: "USD",
    city: "Dubai",
    area: "Business Bay",
    cover: "",
  },
  {
    id: 3,
    slug: "royal-heights",
    name: "Royal Heights",
    category: "Ready",
    starting_price: "850,000",
    currency: "USD",
    city: "Dubai",
    area: "Jumeirah",
    cover: "",
  },
]
export const PropertyCardsMonaco: PropertyCardsProps[] = [
  {
    id: 4,
    slug: "monaco-vista",
    name: "Monaco Vista",
    category: "Off plan",
    starting_price: "2,400,000",
    currency: "EUR",
    city: "Monaco",
    area: "Saint Roman",
    cover: "",
  },
  {
    id: 5,
    slug: "fontvieille-palace",
    name: "Fontvieille Palace",
    category: "Ready",
    starting_price: "3,100,000",
    currency: "EUR",
    city: "Monaco",
    area: "Fontvieille",
    cover: "",
  },
  {
    id: 6,
    slug: "mareterra-residence",
    name: "Mareterra Residence",
    category: "Off plan",
    starting_price: "2,750,000",
    currency: "EUR",
    city: "Monaco",
    area: "Mareterra district",
    cover: "",
  },
]
export const homehero = [
  { id: 1, title: "one ", img: herohomeImage },
  { id: 2, title: "two", img: homeimage2 },
  { id: 3, title: "three", img: homeimage3 },
]

export const swiper_images = [
  {
    id: 1,
    image: pic1,
  },
  {
    id: 2,
    image: pic2,
  },
  {
    id: 3,
    image: pic3,
  },
  {
    id: 4,
    image: pic3,
  },
  {
    id: 5,
    image: pic3,
  },
  {
    id: 6,
    image: pic3,
  },
]

export const privacy_data = [
  {
    id: 1,
    title: "Information We Collect",
    description:
      "We may collect the following types of information: Personal details such as your name, email address, and phone number. Property preferences and inquiries you make through our platform.Technical information like IP address, browser type, and cookies for improving user experience.",
  },
  {
    id: 2,
    title: "How We Use Your Information",
    description:
      "We may collect the following types of information: Personal details such as your name, email address, and phone number. Property preferences and inquiries you make through our platform.Technical information like IP address, browser type, and cookies for improving user experience.",
  },
  {
    id: 3,
    title: "Sharing of Information",
    description:
      "We may collect the following types of information: Personal details such as your name, email address, and phone number. Property preferences and inquiries you make through our platform.Technical information like IP address, browser type, and cookies for improving user experience.",
  },
]

export const terms_data = [
  {
    id: 1,
    title: "Acceptance of Terms",
    description:
      "By visiting our website, creating an account, or using our services, you confirm that you accept these Terms and Conditions and agree to comply with them. If you do not agree, you must not use our services.",
  },

  {
    id: 2,
    title: "Services Provided",
    description:
      "By visiting our website, creating an account, or using our services, you confirm that you accept these Terms and Conditions and agree to comply with them. If you do not agree, you must not use our services.",
  },

  {
    id: 3,
    title: "User Responsibilities",
    description:
      "By visiting our website, creating an account, or using our services, you confirm that you accept these Terms and Conditions and agree to comply with them. If you do not agree, you must not use our services.",
  },
]

export const Mobile_Footer_Links = [
  // { id: 1, titleKey: "home", path: "/" },
  { id: 4, titleKey: "aboutUs", path: "/about-us" },
  { id: 5, titleKey: "contactUs", path: "/contact-us" },
  { id: 6, titleKey: "developers", path: "/developers" },
  { id: 7, titleKey: "blogs", path: "/blogs" },
  // { id: 8, titleKey: "faqs", path: "/faqs" },

];


export const navbar_links: navbar_linksProps[] = [
  { id: 1, title: "About Us", path: "/about-us" },
  { id: 2, title: "Contact Us", path: "/contact-us" },
]

export const footer_main_links: footer_main_linksProps[] = [
  // { id: 1, titleKey: "home", path: "/" },
  { id: 4, titleKey: "aboutUs", path: "/about-us" },
  { id: 5, titleKey: "contactUs", path: "/contact-us" },
  { id: 6, titleKey: "developers", path: "/developers" },
  { id: 7, titleKey: "blogs", path: "/blogs" },
  // { id: 8, titleKey: "faqs", path: "/faqs" },

];
export const footer_links: footer_linksProps[] = [
  { id: 1, title: "Info@Takarli.com" },
  { id: 2, title: "Contact@Takarli.com" },
  { id: 3, title: "+861 312 3543 12" },
]

export const footer_links2: footer_links2Props[] = [
  { id: 1, title: "Terms & Conditions", path: "/terms" },
  { id: 2, title: "Privacy Policy", path: "/privacy" },
  { id: 3, title: "faqs", path: "/faqs" },

  ];


export const social_links = [
  { id: 1, title: "linkedin", image: linkedin },
  { id: 2, title: "facebook", image: facebook },
  { id: 3, title: "instagram", image: insta },
  { id: 4, title: "youtube", image: youtube },
]

export const connect = "Connect With Us"

export const connectdis =
  "Takarli is a trusted real estate platform showcasing off-plan and ready properties in the UAE and Monaco."

export const privacyTitle = "Privacy Policy"

export const privacyDesc =
  "At Takarli & Co, your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services."

export const rights = "© 2025 Takarli & Co. All Rights Reserved."

export const dedicated =
  "A dedicated real estate platform connecting people with most exceptional properties in the UAE and Monaco.Helping you"

export const OffPlanHome: OffPlanHomeProps[] = [
  { id: 1, title: "OFF-PLAN PROPERTIES" },
  { id: 2, short: "Invest Early in Promising Off-Plan Projects" },
  {
    id: 3,
    describtion:
      "Discover upcoming developments with flexible payment plans, giving you the opportunity to secure high-value investments.",
  },
]
export const ReadyHome: ReadyHomeProps[] = [
  { id: 1, title: "Ready-to-Move Properties" },
  { id: 2, short: "Move Into Your Perfect Ready Home Today" },
  {
    id: 3,
    describtion:
      "Explore fully completed residences, from modern apartments to luxury villas, available for immediate move-in or investment.",
  },
]

export const homevillaTitle = "We Build Genuine Trust Through Expertise and Transparency."

export const homevillaDesc =
  "We connect buyers and investors with premium properties in the UAE and Monaco, combining market expertise with a personalized approach. Takarli has been helping individuals and investors find the right opportunities since day one."

export const SinglePropertyP =
  `<p>
      Spacious 3 bedroom apartment which would serve as an ideal family home in
      the Principality of Monaco.
    </p>

    <p>
      Located at the Beverly Palace, on the very residential and quiet Boulevard
      de Belgique, this large and luxuriously renovated apartment feel bright
      and modern due to its contemporary style. The high quality finishes
      throughout means this apartment is ready to move into. There are three
      spacious bedrooms, all with en suite bathrooms.
    </p>

    <p>
      A large east/ south facing wraparound terrace provides a wonderful space
      to relax and enjoy the warm Mediterranean weather. A garden terrace also
      provides a wonderful space to enjoy family moments. The terrace provides
      open views onto the city and there is a sea view on the eastern side.
    </p>

    <p>
      This property consists of an entrance, a large living room with dining
      room, fully equipped kitchen open onto the dining room, 3 bedrooms, 4
      bathrooms, a large spacious veranda of 30 m2, a large terrace with summer
      kitchen and laundry room, and a garden area of 28 m2. 2 parking spaces
      complete this property.
    </p>`

export const SingleDeveloperDes =
  "Dubai-based Nakheel, a member of Dubai Holding, is a world-leading master developer whose innovative, landmark projects form an iconic portfolio of master communities and residential, retail, hospitality and leisure developments that are pivotal to realising Dubai’s vision. Nakheel’s waterfront projects, including the world-famous, award-winning Palm Jumeirah, have added more than 300 kilometres to Dubai’s original, 70km coastline, paving the way for the development of hundreds of seafront homes, resorts, hotels and attractions."
