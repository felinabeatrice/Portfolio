import BlogPostLayout from "@/components/BlogPostLayout";
import blogs from "@/data/blogs";

export const metadata = {
  title: "Optimizing Frontend Performance — Felina Beatrice",
  description: "Creating fast, responsive, and smooth user experiences.",
};

export default function OptimizingFrontendPerformance() {
  const blog = blogs.find(
    (b) => b.slug === "optimizing-frontend-performance"
  );
  return <BlogPostLayout blog={blog} />;
}