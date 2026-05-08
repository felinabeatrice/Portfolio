"use client";
import { TypeAnimation } from "react-type-animation";
import ColorBends from "./ColorBends";

export default function Hero() {
  return (
    <section
      id="intro"
      style={{
        scrollMarginTop: "80px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        background: "#271a38",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
        textAlign: "center",
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

      {/* Dark Overlay */}
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

      {/* Centered Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          maxWidth: "900px",
          position: "relative",
          zIndex: 2,
        }}
      >
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
            marginBottom: "28px",
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
            fontSize: "clamp(50px, 3vw, 80px)",
            fontWeight: 400,
            lineHeight: 1.0,
            margin: "0 0 20px 0",
            color: "#76dbdb",
            letterSpacing: "2px",
            fontFamily: "var(--font-bitcount), monospace",
          }}
        >
          Hi, I'm Felina Beatrice N M
        </h1>

        {/* Typing */}
        <div
          style={{
            fontSize: "clamp(20px, 2.6vw, 30px)",
            fontWeight: 600,
            color: "#f75082",
            marginBottom: "28px",
            minHeight: "44px",
            letterSpacing: "0.5px",
          }}
        >
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "Building Scalable Web Apps...",
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
            fontSize: "16px",
            color: "rgba(118,219,219,0.8)",
            lineHeight: 1.9,
            maxWidth: "620px",
            marginBottom: "44px",
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
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
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

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "44px",
            alignItems: "center",
            justifyContent: "center",
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}