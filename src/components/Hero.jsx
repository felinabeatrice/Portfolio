"use client";
import { TypeAnimation } from "react-type-animation";
import ColorBends from "./ColorBends";

export default function Hero() {
  return (
    <section
      id="intro"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 80px",
        background: "#271a38",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
      }}
    >
      {/* ColorBends Animation Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.55,
        }}
      >
        <ColorBends
          colors={["#271a38", "#76dbdb", "#f75082"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={0.8}
          bandWidth={6}
          transparent
          autoRotate={0}
        />
      </div>

      {/* Dark Overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(39,26,56,0.65) 0%, rgba(39,26,56,0.45) 100%)",
          zIndex: 1,
          pointerEvents: "none",
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
          zIndex: 2,
        }}
      >
        {/* LEFT */}
        <div style={{ flex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "50px",
              border: "1px solid rgba(247,80,130,0.5)",
              background: "rgba(247,80,130,0.12)",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#f75082",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "#f75082",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Available for work
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: 400,
              lineHeight: 1.1,
              margin: "0 0 16px 0",
              color: "#76dbdb",
              letterSpacing: "2px",
              fontFamily: "var(--font-bitcount), monospace",
            }}
          >
            Hi, I'm Felina
          </h1>

          {/* Typing */}
          <div
            style={{
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 600,
              color: "#f75082",
              marginBottom: "24px",
              minHeight: "40px",
              letterSpacing: "0.5px",
            }}
          >
            <TypeAnimation
              sequence={[
                "PERN Stack Developer",
                2000,
                "Building Scalable Web Apps...",
                2000,
                "Using Next.js",
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
              color: "rgba(118,219,219,0.8)",
              lineHeight: 1.9,
              maxWidth: "500px",
              marginBottom: "40px",
            }}
          >
            I Build scalable web experiences with a focus on{" "}
            <span style={{ color: "#76dbdb", fontWeight: 700 }}>
              performance
            </span>
            ,{" "}
            <span style={{ color: "#76dbdb", fontWeight: 700 }}>
              usability
            </span>
            , and{" "}
            <span style={{ color: "#76dbdb", fontWeight: 700 }}>
              modern design
            </span>
            .
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                padding: "14px 32px",
                background: "#f75082",
                color: "#271a38",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.5px",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.opacity = "0.85";
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
                color: "#76dbdb",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.5px",
                border: "1px solid #76dbdb",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#76dbdb";
                e.target.style.color = "#271a38";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#76dbdb";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Contact Me
            </a>
          </div>

          {/* Social */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(118,219,219,0.5)",
                fontSize: "12px",
                letterSpacing: "1px",
              }}
            >
              FIND ME ON
            </span>
            <div
              style={{
                height: "1px",
                width: "30px",
                background: "rgba(118,219,219,0.4)",
              }}
            />
            {["GitHub", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  color: "rgba(118,219,219,0.7)",
                  fontSize: "12px",
                  textDecoration: "none",
                  letterSpacing: "1px",
                  transition: "color 0.3s",
                  fontWeight: 600,
                }}
                onMouseOver={(e) => (e.target.style.color = "#f75082")}
                onMouseOut={(e) =>
                  (e.target.style.color = "rgba(118,219,219,0.7)")
                }
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — Photo Circle */}
        <div
          style={{
            flex: "0 0 380px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 80px rgba(247,80,130,0.4), 0 0 160px rgba(118,219,219,0.15)",
              border: "1px solid rgba(247,80,130,0.5)",
              background:
                "linear-gradient(135deg, rgba(247,80,130,0.2), rgba(118,219,219,0.1))",
            }}
          >
            <div
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid rgba(118,219,219,0.2)",
                position: "relative",
                background:
                  "linear-gradient(135deg, #3a2659 0%, #271a38 50%, #1a0f28 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(247,80,130,0.4) 0%, transparent 70%)",
                  top: "-40px",
                  left: "-40px",
                  filter: "blur(30px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(118,219,219,0.25) 0%, transparent 70%)",
                  bottom: "-40px",
                  right: "-40px",
                  filter: "blur(30px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(247,80,130,0.25) 0%, rgba(118,219,219,0.15) 50%, transparent 70%)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  filter: "blur(20px)",
                }}
              />
              {/*
                TO ADD YOUR PHOTO LATER:
                <img
                  src="/assets/your-photo.png"
                  alt="Felina"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              */}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}