"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import useBreakpoint from "@/hooks/useBreakpoint";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile" || breakpoint === "tablet";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const navHeight = 80;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          padding: isMobile ? "16px 24px" : "18px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          background:
            scrolled || menuOpen
              ? "rgba(39,26,56,0.95)"
              : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
          borderBottom:
            scrolled || menuOpen
              ? "1px solid rgba(118,219,219,0.2)"
              : "none",
          transition: "all 0.4s ease",
          fontFamily: "var(--font-manrope), sans-serif",
        }}
      >
        {/* Logo */}
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

        {/* Desktop Nav */}
        {!isMobile && (
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
            <ArcadePill />
          </div>
        )}

        {/* Hamburger Button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              zIndex: 1100,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  background: "#76dbdb",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform:
                    menuOpen && i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : menuOpen && i === 2
                      ? "translateY(-7px) rotate(-45deg)"
                      : menuOpen && i === 1
                      ? "opacity 0 scaleX(0)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile Drawer */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            pointerEvents: menuOpen ? "all" : "none",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(26,15,40,0.7)",
              backdropFilter: "blur(4px)",
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Drawer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "75vw",
              maxWidth: "320px",
              height: "100vh",
              background: "#1a0f28",
              borderLeft: "1px solid rgba(118,219,219,0.15)",
              padding: "100px 32px 48px 32px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              transform: menuOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {navLinks.map(({ id, label }, i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleLinkClick(e, id)}
                style={{
                  color: "#76dbdb",
                  textDecoration: "none",
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(118,219,219,0.08)",
                  transition: "color 0.3s",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen
                    ? "translateX(0)"
                    : "translateX(20px)",
                  transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "#f75082")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "#76dbdb")
                }
              >
                {label}
              </a>
            ))}

            <div style={{ marginTop: "24px" }}>
              <ArcadePill />
            </div>
          </div>
        </div>
      )}
    </>
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
        boxShadow: hovered ? "0 0 16px rgba(247,80,130,0.2)" : "none",
      }}
    >
      🕹️ Arcade
    </Link>
  );
}