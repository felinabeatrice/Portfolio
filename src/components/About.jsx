"use client";

export default function About() {
  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "100px 80px",
        background: "#271a38",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ flex: 1 }}>
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
            Who I Am
          </p>

          <h2
            style={{
              fontSize: "clamp(40px, 5vw, 60px)",
              fontWeight: 400,
              margin: "0 0 28px 0",
              color: "#76dbdb",
              letterSpacing: "2px",
              lineHeight: 1.2,
              fontFamily: "var(--font-bitcount), monospace",
            }}
          >
            About Me
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginBottom: "32px",
            }}
          >
            {[
              "I'm a PERN Stack Developer passionate about building fast, scalable, and user-friendly web applications.",
              "I enjoy transforming ideas into clean digital experiences with modern technologies and intuitive design.",
              "Focused on continuous learning, performance, and writing clean, maintainable code.",
            ].map((text, i) => (
              <p
                key={i}
                style={{
                  color: "rgba(118,219,219,0.75)",
                  fontSize: "15px",
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                {text}
              </p>
            ))}
          </div>

          <div
            style={{
              padding: "16px 20px",
              borderRadius: "12px",
              background: "rgba(247,80,130,0.08)",
              border: "1px solid rgba(247,80,130,0.4)",
              marginBottom: "40px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "20px" }}>🚧</span>
            <div>
              <p
                style={{
                  margin: "0 0 4px 0",
                  color: "#f75082",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Currently Building
              </p>
              <p
                style={{
                  margin: 0,
                  color: "rgba(118,219,219,0.85)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                <span
                  style={{
                    color: "#76dbdb",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  LearnHub
                </span>{" "}
                — A full-stack Learning Management System built with
                PostgreSQL, Express, React & Node.js
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "3rd", label: "Year Student" },
              { num: "1+", label: "Projects Built" },
              { num: "8+", label: "Technologies" },
            ].map(({ num, label }) => (
              <div
                key={label}
                style={{
                  padding: "20px 28px",
                  borderRadius: "14px",
                  background: "rgba(118,219,219,0.05)",
                  border: "1px solid rgba(118,219,219,0.2)",
                  textAlign: "center",
                  minWidth: "100px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "32px",
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
                    fontSize: "12px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

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
              background:
                "linear-gradient(135deg, rgba(247,80,130,0.25), rgba(118,219,219,0.12))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow:
                "0 0 80px rgba(247,80,130,0.3), 0 0 160px rgba(118,219,219,0.1)",
              border: "1px solid rgba(247,80,130,0.4)",
            }}
          >
            <div
              style={{
                width: "300px",
                height: "300px",
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
                  fontSize: "40px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                📷
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(118,219,219,0.6)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  position: "relative",
                  zIndex: 1,
                  fontWeight: 700,
                }}
              >
                Photo Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}