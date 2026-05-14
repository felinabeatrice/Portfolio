"use client";
import Link from "next/link";

export default function BlogFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(118,219,219,0.08)",
        padding: "32px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        fontFamily: "var(--font-manrope), sans-serif",
        background: "#271a38",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "rgba(118,219,219,0.3)",
          letterSpacing: "0.3px",
        }}
      >
        © 2026 — Felina Beatrice
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Link
          href="/blog"
          style={{
            textDecoration: "none",
            fontSize: "13px",
            color: "rgba(118,219,219,0.4)",
            letterSpacing: "0.5px",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#76dbdb")}
          onMouseOut={(e) =>
            (e.currentTarget.style.color = "rgba(118,219,219,0.4)")
          }
        >
          Articles
        </Link>

        <Link
          href="/"
          style={{
            textDecoration: "none",
            fontSize: "13px",
            color: "rgba(118,219,219,0.4)",
            letterSpacing: "0.5px",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#f75082")}
          onMouseOut={(e) =>
            (e.currentTarget.style.color = "rgba(118,219,219,0.4)")
          }
        >
          Portfolio
        </Link>
      </div>
    </footer>
  );
}
