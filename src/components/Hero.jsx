"use client";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 80px",
        background: "#05050f",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Glow Top Left */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          top: "-100px",
          left: "-100px",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      {/* Glow Bottom Right */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)",
          bottom: "-80px",
          right: "-80px",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT — Text */}
        <div style={{ flex: 1 }}>

          {/* Available Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "50px",
              border: "1px solid rgba(139,92,246,0.3)",
              background: "rgba(139,92,246,0.08)",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#06b6d4",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "#06b6d4",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Available for work
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "0 0 8px 0",
              color: "#f1f5f9",
              letterSpacing: "-1px",
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Felina
            </span>
          </h1>

          {/* Typing Animation */}
          <div
            style={{
              fontSize: "clamp(18px, 2.5vw, 28px)",
              fontWeight: 600,
              color: "#8b5cf6",
              marginBottom: "24px",
              minHeight: "40px",
            }}
          >
            <TypeAnimation
              sequence={[
                "PERN Stack Developer",
                2000,
                "Building Scalable Web Apps...",
                2000,
                "Crafting Clean UI/UX...",
                2000,
                "Turning Ideas Into Reality...",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "15px",
              color: "#64748b",
              lineHeight: 1.9,
              maxWidth: "500px",
              marginBottom: "40px",
            }}
          >
            I Build scalable web experiences with a focus on{" "}
            <span style={{ color: "#94a3b8" }}>performance</span>,{" "}
            <span style={{ color: "#94a3b8" }}>usability</span>, and{" "}
            <span style={{ color: "#94a3b8" }}>modern design</span>.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                padding: "14px 32px",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                color: "#fff",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.5px",
                transition: "opacity 0.3s, transform 0.3s",
                display: "inline-block",
              }}
              onMouseOver={(e) => {
                e.target.style.opacity = "0.88";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.opacity = "1";
                e.target.style.transform = "translateY(0)";
              }}
            >
              See My Work →
            </a>

            <a
              href="#contact"
              style={{
                padding: "14px 32px",
                background: "transparent",
                color: "#e2e8f0",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.5px",
                border: "1px solid rgba(139,92,246,0.35)",
                transition: "border 0.3s, transform 0.3s",
                display: "inline-block",
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = "#8b5cf6";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = "rgba(139,92,246,0.35)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#334155", fontSize: "12px" }}>
              FIND ME ON
            </span>
            <div
              style={{
                height: "1px",
                width: "30px",
                background: "rgba(139,92,246,0.3)",
              }}
            />
            {["GitHub", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  color: "#475569",
                  fontSize: "12px",
                  textDecoration: "none",
                  letterSpacing: "1px",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.color = "#8b5cf6")}
                onMouseOut={(e) => (e.target.style.color = "#475569")}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — FBN Glowing Circle */}
        <div
          style={{
            flex: "0 0 380px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Outer Ring */}
          <div
            style={{
              width: "340px",
              height: "340px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(6,182,212,0.15))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              border: "1px solid rgba(139,92,246,0.2)",
              boxShadow:
                "0 0 60px rgba(139,92,246,0.15), 0 0 120px rgba(6,182,212,0.08)",
            }}
          >
            {/* Inner Circle */}
            <div
              style={{
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "rgba(5,5,16,0.8)",
                border: "1px solid rgba(6,182,212,0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              {/* FBN Initials */}
              <span
                style={{
                  fontSize: "72px",
                  fontWeight: 800,
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-2px",
                }}
              >
                FBN
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  letterSpacing: "3px",
                }}
              >
                .dev
              </span>
            </div>

            {/* Badge Top Right */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "10px",
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
                borderRadius: "10px",
                padding: "8px 14px",
                fontSize: "12px",
                color: "#c4b5fd",
                backdropFilter: "blur(10px)",
              }}
            >
              ⚡ PERN Stack
            </div>

            {/* Badge Bottom Left */}
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: "0px",
                background: "rgba(6,182,212,0.12)",
                border: "1px solid rgba(6,182,212,0.25)",
                borderRadius: "10px",
                padding: "8px 14px",
                fontSize: "12px",
                color: "#67e8f9",
                backdropFilter: "blur(10px)",
              }}
            >
              🚀 Open to Work
            </div>
          </div>
        </div>
      </div>

      {/* Pulse Keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}