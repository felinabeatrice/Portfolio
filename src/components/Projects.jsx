"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import projects from "@/data/projects";

// Slight gradient variations per card (same colors, different angle/stops)
const cardGradients = [
  "linear-gradient(135deg, #604285 0%, #f75082 100%)",
  "linear-gradient(225deg, #f75082 0%, #604285 100%)",
  "linear-gradient(315deg, #604285 0%, #f75082 60%, #604285 100%)",
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        minHeight: "100vh",
        padding: "100px 80px",
        background: "#271a38",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
        scrollMarginTop: "80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(247,80,130,0.12) 0%, transparent 70%)",
          top: "20%",
          left: "-200px",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(118,219,219,0.1) 0%, transparent 70%)",
          bottom: "10%",
          right: "-150px",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <p
          style={{
            color: "#f75082",
            letterSpacing: "3px",
            fontSize: "12px",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: 700,
          }}
        >
          What I've Built
        </p>

        <h2
          style={{
            fontSize: "clamp(40px, 5vw, 60px)",
            fontWeight: 400,
            margin: "0 0 16px 0",
            color: "#76dbdb",
            letterSpacing: "2px",
            lineHeight: 1.2,
            fontFamily: "var(--font-bitcount), monospace",
          }}
        >
          My Projects
        </h2>

        <p
          style={{
            color: "rgba(118,219,219,0.6)",
            fontSize: "15px",
            marginBottom: "60px",
            maxWidth: "550px",
            lineHeight: 1.8,
          }}
        >
          Hover a project to reveal the details.
        </p>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              gradient={cardGradients[i % cardGradients.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── ProjectCard ─────────── */

function ProjectCard({ project, gradient }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        height: "340px",
        border: hovered
          ? "1px solid #f75082"
          : "1px solid rgba(118,219,219,0.18)",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(247,80,130,0.3), 0 0 80px rgba(247,80,130,0.15)"
          : "none",
      }}
    >
      {/* Gradient Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: gradient,
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.5s ease",
          zIndex: 0,
        }}
      />

      {/* Decorative shape inside gradient */}
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)",
          top: "-50px",
          right: "-50px",
          filter: "blur(20px)",
          zIndex: 1,
        }}
      />

      {/* Faint Default Title (Bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 24px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(39,26,56,0.7) 100%)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.5px",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            margin: "4px 0 0 0",
            color: "rgba(255,255,255,0.7)",
            fontSize: "12px",
            letterSpacing: "1px",
          }}
        >
          {project.year}
        </p>
      </div>

      {/* Hover Overlay (Glass Reveal) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background:
            "linear-gradient(180deg, rgba(39,26,56,0.4) 0%, rgba(39,26,56,0.95) 100%)",
          backdropFilter: "blur(8px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 3,
        }}
      >
        {/* Top Right Arrow */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f75082",
            color: "#271a38",
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "translate(0,0) rotate(0deg)"
              : "translate(8px,-8px) rotate(-15deg)",
            transition: "all 0.4s ease 0.1s",
          }}
        >
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </div>

        {/* Year Badge */}
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "4px 12px",
            borderRadius: "50px",
            background: "rgba(247,80,130,0.18)",
            border: "1px solid rgba(247,80,130,0.5)",
            marginBottom: "14px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.4s ease 0.1s",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "#f75082",
              letterSpacing: "1.5px",
              fontWeight: 700,
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            margin: "0 0 10px 0",
            fontSize: "22px",
            fontWeight: 700,
            color: "#76dbdb",
            letterSpacing: "0.5px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.4s ease 0.15s",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: "0 0 18px 0",
            color: "rgba(118,219,219,0.85)",
            fontSize: "13px",
            lineHeight: 1.6,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.4s ease 0.2s",
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.4s ease 0.25s",
          }}
        >
          {project.tech.map(({ name, icon: Icon, color }) => (
            <span
              key={name}
              title={name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 10px",
                borderRadius: "50px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#76dbdb",
                background: "rgba(118,219,219,0.08)",
                border: "1px solid rgba(118,219,219,0.25)",
              }}
            >
              <Icon size={12} color={color} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}