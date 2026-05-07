"use client";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import projects from "@/data/projects";

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
      }}
    >
      {/* Background Glow */}
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
          A collection of projects where I turned ideas into functional,
          scalable, and modern web experiences.
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
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── ProjectCard ───────────── */

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const arrowRef = useRef(null);
  const spotlightRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleClick = () => {
    alert("🚧 This project is coming soon!");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "#f75082";
        e.currentTarget.style.boxShadow =
          "0 12px 40px rgba(247,80,130,0.25), 0 0 60px rgba(247,80,130,0.15)";
        if (arrowRef.current) {
          arrowRef.current.style.opacity = "1";
          arrowRef.current.style.transform =
            "translate(0, 0) rotate(0deg)";
          arrowRef.current.style.background = "#f75082";
          arrowRef.current.style.color = "#271a38";
        }
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = "1";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(118,219,219,0.18)";
        e.currentTarget.style.boxShadow = "none";
        if (arrowRef.current) {
          arrowRef.current.style.opacity = "0";
          arrowRef.current.style.transform =
            "translate(8px, -8px) rotate(-15deg)";
          arrowRef.current.style.background = "rgba(247,80,130,0.15)";
          arrowRef.current.style.color = "#f75082";
        }
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = "0";
        }
      }}
      style={{
        position: "relative",
        padding: "28px",
        borderRadius: "20px",
        background:
          "linear-gradient(135deg, rgba(118,219,219,0.04), rgba(247,80,130,0.04))",
        border: "1px solid rgba(118,219,219,0.18)",
        overflow: "hidden",
        transition:
          "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        minHeight: "320px",
      }}
    >
      {/* Cursor-following Spotlight Glow */}
      <div
        ref={spotlightRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(247,80,130,0.18), transparent 60%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Top Right Arrow Icon */}
      <div
        ref={arrowRef}
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
          background: "rgba(247,80,130,0.15)",
          border: "1px solid rgba(247,80,130,0.4)",
          color: "#f75082",
          opacity: 0,
          transform: "translate(8px, -8px) rotate(-15deg)",
          transition: "all 0.35s ease",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <ArrowUpRight size={18} strokeWidth={2.5} />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Year Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            alignSelf: "flex-start",
            padding: "4px 12px",
            borderRadius: "50px",
            background: "rgba(247,80,130,0.12)",
            border: "1px solid rgba(247,80,130,0.4)",
            marginBottom: "20px",
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
            margin: "0 0 12px 0",
            fontSize: "22px",
            fontWeight: 700,
            color: "#76dbdb",
            letterSpacing: "0.5px",
            lineHeight: 1.3,
            paddingRight: "50px", // space for arrow
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: "0 0 24px 0",
            color: "rgba(118,219,219,0.7)",
            fontSize: "14px",
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "auto",
          }}
        >
          {project.tech.map(({ name, icon: Icon, color }) => (
            <span
              key={name}
              title={name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#76dbdb",
                background: "rgba(118,219,219,0.05)",
                border: "1px solid rgba(118,219,219,0.2)",
                letterSpacing: "0.3px",
              }}
            >
              <Icon size={14} color={color} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}