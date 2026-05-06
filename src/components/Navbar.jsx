"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        padding: "18px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        background: scrolled
          ? "rgba(5,5,16,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(139,92,246,0.15)"
          : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontSize: "20px",
          fontWeight: 800,
          letterSpacing: "1px",
          background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          cursor: "pointer",
        }}
      >
        FBN.dev
      </span>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "36px" }}>
        {["home", "about", "skills", "projects", "contact"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            style={{
              color: "#94a3b8",
              textDecoration: "none",
              fontSize: "13px",
              textTransform: "capitalize",
              letterSpacing: "1.5px",
              fontWeight: 500,
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.color = "#8b5cf6")}
            onMouseOut={(e) => (e.target.style.color = "#94a3b8")}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}