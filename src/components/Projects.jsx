"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import projects from "@/data/projects";

/* ── Distinct cover art per project ── */
function LearnHubCover() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #1a0f28 0%, #2d1b45 50%, #3a1f52 100%)",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Grid lines */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`h${i}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${15 + i * 14}%`,
            height: "1px",
            background: "rgba(118,219,219,0.06)",
          }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <div
          key={`v${i}`}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${8 + i * 12}%`,
            width: "1px",
            background: "rgba(118,219,219,0.05)",
          }}
        />
      ))}

      {/* Dashboard panels */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "8%",
          width: "38%",
          height: "22%",
          borderRadius: "8px",
          background: "rgba(118,219,219,0.07)",
          border: "1px solid rgba(118,219,219,0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          width: "42%",
          height: "22%",
          borderRadius: "8px",
          background: "rgba(247,80,130,0.07)",
          border: "1px solid rgba(247,80,130,0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "8%",
          width: "84%",
          height: "14%",
          borderRadius: "8px",
          background: "rgba(118,219,219,0.04)",
          border: "1px solid rgba(118,219,219,0.1)",
        }}
      />
      {/* Progress bars inside panel */}
      {[70, 45, 85].map((w, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${65 + i * 8}%`,
            left: "12%",
            width: `${w}%`,
            height: "3px",
            borderRadius: "4px",
            background:
              i % 2 === 0
                ? "rgba(118,219,219,0.25)"
                : "rgba(247,80,130,0.2)",
          }}
        />
      ))}

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(118,219,219,0.12), transparent 70%)",
          top: "-60px",
          right: "-60px",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

function PortfolioCover() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, #2a1040 0%, #3d1a55 60%, #271a38 100%)",
        zIndex: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Big faint [F] */}
      <span
        style={{
          fontSize: "140px",
          fontWeight: 900,
          color: "rgba(118,219,219,0.06)",
          fontFamily: "monospace",
          letterSpacing: "-4px",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        [F]
      </span>

      {/* Layered lines */}
      {[20, 40, 60, 80].map((top, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "10%",
            top: `${top}%`,
            width: `${30 + i * 12}%`,
            height: "1px",
            background: "rgba(247,80,130,0.08)",
          }}
        />
      ))}

      {/* Small brand dots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: `${20 + i * 12}%`,
            right: "12%",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background:
              i === 0
                ? "rgba(247,80,130,0.5)"
                : "rgba(118,219,219,0.2)",
          }}
        />
      ))}

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(247,80,130,0.15), transparent 70%)",
          bottom: "-40px",
          left: "-40px",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

function CourierCover() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, #1c1030 0%, #271a38 50%, #2a1535 100%)",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Route path SVG */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.25,
        }}
        viewBox="0 0 300 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M 30 160 C 80 160, 80 80, 150 80 S 220 40, 270 40"
          stroke="#76dbdb"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
        />
        <path
          d="M 30 120 C 70 120, 120 140, 180 100 S 240 60, 270 80"
          stroke="#f75082"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 4"
          opacity="0.6"
        />
        {/* Nodes */}
        {[
          [30, 160], [150, 80], [270, 40],
          [30, 120], [180, 100], [270, 80],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill={i % 2 === 0 ? "#76dbdb" : "#f75082"}
            opacity="0.6"
          />
        ))}
      </svg>

      {/* Status chips */}
      {["In Transit", "Delivered", "Pending"].map((label, i) => (
        <div
          key={label}
          style={{
            position: "absolute",
            top: `${20 + i * 22}%`,
            right: "10%",
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "1px",
            color:
              i === 0
                ? "#76dbdb"
                : i === 1
                ? "#f75082"
                : "rgba(118,219,219,0.5)",
            border: `1px solid ${
              i === 0
                ? "rgba(118,219,219,0.25)"
                : i === 1
                ? "rgba(247,80,130,0.25)"
                : "rgba(118,219,219,0.1)"
            }`,
            background: "rgba(39,26,56,0.6)",
            fontFamily: "monospace",
          }}
        >
          {label}
        </div>
      ))}

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(118,219,219,0.1), transparent 70%)",
          top: "-40px",
          left: "-40px",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

const coverMap = {
  LearnHub: LearnHubCover,
  Portfolio: PortfolioCover,
  "Courier Management System": CourierCover,
};

/* ── Featured Card (LearnHub) ── */
function FeaturedCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const Cover = coverMap[project.title];

  const cardContent = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: project.githubUrl ? "pointer" : "default",
        height: "100%",
        border: hovered
          ? "1px solid #76dbdb"
          : "1px solid rgba(118,219,219,0.18)",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 60px rgba(118,219,219,0.2), 0 0 100px rgba(118,219,219,0.1)"
          : "none",
      }}
    >
      {/* Cover art */}
      {Cover && <Cover />}

      {/* Default title */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "28px 32px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(26,15,40,0.85) 100%)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 12px",
            borderRadius: "50px",
            background: "rgba(118,219,219,0.1)",
            border: "1px solid rgba(118,219,219,0.3)",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: "#76dbdb",
              letterSpacing: "2px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Featured Project
          </span>
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.5px",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            margin: "6px 0 0 0",
            color: "rgba(255,255,255,0.6)",
            fontSize: "12px",
            letterSpacing: "1px",
          }}
        >
          {project.year}
        </p>
      </div>

      {/* Hover overlay — richer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background:
            "linear-gradient(180deg, rgba(26,15,40,0.3) 0%, rgba(26,15,40,0.97) 100%)",
          backdropFilter: "blur(10px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 3,
        }}
      >
        {/* Arrow */}
        {project.githubUrl && (
          <div
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#76dbdb",
              color: "#1a0f28",
              opacity: hovered ? 1 : 0,
              transform: hovered
                ? "translate(0,0) rotate(0deg)"
                : "translate(8px,-8px) rotate(-15deg)",
              transition: "all 0.4s ease 0.1s",
            }}
          >
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </div>
        )}

        {/* Featured badge */}
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "4px 14px",
            borderRadius: "50px",
            background: "rgba(118,219,219,0.12)",
            border: "1px solid rgba(118,219,219,0.4)",
            marginBottom: "16px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.4s ease 0.05s",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: "#76dbdb",
              letterSpacing: "2px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {project.year} · Featured
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "28px",
            fontWeight: 700,
            color: "#76dbdb",
            letterSpacing: "0.5px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.4s ease 0.12s",
          }}
        >
          {project.title}
        </h3>

        {/* Description — full */}
        <p
          style={{
            margin: "0 0 20px 0",
            color: "rgba(118,219,219,0.85)",
            fontSize: "14px",
            lineHeight: 1.7,
            maxWidth: "480px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.4s ease 0.18s",
          }}
        >
          {project.description}
        </p>

        {/* Tech — all chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.4s ease 0.24s",
          }}
        >
          {project.tech.map(({ name, icon: Icon, color }) => (
            <span
              key={name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#76dbdb",
                background: "rgba(118,219,219,0.08)",
                border: "1px solid rgba(118,219,219,0.25)",
              }}
            >
              <Icon size={13} color={color} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (project.githubUrl) {
    return (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block", height: "100%" }}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

/* ── Small Card (Portfolio / Courier) ── */
function SmallCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const Cover = coverMap[project.title];

  const cardContent = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: project.githubUrl ? "pointer" : "default",
        height: "100%",
        border: hovered
          ? "1px solid rgba(247,80,130,0.5)"
          : "1px solid rgba(118,219,219,0.15)",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(247,80,130,0.15)"
          : "none",
      }}
    >
      {/* Cover art */}
      {Cover && <Cover />}

      {/* Default title */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 20px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(26,15,40,0.8) 100%)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "15px",
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
            margin: "3px 0 0 0",
            color: "rgba(255,255,255,0.6)",
            fontSize: "11px",
            letterSpacing: "1px",
          }}
        >
          {project.year}
        </p>
      </div>

      {/* Hover overlay — simpler */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background:
            "linear-gradient(180deg, rgba(26,15,40,0.2) 0%, rgba(26,15,40,0.94) 100%)",
          backdropFilter: "blur(8px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          zIndex: 3,
        }}
      >
        {/* Arrow — only if has link */}
        {project.githubUrl && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f75082",
              color: "#271a38",
              opacity: hovered ? 1 : 0,
              transform: hovered
                ? "translate(0,0) rotate(0deg)"
                : "translate(6px,-6px) rotate(-15deg)",
              transition: "all 0.35s ease 0.08s",
            }}
          >
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </div>
        )}

        {/* Private label — Courier */}
        {!project.githubUrl && hovered && (
          <p
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              margin: 0,
              fontSize: "9px",
              color: "rgba(118,219,219,0.35)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Private
          </p>
        )}

        {/* Year */}
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "3px 10px",
            borderRadius: "50px",
            background: "rgba(247,80,130,0.12)",
            border: "1px solid rgba(247,80,130,0.35)",
            marginBottom: "10px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.35s ease 0.08s",
          }}
        >
          <span
            style={{
              fontSize: "10px",
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
            margin: "0 0 8px 0",
            fontSize: "16px",
            fontWeight: 700,
            color: "#76dbdb",
            letterSpacing: "0.5px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.35s ease 0.12s",
          }}
        >
          {project.title}
        </h3>

        {/* Short description */}
        <p
          style={{
            margin: "0 0 14px 0",
            color: "rgba(118,219,219,0.75)",
            fontSize: "12px",
            lineHeight: 1.6,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.35s ease 0.16s",
          }}
        >
          {project.shortDescription}
        </p>

        {/* Tech — first 3 chips only */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.35s ease 0.2s",
          }}
        >
          {project.tech.slice(0, 3).map(({ name, icon: Icon, color }) => (
            <span
              key={name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 9px",
                borderRadius: "50px",
                fontSize: "10px",
                fontWeight: 600,
                color: "#76dbdb",
                background: "rgba(118,219,219,0.06)",
                border: "1px solid rgba(118,219,219,0.2)",
              }}
            >
              <Icon size={11} color={color} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (project.githubUrl) {
    return (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block", height: "100%" }}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

/* ── Main Projects Section ── */
export default function Projects() {
  const featured = projects[0];
  const sideProjects = projects.slice(1);

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
      {/* Background glows */}
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

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gridTemplateRows: "auto",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          {/* Featured — left, full height */}
          <div style={{ gridRow: "1 / 3", minHeight: "500px" }}>
            <FeaturedCard project={featured} />
          </div>

          {/* Side cards — right column */}
          {sideProjects.map((project) => (
            <div key={project.title} style={{ minHeight: "235px" }}>
              <SmallCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}