"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxSizing: "border-box",
        background: scrolled
          ? "rgba(39,26,56,0.9)"
          : "rgba(39,26,56,0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(118,219,219,0.12)"
          : "1px solid transparent",
        transition: "all 0.4s ease",
        fontFamily: "var(--font-manrope), sans-serif",
      }}
    >
      {/* Left — Writing */}
      <Link
        href="/blog"
        style={{
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: 700,
          color: "#76dbdb",
          letterSpacing: "1px",
          transition: "color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = "#f75082")}
        onMouseOut={(e) => (e.currentTarget.style.color = "#76dbdb")}
      >
        Writing
      </Link>

      {/* Right — Articles + Back to Portfolio */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
        }}
      >
        <Link
          href="/blog"
          style={{
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
            color: "rgba(118,219,219,0.6)",
            letterSpacing: "1px",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#76dbdb")}
          onMouseOut={(e) =>
            (e.currentTarget.style.color = "rgba(118,219,219,0.6)")
          }
        >
          Articles
        </Link>

        <div
          style={{
            width: "1px",
            height: "14px",
            background: "rgba(118,219,219,0.15)",
          }}
        />

        <Link
          href="/"
          style={{
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
            color: "rgba(118,219,219,0.6)",
            letterSpacing: "1px",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#f75082")}
          onMouseOut={(e) =>
            (e.currentTarget.style.color = "rgba(118,219,219,0.6)")
          }
        >
          Back to Portfolio
        </Link>
      </div>
    </nav>
  );
}