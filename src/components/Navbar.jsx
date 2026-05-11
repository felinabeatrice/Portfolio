"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { id: "intro", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const navHeight = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

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
      {/* [F]elina Logo */}
      <a
        href="#intro"
        onClick={(e) => handleLinkClick(e, "intro")}
        style={{
          textDecoration: "none",
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "1px",
          cursor: "pointer",
          color: "#76dbdb",
        }}
      >
        [F]elina
      </a>

      {/* Nav Links + Arcade */}
      <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
        {navLinks.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleLinkClick(e, id)}
            style={{
              color: "#76dbdb",
              textDecoration: "none",
              fontSize: "14px",
              letterSpacing: "1.5px",
              fontWeight: 500,
              transition: "color 0.3s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.color = "#f75082")}
            onMouseOut={(e) => (e.target.style.color = "#76dbdb")}
          >
            {label}
          </a>
        ))}

        {/* Arcade pill */}
        <ArcadePill />
      </div>
    </nav>
  );
}

function ArcadePill() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/game"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 14px",
        borderRadius: "20px",
        background: hovered
          ? "rgba(247,80,130,0.15)"
          : "rgba(118,219,219,0.05)",
        border: hovered
          ? "1px solid rgba(247,80,130,0.5)"
          : "1px solid rgba(118,219,219,0.2)",
        color: hovered ? "#f75082" : "rgba(118,219,219,0.6)",
        textDecoration: "none",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "1px",
        transition: "all 0.3s ease",
        boxShadow: hovered
          ? "0 0 16px rgba(247,80,130,0.2)"
          : "none",
      }}
    >
      🕹️ Arcade
    </Link>
  );
}