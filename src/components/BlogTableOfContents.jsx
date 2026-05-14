"use client";
import { useEffect, useState } from "react";

export default function BlogTableOfContents({ sections }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observers = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        {
          rootMargin: "-20% 0px -70% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 100;
    const top =
      el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: "120px",
        width: "200px",
        flexShrink: 0,
        alignSelf: "flex-start",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "rgba(118,219,219,0.4)",
          margin: "0 0 16px 0",
        }}
      >
        Contents
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          borderLeft: "1px solid rgba(118,219,219,0.1)",
          paddingLeft: "16px",
        }}
      >
        {sections.map(({ id, heading }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              style={{
                background: "none",
                border: "none",
                padding: "6px 0",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: isActive ? 700 : 500,
                color: isActive
                  ? "#76dbdb"
                  : "rgba(118,219,219,0.35)",
                letterSpacing: "0.3px",
                lineHeight: 1.5,
                transition: "all 0.25s ease",
                fontFamily: "var(--font-manrope), sans-serif",
                position: "relative",
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    left: "-17px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "2px",
                    height: "16px",
                    background:
                      "linear-gradient(180deg, #76dbdb, #f75082)",
                    borderRadius: "2px",
                  }}
                />
              )}
              {heading}
            </button>
          );
        })}
      </div>
    </nav>
  );
}