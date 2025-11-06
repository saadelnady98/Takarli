import React from "react";
import AboutHeader from "@/components/aboutPage/AboutHeader";
import AboutCompany from "@/components/aboutPage/AboutCompany";
import OurApproach from "@/components/aboutPage/OurApproach";
import OurTeam from "@/components/aboutPage/OurTeam";
import ExpertForm from "@/components/aboutPage/ExpertForm";
import { fetchPageData } from "@/lib/api-fetcher";


type SectionData = {
  id: number;
  title: string;
  short_description: string;
  image?: string;
};

type TeamMember = {
  id: number;
  name: string;
  position: string;
  link: string;
};

type AboutData = {
  Who_We_Are: SectionData;
  Our_Story: SectionData & { image: string };
  About_Header: SectionData;
  about_company: SectionData & { image: string };
  Our_Approach: SectionData & { image: string };
  mission: SectionData;
  vision: SectionData;
  Values: SectionData;
  Promise: SectionData;
  OurTeam: TeamMember[];
};

export default async function AboutPage() {
  const { data } = await fetchPageData<AboutData>("/about");

  return (
    <main className="flex min-h-screen flex-col">
      <AboutHeader
        title={data.About_Header.title}
        description={data.About_Header.short_description}
      />

      <AboutCompany
        title={data.about_company.title}
        description={data.about_company.short_description}
        image={data.about_company.image}
      />

      <OurApproach
        ourApproachHeader={data.Our_Approach}
        mission={data.mission}
        vision={data.vision}
        values={data.Values}
        promise={data.Promise}
      />

      <OurTeam teamMembersData={data.OurTeam} />
      <ExpertForm />
    </main>
  );
}
