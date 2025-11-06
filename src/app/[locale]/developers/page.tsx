import { redirect } from "next/navigation";
import { fetchPageData } from "@/lib/api-fetcher";
import DevelopersList from "@/components/developersPage/DevelopersList";
import { Developer } from "@/components/developersPage/types";

interface DevelopersPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function DevelopersPage({ params, searchParams }: DevelopersPageProps) {
  const resolvedSearchParams = await searchParams;
  
   let currentPage = parseInt(resolvedSearchParams.page || "1");
  
  if (currentPage < 1 || isNaN(currentPage)) {
    currentPage = 1;
  }
  
  const perPage = 8;
  
  const developersResponse = await fetchPageData<Developer[]>(
    "/developer",
    { 
      per_page: perPage,
      page: currentPage
    }
  );

   const totalPages = developersResponse.pagination?.last_page || 1;
   
  if (currentPage > totalPages) {
    redirect(`/${params.locale}/developers`);
  }
  return (
  
    <DevelopersList 
      developers={developersResponse.data} 
      currentPage={currentPage}
        totalPages={totalPages}
    />
  );
}