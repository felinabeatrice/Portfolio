"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
const socials = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/felinabeatrice",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com/in/felinabeatricenm",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:felinabeatricenm@gmail.com",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        scrollMarginTop: "80px",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 80px",
        background: "#271a38",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
        textAlign: "center",
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(247,80,130,0.10) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Decorative Divider Above Heading */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(247,80,130,0.6)",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              color: "#f75082",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Get In Touch
          </span>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(247,80,130,0.6)",
            }}
          />
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(44px, 6vw, 72px)",
            fontWeight: 400,
            margin: "0 0 24px 0",
            color: "#76dbdb",
            letterSpacing: "2px",
            lineHeight: 1.15,
            fontFamily: "var(--font-bitcount), monospace",
          }}
        >
          Let's Work Together
        </h2>

        {/* Supporting text */}
        <p
          style={{
            color: "rgba(118,219,219,0.7)",
            fontSize: "16px",
            lineHeight: 1.8,
            maxWidth: "520px",
            marginBottom: "48px",
          }}
        >
          Open to collaborations, freelance work, and creative projects.
          Let's build something amazing together.
        </p>

        {/* CTA Button */}
        <a
          href="mailto:felinabeatricenm@gmail.com"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px 38px",
            background: "#f75082",
            color: "#271a38",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "15px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            marginBottom: "60px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 12px 30px rgba(247,80,130,0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Mail size={18} />
          Contact Me
        </a>

        {/* Social Icons */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "flex-start",
          }}
        >
          {socials.map(({ name, icon: Icon, href }) => (
            <SocialIcon key={name} name={name} Icon={Icon} href={href} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Single Social Icon ─────────── */

function SocialIcon({ name, Icon, href }) {
  const [hovered, setHovered] = useState(false);
  const isEmail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hovered
            ? "rgba(247,80,130,0.15)"
            : "rgba(118,219,219,0.05)",
          border: hovered
            ? "1px solid #f75082"
            : "1px solid rgba(118,219,219,0.25)",
          color: hovered ? "#f75082" : "#76dbdb",
          boxShadow: hovered
            ? "0 0 30px rgba(247,80,130,0.35), 0 0 60px rgba(132,0,255,0.15)"
            : "none",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.35s ease",
        }}
      >
        <Icon size={22} />
      </div>

      {/* Label — hidden by default, fades in + lifts up */}
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "1px",
          color: "#76dbdb",
          textShadow: hovered
            ? "0 0 12px rgba(132,0,255,0.6)"
            : "none",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "all 0.35s ease",
          pointerEvents: "none",
        }}
      >
        {name}
      </span>
    </a>
  );
}