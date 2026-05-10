"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButtonBottom() {
  return (
    <Link
      href="/#blog"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "48px",
        padding: "12px 24px",
        borderRadius: "50px",
        border: "1px solid rgba(118,219,219,0.25)",
        color: "rgba(118,219,219,0.7)",
        textDecoration: "none",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "1px",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "#f75082";
        e.currentTarget.style.color = "#f75082";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "rgba(118,219,219,0.25)";
        e.currentTarget.style.color = "rgba(118,219,219,0.7)";
      }}
    >
      <ArrowLeft size={14} />
      Back to Notes
    </Link>
  );
}