"use client";
import Link from "next/link";
import blogs from "@/data/blogs";
import BlogNavbar from "@/components/BlogNavbar";
import BlogFooter from "@/components/BlogFooter";

export default function BlogListingPage() {
  return (
    <>
      <BlogNavbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#271a38",
          padding: "120px 40px 80px",
          boxSizing: "border-box",
          fontFamily: "var(--font-manrope), sans-serif",
          color: "#76dbdb",
        }}
      >
        <div
          style={{
            position: "fixed",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(118,219,219,0.06) 0%, transparent 70%)",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "64px" }}>
            <p
              style={{
                color: "#f75082",
                letterSpacing: "3px",
                fontSize: "11px",
                textTransform: "uppercase",
                fontWeight: 700,
                margin: "0 0 16px 0",
              }}
            >
              Developer Notes
            </p>

            <h1
              style={{
                fontSize: "clamp(36px, 6vw, 60px)",
                fontWeight: 400,
                color: "#76dbdb",
                letterSpacing: "2px",
                lineHeight: 1.15,
                margin: "0 0 20px 0",
                fontFamily: "var(--font-bitcount), monospace",
              }}
            >
              Writing
            </h1>

            <p
              style={{
                color: "rgba(118,219,219,0.55)",
                fontSize: "16px",
                lineHeight: 1.8,
                margin: 0,
                maxWidth: "480px",
              }}
            >
              Thoughts on development, design, and building modern web
              experiences.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(118,219,219,0.08)",
              marginBottom: "48px",
            }}
          />

          {/* Article list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            {blogs.map((blog, i) => (
              <ArticleRow
                key={blog.slug}
                blog={blog}
                index={i}
                total={blogs.length}
              />
            ))}
          </div>
        </div>
      </main>

      <BlogFooter />
    </>
  );
}

function ArticleRow({ blog, index, total }) {
  const isLast = index === total - 1;

  return (
    <Link
      href={`/blog/${blog.slug}`}
      style={{
        textDecoration: "none",
        display: "block",
        padding: "32px 0",
        borderBottom: isLast
          ? "none"
          : "1px solid rgba(118,219,219,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.paddingLeft = "8px";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.paddingLeft = "0px";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "24px",
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "11px",
              color: "#f75082",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {blog.date} · {blog.readingTime}
          </p>

          <h2
            style={{
              margin: "0 0 10px 0",
              fontSize: "20px",
              fontWeight: 700,
              color: "#76dbdb",
              letterSpacing: "0.3px",
              lineHeight: 1.3,
              fontFamily: "var(--font-manrope), sans-serif",
            }}
          >
            {blog.title}
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "rgba(118,219,219,0.5)",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            {blog.description}
          </p>
        </div>

        <span
          style={{
            fontSize: "18px",
            color: "rgba(118,219,219,0.25)",
            flexShrink: 0,
            marginTop: "4px",
            transition: "color 0.3s ease",
          }}
        >
          →
        </span>
      </div>
    </Link>
  );
}