import BlogPostLayout from "@/components/BlogPostLayout";
import blogs from "@/data/blogs";

export const metadata = {
  title: "Designing Modern Web Interfaces — Felina Beatrice",
  description: "Exploring clean UI patterns, motion, and user-focused design.",
};

export default function DesigningModernWebInterfaces() {
  const blog = blogs.find(
    (b) => b.slug === "designing-modern-web-interfaces"
  );
  return <BlogPostLayout blog={blog} />;
}