"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <>
      {/* Top back link */}
      <Link
        href="/#blog"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "rgba(118,219,219,0.6)",
          textDecoration: "none",
          fontSize: "13px",
          letterSpacing: "1px",
          fontWeight: 600,
          marginBottom: "48px",
          transition: "color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = "#f75082")}
        onMouseOut={(e) =>
          (e.currentTarget.style.color = "rgba(118,219,219,0.6)")
        }
      >
        <ArrowLeft size={15} />
        Back to Notes
      </Link>
    </>
  );
}