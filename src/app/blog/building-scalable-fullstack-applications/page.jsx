import BlogPostLayout from "@/components/BlogPostLayout";
import blogs from "@/data/blogs";

export const metadata = {
  title: "Building Scalable Full-Stack Applications — Felina Beatrice",
  description: "Thoughts on structuring efficient PERN stack applications.",
};

export default function BuildingScalableFullStackApplications() {
  const blog = blogs.find(
    (b) => b.slug === "building-scalable-fullstack-applications"
  );
  return <BlogPostLayout blog={blog} />;
}