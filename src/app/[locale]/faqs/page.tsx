import FaqsCard from "@/components/faqPage/FaqsCard";
import { fetchPageData } from "@/lib/api-fetcher";
export interface FaqItemProps {
  id: number;
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export type FaqsResponse = {
  data: FaqItemProps[];
  message: string;
  errors: null;
  pagination: null;
};

export default async function FaqsPage() {
const data = await fetchPageData<FaqItemProps[]>("/faq");
  return (
    <main className="flex min-h-screen flex-col items-center">
      <FaqsCard faqsData={data.data} />
    </main>
  );
}
