import React from "react";
import Image from "next/image";
import { fetchPageData } from "@/lib/api-fetcher";
import { getTranslations } from "next-intl/server";
interface Blog {
  id: number;
  slug: string;
  image: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  tags: string[];
}


interface BlogDetailResponse {
  data: Blog;
  similar_blogs: Blog[];
}
export default async function page({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const { data } = await fetchPageData<BlogDetailResponse>(`/blog/${slug}`);
  const blogData = data.data;
  const t = await getTranslations("blogs");  
  return (
    <div className="flex flex-col items-start lg:gap-12 gap-6 container-padding lg:mt-12 mt-6">
      <h1 className="text-dark  font-[galleds]  lg:text-6xl sm:text-3xl text-xl lg:leading-14 sm:leading-10 ">
        {blogData?.title}
      </h1>
      <div className="lg:h-96 h-60 w-full">
        <Image
          src={blogData?.image ?? '/assets/logo/logo-footer.png'}
          alt="blog"
          width={1000}
          height={500}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col lg:gap-12 gap-6">

        <article className="text-text-darker lg:text-2xl sm:text-lg text-sm font-light"
          dangerouslySetInnerHTML={{ __html: blogData?.description }}
        />


        <span className="text-dark/70 lg:mb-12 mb-6 font-[galleds] lg:text-base sm:text-lg text-sm ">
          {t("publishedOn")}: {blogData?.created_at}
        </span>
      </div>
    </div>
  );
}
