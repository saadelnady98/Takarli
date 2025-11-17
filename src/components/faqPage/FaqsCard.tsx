"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItemProps } from "@/app/[locale]/faqs/page";
import { useTranslations } from "next-intl";

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-2 border-[#D9D9D9] overflow-hidden ">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center lg:min-h-20.5 p-5 cursor-pointer transition-colors duration-300 ${isOpen ? "bg-dark text-white" : "bg-[rgba(240,240,240,1)] text-dark"
          }`}
        aria-expanded={isOpen}
      >
        <span className="lg:text-3xl  text-xl  text-left">
          {question}
        </span>

        <ChevronDown
          className={`w-8 h-8 flex-shrink-0 ml-4 transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-fit lg:p-10 p-5 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <p className="text-[rgba(64,64,64,1)] lg:text-2xl text-lg font-light whitespace-pre-line pb-2">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqsCard({ faqsData }: { faqsData: FaqItemProps[] }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const t = useTranslations("faqs");

  const handleToggle = (id: number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="lg:mb-24 mb-10 lg:mt-9 mt-5 flex flex-col lg:gap-7.5 gap-5 container-padding">
      <h1 className="text-dark text-center lg:text-4xl text-xl uppercase ">
        {t("faqTitle")}
      </h1>



      {faqsData && (
        <div className="m-auto flex flex-col  gap-6 w-full">
          {faqsData?.map((faq) => (
            <FaqItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
