import { BlogPageContent } from "@/components/blogs/blog-page-content";
import { fetchPageData } from "@/lib/api-fetcher";
import { Blog } from "@/types/blog-types";
import { redirect } from "next/navigation";
 
interface BlogsPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
  };
}

const MORE_BLOGS_PER_PAGE = 6;

export default async function BlogsPage({ params, searchParams }: BlogsPageProps) {

  const resolvedSearchParams = await searchParams;
  let currentPage = parseInt(resolvedSearchParams.page || "1");

  if (currentPage < 1 || isNaN(currentPage)) {
    currentPage = 1;
  }

  const moreBlogsResponse = await fetchPageData<Blog[]>(
    "/blog",
    {
      per_page: MORE_BLOGS_PER_PAGE,
      page: currentPage
    }
  );

  const totalPages = moreBlogsResponse.pagination?.last_page || 1;

  if (currentPage > totalPages) {
    redirect(`/${params.locale}/blogs`);
  }

  const latestBlogsResponse = await fetchPageData<Blog[]>(
    "/blog/latest",
    {
      per_page: 3,
      page: 1
    }
  );

  const latestBlogs = latestBlogsResponse.data;
  const moreBlogs = moreBlogsResponse.data;

  return (


    <BlogPageContent
      latestBlogs={latestBlogs}
      moreBlogs={moreBlogs}
      currentPage={currentPage}
      totalPages={totalPages}
    />

  );
}
