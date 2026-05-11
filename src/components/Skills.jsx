"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import skills from "@/data/skills";
import RevealSection from "./RevealSection";
import RevealItem from "./RevealItem";
import SectionHeader from "./SectionHeader";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const allSkills = skills.flatMap(({ category, items }) =>
    items.map((item) => ({ ...item, category }))
  );

  const filteredSkills = selectedCategory
    ? allSkills.filter((skill) => skill.category === selectedCategory)
    : allSkills;

  const handlePillClick = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

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

      <RevealSection
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionHeader
          label="What I Know"
          title="My Skills"
          subtext="Click a category to filter the technologies I use."
          align="center"
        />

        {/* Category Pills */}
        <RevealItem delay={300} distance={16} duration={500}>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {skills.map(({ category, icon: CategoryIcon }) => {
              const isActive = selectedCategory === category;

              return (
                <CategoryPill
  key={category}
  category={category}
  CategoryIcon={CategoryIcon}
  isActive={isActive}
  onClick={() => handlePillClick(category)}
/>
              );
            })}
          </div>
        </RevealItem>

        {/* Skills Grid */}
        <div
          style={{
            marginTop: "80px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: "16px",
            minHeight: "200px",
          }}
        >
          <AnimatePresence mode="popLayout">
          {filteredSkills.map(({ name, icon: Icon, color }, i) => (
  <motion.div
    key={name}
    layout
    initial={{ opacity: 0, scale: 0.9, y: 12 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: -8 }}
    transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.03 }}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      padding: "24px 16px",
      borderRadius: "16px",
      background: "rgba(118,219,219,0.05)",
      border: "1px solid rgba(118,219,219,0.2)",
      cursor: "default",
    }}
  >
    <Icon size={32} color={color} />
    <span
      style={{
        fontSize: "11px",
        fontWeight: 600,
        color: "rgba(118,219,219,0.85)",
        letterSpacing: "0.5px",
        textAlign: "center",
      }}
    >
      {name}
    </span>
  </motion.div>
))}
          </AnimatePresence>
        </div>

        {/* Helper hint */}
        <RevealItem delay={900} distance={8} duration={400}>
          <p
            style={{
              color: "rgba(118,219,219,0.35)",
              fontSize: "12px",
              marginTop: "40px",
              letterSpacing: "1px",
              textAlign: "center",
            }}
          >
            Click a category to filter · Click again to reset
          </p>
        </RevealItem>
      </RevealSection>
    </section>
  );

function SkillCard({ name, Icon, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "24px 16px",
        borderRadius: "16px",
        background: hovered
          ? "rgba(118,219,219,0.1)"
          : "rgba(118,219,219,0.05)",
        border: hovered
          ? "1px solid rgba(247,80,130,0.5)"
          : "1px solid rgba(118,219,219,0.2)",
        cursor: "default",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 8px 24px rgba(247,80,130,0.2), 0 0 40px ${color}20`
          : "none",
      }}
    >
      <Icon
        size={32}
        color={color}
        style={{
          filter: hovered ? `drop-shadow(0 0 10px ${color})` : "none",
          transition: "filter 0.3s ease",
        }}
      />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: hovered
            ? "#76dbdb"
            : "rgba(118,219,219,0.85)",
          letterSpacing: "0.5px",
          textAlign: "center",
          transition: "color 0.3s ease",
        }}
      >
        {name}
      </span>
    </div>
  );
}
function CategoryPill({ category, CategoryIcon, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 24px",
        borderRadius: "50px",
        background: isActive
          ? "#f75082"
          : hovered
          ? "rgba(247,80,130,0.1)"
          : "rgba(118,219,219,0.05)",
        border: isActive
          ? "1px solid #f75082"
          : hovered
          ? "1px solid rgba(247,80,130,0.5)"
          : "1px solid rgba(118,219,219,0.25)",
        transition: "all 0.3s ease",
        color: isActive ? "#271a38" : hovered ? "#f75082" : "#76dbdb",
        fontWeight: 700,
        fontSize: "15px",
        letterSpacing: "0.5px",
        boxShadow: isActive
          ? "0 8px 30px rgba(247,80,130,0.4)"
          : hovered
          ? "0 4px 20px rgba(247,80,130,0.25), 0 0 40px rgba(247,80,130,0.1)"
          : "none",
        cursor: "pointer",
        outline: "none",
        fontFamily: "var(--font-manrope), sans-serif",
        transform: hovered && !isActive ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <CategoryIcon
        size={20}
        color={isActive ? "#271a38" : hovered ? "#f75082" : "#f75082"}
        style={{
          filter: hovered && !isActive
            ? "drop-shadow(0 0 8px rgba(247,80,130,0.5))"
            : "none",
          transition: "filter 0.3s ease",
        }}
      />
      {category}
    </button>
  );
}
}