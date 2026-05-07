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
        background: scrolled ? "rgba(39,26,56,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(118,219,219,0.2)"
          : "none",
        transition: "all 0.4s ease",
        fontFamily: "var(--font-manrope), sans-serif",
      }}
    >
      <span
        style={{
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "1px",
          color: "#f75082",
          cursor: "pointer",
        }}
      >
        FBN.dev
      </span>

      <div style={{ display: "flex", gap: "36px" }}>
        {["intro", "about", "skills", "projects", "contact"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            style={{
              color: "#76dbdb",
              textDecoration: "none",
              fontSize: "14px",
              textTransform: "capitalize",
              letterSpacing: "1.5px",
              fontWeight: 500,
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.color = "#f75082")}
            onMouseOut={(e) => (e.target.style.color = "#76dbdb")}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}