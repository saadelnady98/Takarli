// components/blog/BlogsSection.tsx
import Image from "next/image";
import Link from "next/link";
import { BlogsSectionProps } from "@/types/blog-types";
import { useTranslations } from "next-intl";

export function BlogsSection({ blogs }: BlogsSectionProps) {
  const t = useTranslations("blogs");
  return (
    <section className="flex flex-col lg:gap-12 gap-6">
      {blogs.map((blog, index) => {
        const isEven = index % 2 === 1;
        
        return (
          <article
            key={blog.id}
            className={`grid items-end xl:gap-9 gap-6 
              ${isEven ? "lg:[&>*:first-child]:order-2 lg:grid-cols-[1fr_500px]" : "lg:grid-cols-[500px_1fr]"}`}
          >
            <div className="w-full xl:h-75 h-60">
              <Image
                src={blog.image ?? '/assets/logo/logo-footer.png'}
                alt={blog.title}
                width={500}
                height={300}
                className="h-full w-full object-cover"
                priority={index === 0}
              />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="xl:text-4xl text-2xl text-dark font-[galleds] leading-tight">
                {blog.title}
              </h3>

              <p className="xl:text-base text-sm font-sans font-light text-[rgba(140,140,140,1)] line-clamp-3">
                {blog.short_description}
              </p>

              <Link
                href={`/blogs/${blog.slug}`}
                className={`bg-dark text-white font-[galleds] xl:text-sm text-xs px-4 py-2 rounded-none font-extralight w-fit hover:bg-gray-800 transition-colors
                ${isEven ? "lg:self-start" : "lg:self-end"}`}
              >
                {t("discoverMore")}
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}