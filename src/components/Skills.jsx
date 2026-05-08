"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import skills from "@/data/skills";

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
        scrollMarginTop: "80px",
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
            maxWidth: "550px",
            lineHeight: 1.8,
          }}
        >
          Hover any category to reveal the technologies I use.
        </p>

        {/* Category Pills Row */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            position: "relative",
          }}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {skills.map(({ category, icon: CategoryIcon, items }) => {
            const isActive = hoveredCategory === category;

            return (
              <div
                key={category}
                onMouseEnter={() => setHoveredCategory(category)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                {/* Pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 24px",
                    borderRadius: "50px",
                    background: isActive
                      ? "#f75082"
                      : "rgba(118,219,219,0.05)",
                    border: isActive
                      ? "1px solid #f75082"
                      : "1px solid rgba(118,219,219,0.25)",
                    transition: "all 0.3s ease",
                    color: isActive ? "#271a38" : "#76dbdb",
                    fontWeight: 700,
                    fontSize: "15px",
                    letterSpacing: "0.5px",
                    boxShadow: isActive
                      ? "0 8px 30px rgba(247,80,130,0.4)"
                      : "none",
                  }}
                >
                  <CategoryIcon
                    size={20}
                    color={isActive ? "#271a38" : "#f75082"}
                  />
                  {category}
                </div>

                {/* Floating Dropdown */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 14px)",
                        left: 0,
                        minWidth: "260px",
                        padding: "20px",
                        borderRadius: "16px",
                        background: "rgba(39,26,56,0.95)",
                        backdropFilter: "blur(14px)",
                        border: "1px solid rgba(247,80,130,0.4)",
                        boxShadow:
                          "0 12px 40px rgba(247,80,130,0.25), 0 0 60px rgba(247,80,130,0.15)",
                        zIndex: 100,
                      }}
                    >
                      {/* Arrow pointing up */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-7px",
                          left: "30px",
                          width: "12px",
                          height: "12px",
                          background: "rgba(39,26,56,0.95)",
                          borderTop: "1px solid rgba(247,80,130,0.4)",
                          borderLeft: "1px solid rgba(247,80,130,0.4)",
                          transform: "rotate(45deg)",
                        }}
                      />

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        {items.map(({ name, icon: TechIcon, color }) => (
                          <span
                            key={name}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "6px 12px",
                              borderRadius: "50px",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#76dbdb",
                              background: "rgba(118,219,219,0.06)",
                              border:
                                "1px solid rgba(118,219,219,0.25)",
                              letterSpacing: "0.3px",
                            }}
                          >
                            <TechIcon size={14} color={color} />
                            {name}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Helper hint */}
        <p
          style={{
            color: "rgba(118,219,219,0.35)",
            fontSize: "12px",
            marginTop: "60px",
            letterSpacing: "1px",
          }}
        >
          ↑ Hover a category to expand
        </p>
      </div>
    </section>
  );
}