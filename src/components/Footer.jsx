"use client";
import { useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import useBreakpoint from "@/hooks/useBreakpoint";

const socials = [
  { icon: FaGithub, href: "https://github.com/felinabeatrice", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/in/felinabeatricenm", label: "LinkedIn" },
  { icon: Mail, href: "mailto:felinabeatricenm@gmail.com", label: "Email" },
];

export default function Footer() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isSmall = isMobile || isTablet;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        background: "#1a0f28",
        padding: isMobile ? "28px 24px" : isTablet ? "28px 40px" : "32px 60px",
        borderTop: "1px solid rgba(118,219,219,0.1)",
        fontFamily: "var(--font-manrope), sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          alignItems: isSmall ? "center" : "center",
          justifyContent: isSmall ? "center" : "space-between",
          gap: isSmall ? "20px" : "20px",
          textAlign: isSmall ? "center" : "left",
        }}
      >
        {/* Logo + Tagline + Arcade */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: isSmall ? "center" : "flex-start",
          }}
        >
          <a
            href="#intro"
            style={{
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: 800,
              letterSpacing: "1px",
              color: "#76dbdb",
            }}
          >
            [F]elina
          </a>

          {!isMobile && (
            <span style={{ color: "rgba(118,219,219,0.4)", fontSize: "13px" }}>
              • Building scalable web experiences
            </span>
          )}

          <ArcadeLink />
        </div>

        {/* Copyright */}
        <p
          style={{
            margin: 0,
            color: "rgba(118,219,219,0.55)",
            fontSize: "13px",
            letterSpacing: "0.3px",
          }}
        >
          © 2026 — Crafted by Felina Beatrice
        </p>

        {/* Socials + Back to top */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {socials.map(({ icon: Icon, href, label }) => (
            <FooterIcon key={label} Icon={Icon} href={href} label={label} />
          ))}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(247,80,130,0.12)",
              border: "1px solid rgba(247,80,130,0.4)",
              color: "#f75082",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
              marginLeft: "4px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f75082";
              e.currentTarget.style.color = "#1a0f28";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(247,80,130,0.12)";
              e.currentTarget.style.color = "#f75082";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

function ArcadeLink() {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <style>{`
        @keyframes arcadePulse {
          0%, 100% { box-shadow: 0 0 8px rgba(247,80,130,0.15); }
          50% { box-shadow: 0 0 18px rgba(247,80,130,0.35); }
        }
      `}</style>
      <Link
        href="/game"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 12px",
          borderRadius: "20px",
          background: hovered ? "rgba(247,80,130,0.15)" : "rgba(118,219,219,0.05)",
          border: hovered ? "1px solid rgba(247,80,130,0.4)" : "1px solid rgba(247,80,130,0.2)",
          color: hovered ? "#f75082" : "rgba(247,80,130,0.6)",
          textDecoration: "none",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "1px",
          transition: "all 0.3s ease",
          animation: "arcadePulse 2.5s ease-in-out infinite",
        }}
      >
        🕹️ Arcade
      </Link>
    </>
  );
}

function FooterIcon({ Icon, href, label }) {
  const [hovered, setHovered] = useState(false);
  const isEmail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hovered ? "rgba(247,80,130,0.15)" : "rgba(118,219,219,0.05)",
        border: hovered ? "1px solid #f75082" : "1px solid rgba(118,219,219,0.2)",
        color: hovered ? "#f75082" : "rgba(118,219,219,0.7)",
        textDecoration: "none",
        transition: "all 0.3s",
      }}
    >
      <Icon size={15} />
    </a>
  );
}