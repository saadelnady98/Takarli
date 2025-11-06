// components/blog/BlogCardList.tsx
import { BlogCard } from "./BlogCard";
import { Blog } from "@/types/blog-types";

export function BlogCardList({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-2 lg:gap-y-11 gap-y-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}