"use client";
import CircularText from "./CircularText";
import RevealSection from "./RevealSection";
import RevealItem from "./RevealItem";
import SectionHeader from "./SectionHeader";
import useBreakpoint from "@/hooks/useBreakpoint";

export default function About() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isSmall = isMobile || isTablet;

  const circleOuter = isMobile ? 180 : isTablet ? 260 : 320;
  const circleInner = isMobile ? 145 : isTablet ? 215 : 270;
  const containerHeight = isMobile ? 240 : isTablet ? 360 : 460;

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: isMobile
          ? "80px 24px"
          : isTablet
          ? "80px 40px"
          : "100px 80px",
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
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(247,80,130,0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <RevealSection
        style={{
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isSmall ? "center" : "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: isSmall ? "48px" : "80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT — Text */}
        <div style={{ flex: 1, width: "100%" }}>
          <SectionHeader label="Who I Am" title="About Me" align="left" />

          {[
            "I'm a Full Stack Developer passionate about building fast, scalable, and user-friendly web applications.",
            "I enjoy transforming ideas into clean digital experiences with modern technologies and intuitive design.",
            "Focused on continuous learning, performance, and writing clean, maintainable code.",
          ].map((text, i) => (
            <RevealItem
              key={i}
              delay={300 + i * 80}
              distance={14}
              duration={500}
            >
              <p
                style={{
                  color: "rgba(118,219,219,0.75)",
                  fontSize: "15px",
                  lineHeight: 1.9,
                  margin: "0 0 14px 0",
                }}
              >
                {text}
              </p>
            </RevealItem>
          ))}

          {/* Stat Cards */}
          <div
            style={{
              display: "flex",
              gap: isMobile ? "12px" : "24px",
              flexWrap: "wrap",
              marginBottom: "36px",
            }}
          >
            {[
              { num: "3rd", label: "Year Student" },
              { num: "2025", label: "Started Dev Journey" },
              { num: "8+", label: "Technologies" },
            ].map(({ num, label }, i) => (
              <RevealItem
                key={label}
                delay={640 + i * 80}
                distance={16}
                duration={500}
              >
                <div
                  style={{
                    padding: isMobile ? "14px 18px" : "20px 28px",
                    borderRadius: "14px",
                    background: "rgba(118,219,219,0.05)",
                    border: "1px solid rgba(118,219,219,0.2)",
                    textAlign: "center",
                    minWidth: isMobile ? "80px" : "100px",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: isMobile ? "24px" : "32px",
                      fontWeight: 800,
                      color: "#f75082",
                    }}
                  >
                    {num}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "rgba(118,219,219,0.6)",
                      fontSize: "11px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>

          {/* Resume Button */}
          <RevealItem delay={880} distance={14} duration={500}>
            <a
              href="/resume.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "50px",
                background: "transparent",
                border: "1px solid #f75082",
                color: "#f75082",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "1px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "var(--font-manrope), sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f75082";
                e.currentTarget.style.color = "#271a38";
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(247,80,130,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#f75082";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </RevealItem>
        </div>

        {/* RIGHT — Circle */}
        <RevealItem
          delay={400}
          distance={20}
          duration={600}
          style={{
            flex: isSmall ? "none" : "0 0 460px",
            width: isSmall ? "100%" : "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              height: `${containerHeight}px`,
            }}
          >
            {/* CircularText — scaled down on mobile */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: isMobile
                  ? "scale(0.52)"
                  : isTablet
                  ? "scale(0.75)"
                  : "scale(1)",
                pointerEvents: isMobile ? "none" : "auto",
              }}
            >
              <CircularText
                text="[F]elina • DEVELOPER • [F]elina • DEVELOPER • "
                spinDuration={25}
                onHover="speedUp"
              />
            </div>

            <div
              style={{
                width: `${circleOuter}px`,
                height: `${circleOuter}px`,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, rgba(247,80,130,0.25), rgba(118,219,219,0.12))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxShadow:
                  "0 0 80px rgba(247,80,130,0.3), 0 0 160px rgba(118,219,219,0.1)",
                border: "1px solid rgba(247,80,130,0.4)",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: `${circleInner}px`,
                  height: `${circleInner}px`,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #3a2659 0%, #271a38 50%, #1a0f28 100%)",
                  border: "1px solid rgba(118,219,219,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "150px",
                    height: "150px",
                    background:
                      "radial-gradient(circle, rgba(247,80,130,0.4), transparent 70%)",
                    top: "10px",
                    left: "20px",
                    filter: "blur(30px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "150px",
                    height: "150px",
                    background:
                      "radial-gradient(circle, rgba(118,219,219,0.2), transparent 70%)",
                    bottom: "10px",
                    right: "20px",
                    filter: "blur(30px)",
                  }}
                />
                <span
                  style={{
                    fontSize: isMobile ? "24px" : "40px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  📷
                </span>
                <span
                  style={{
                    fontSize: isMobile ? "9px" : "11px",
                    color: "rgba(118,219,219,0.6)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    position: "relative",
                    zIndex: 1,
                    fontWeight: 700,
                    textAlign: "center",
                    padding: "0 12px",
                  }}
                >
                  Photo Coming Soon
                </span>
              </div>
            </div>
          </div>
        </RevealItem>
      </RevealSection>
    </section>
  );
}