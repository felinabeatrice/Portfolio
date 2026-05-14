import BlogPostLayout from "@/components/BlogPostLayout";
import blogs from "@/data/blogs";

export const metadata = {
  title: "Why Minimal UI Feels More Premium — Felina Beatrice",
  description:
    "Understanding why less visual noise creates a stronger sense of quality and trust.",
};

export default function WhyMinimalUIFeelsPremium() {
  const blog = blogs.find(
    (b) => b.slug === "why-minimal-ui-feels-premium"
  );
  return <BlogPostLayout blog={blog} />;
}