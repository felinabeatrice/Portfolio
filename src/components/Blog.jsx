"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import blogs from "@/data/blogs";

export default function Blog() {
  return (
    <section
      id="blog"
      style={{
        minHeight: "100vh",
        padding: "100px 80px",
        background: "#271a38",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
        scrollMarginTop: "80px",
      }}
    >
      {/* Background glow left */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(118,219,219,0.08) 0%, transparent 70%)",
          top: "20%",
          left: "-200px",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />
      {/* Background glow right */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(247,80,130,0.08) 0%, transparent 70%)",
          bottom: "10%",
          right: "-150px",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <p
          style={{
            color: "#f75082",
            letterSpacing: "3px",
            fontSize: "12px",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: 700,
          }}
        >
          My Thoughts
        </p>

        <h2
          style={{
            fontSize: "clamp(40px, 5vw, 60px)",
            fontWeight: 400,
            margin: "0 0 16px 0",
            color: "#76dbdb",
            letterSpacing: "2px",
            lineHeight: 1.2,
            fontFamily: "var(--font-bitcount), monospace",
          }}
        >
          Developer Notes
        </h2>

        <p
          style={{
            color: "rgba(118,219,219,0.6)",
            fontSize: "15px",
            marginBottom: "60px",
            maxWidth: "550px",
            lineHeight: 1.8,
          }}
        >
          Thoughts on development, design, and building modern web experiences.
        </p>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {blogs.map((blog, i) => (
            <BlogCard key={i} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── BlogCard ─────────── */

function BlogCard({ blog }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/blogs/${blog.slug}`)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        height: "300px",
        border: hovered
          ? "1px solid rgba(247,80,130,0.6)"
          : "1px solid rgba(118,219,219,0.15)",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(247,80,130,0.2), 0 0 60px rgba(247,80,130,0.1)"
          : "none",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: blog.gradient,
          opacity: hovered ? 0.75 : 0.55,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "all 0.5s ease",
          zIndex: 0,
        }}
      />

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)",
          top: "-40px",
          right: "-40px",
          filter: "blur(20px)",
          zIndex: 1,
        }}
      />

      {/* Default state — title at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 24px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(39,26,56,0.65) 100%)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "17px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.5px",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {blog.title}
        </h3>
      </div>

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background:
            "linear-gradient(180deg, rgba(39,26,56,0.3) 0%, rgba(39,26,56,0.92) 100%)",
          backdropFilter: "blur(6px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 3,
        }}
      >
        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(247,80,130,0.9)",
            color: "#271a38",
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "translate(0,0) rotate(0deg)"
              : "translate(6px,-6px) rotate(-15deg)",
            transition: "all 0.4s ease 0.1s",
          }}
        >
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h3
          style={{
            margin: "0 0 10px 0",
            fontSize: "20px",
            fontWeight: 700,
            color: "#76dbdb",
            letterSpacing: "0.5px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.4s ease 0.15s",
          }}
        >
          {blog.title}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: 0,
            color: "rgba(118,219,219,0.8)",
            fontSize: "13px",
            lineHeight: 1.7,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.4s ease 0.2s",
          }}
        >
          {blog.description}
        </p>
      </div>
    </div>
  );
}