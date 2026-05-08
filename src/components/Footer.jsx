"use client";
import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Mail } from "lucide-react";

const socials = [
  { icon: FaGithub, href: "https://github.com/felinabeatrice", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/in/felinabeatricenm", label: "LinkedIn" },
  { icon: Mail, href: "mailto:felinabeatricenm@gmail.com", label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#1a0f28",
        padding: "32px 60px",
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
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Logo + Tagline */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* [F]elina Logo */}
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

          <span
            style={{
              color: "rgba(118,219,219,0.4)",
              fontSize: "13px",
              letterSpacing: "0.3px",
            }}
          >
            • Building scalable web experiences
          </span>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <FooterIcon
              key={label}
              Icon={Icon}
              href={href}
              label={label}
            />
          ))}

          {/* Back to Top */}
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
              marginLeft: "8px",
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
        background: hovered
          ? "rgba(247,80,130,0.15)"
          : "rgba(118,219,219,0.05)",
        border: hovered
          ? "1px solid #f75082"
          : "1px solid rgba(118,219,219,0.2)",
        color: hovered ? "#f75082" : "rgba(118,219,219,0.7)",
        textDecoration: "none",
        transition: "all 0.3s",
      }}
    >
      <Icon size={15} />
    </a>
  );
}