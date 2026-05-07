"use client";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiGit,
  SiGithub,
} from "react-icons/si";

const marqueeItems = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
];

export default function Marquee() {
  // duplicate for seamless loop
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section
      style={{
        background: "#271a38",
        padding: "32px 0",
        borderTop: "1px solid rgba(118,219,219,0.12)",
        borderBottom: "1px solid rgba(118,219,219,0.12)",
        overflow: "hidden",
        position: "relative",
        fontFamily: "var(--font-manrope), sans-serif",
      }}
    >
      {/* Fade Edges */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "120px",
          height: "100%",
          background:
            "linear-gradient(90deg, #271a38 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "100%",
          background:
            "linear-gradient(-90deg, #271a38 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Marquee Track */}
      <div
        style={{
          display: "flex",
          gap: "48px",
          width: "max-content",
          animation: "marqueeScroll 30s linear infinite",
        }}
      >
        {items.map(({ name, icon: Icon, color }, i) => (
          <div
            key={`${name}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              color: "#76dbdb",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              flexShrink: 0,
            }}
          >
            <Icon size={22} color={color} />
            <span>{name}</span>
            <span
              style={{
                color: "#f75082",
                fontSize: "20px",
                marginLeft: "12px",
              }}
            >
              •
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}