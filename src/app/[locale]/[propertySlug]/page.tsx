import PropertiesClient from "@/components/properties/properties-client"


interface PropertiesPageProps {
  params: {
    locale: string;
    propertySlug: string;
  };
  searchParams: {
    page?: string;
  };
}

const PROPERTIES_PER_PAGE = 12;
export default async function Page({ params, searchParams }: PropertiesPageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const propertySlug = resolvedParams.propertySlug;
  const locale = resolvedParams.locale
  let currentPage = parseInt(resolvedSearchParams.page || "1");
  if (currentPage < 1 || isNaN(currentPage)) {
    currentPage = 1;
  }



  return (
    <div className="relative w-full">
      <PropertiesClient page={currentPage} per_page={PROPERTIES_PER_PAGE} locale={locale} propertySlug={propertySlug} />
    </div>
  )
}