"use client";
import skills from "@/data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
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
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(247,80,130,0.15) 0%, transparent 70%)",
          top: "50%",
          right: "-200px",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
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
          What I Know
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
          My Skills
        </h2>

        <p
          style={{
            color: "rgba(118,219,219,0.6)",
            fontSize: "15px",
            marginBottom: "60px",
            maxWidth: "500px",
            lineHeight: 1.8,
          }}
        >
          Technologies and tools I work with to build modern, scalable web
          applications.
        </p>

        {/* Vertical Stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {skills.map(({ category, icon: CategoryIcon, items }) => (
            <div
              key={category}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: "32px",
                alignItems: "center",
                padding: "24px 28px",
                borderRadius: "16px",
                background: "rgba(118,219,219,0.04)",
                border: "1px solid rgba(118,219,219,0.18)",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#f75082";
                e.currentTarget.style.transform = "translateX(6px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(118,219,219,0.18)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {/* Category Side */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  borderRight: "1px solid rgba(118,219,219,0.15)",
                  paddingRight: "20px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(247,80,130,0.15)",
                    border: "1px solid rgba(247,80,130,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CategoryIcon size={22} color="#f75082" />
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#76dbdb",
                    letterSpacing: "0.5px",
                  }}
                >
                  {category}
                </h3>
              </div>

              {/* Tech Tags Side */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {items.map(({ name, icon: TechIcon, color }) => (
                  <span
                    key={name}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      borderRadius: "50px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#76dbdb",
                      background: "rgba(118,219,219,0.06)",
                      border: "1px solid rgba(118,219,219,0.25)",
                      letterSpacing: "0.3px",
                      transition: "all 0.3s",
                      cursor: "default",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#f75082";
                      e.currentTarget.style.color = "#271a38";
                      e.currentTarget.style.borderColor = "#f75082";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background =
                        "rgba(118,219,219,0.06)";
                      e.currentTarget.style.color = "#76dbdb";
                      e.currentTarget.style.borderColor =
                        "rgba(118,219,219,0.25)";
                    }}
                  >
                    <TechIcon size={16} color={color} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}