"use client";
import { useEffect, useState } from "react";
import DecryptedText from "./DecryptedText";

export default function Intro() {
  const [phase, setPhase] = useState("idle");
  const [showStatic, setShowStatic] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("scramble"), 550);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  const handleResolve = () => {
    setShowStatic(true);
    setTimeout(() => {
      setPhase("expand");
      setTimeout(() => {
        setPhase("fadeOut");
        setTimeout(() => setPhase("done"), 1000);
      }, 1300);
    }, 1000);
  };

  if (phase === "done") return null;

  const expanding = phase === "expand" || phase === "fadeOut";

  const nameStyles = {
    fontFamily: "var(--font-space-grotesk), sans-serif",
    fontSize: isMobile
      ? "clamp(1.2rem, 7vw, 1.8rem)"
      : "clamp(2rem, 5vw, 3.8rem)",
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: "#76dbdb",
    whiteSpace: "nowrap",
    transformOrigin: "center center",
    transform: expanding
      ? `scale(${isMobile ? 6 : 10})`
      : "scale(1)",
    opacity: expanding ? 0 : 1,
    filter: expanding ? "blur(12px)" : "blur(0px)",
    transition: expanding
      ? "transform 1400ms cubic-bezier(0.2, 0, 0.2, 1), opacity 800ms ease 400ms, filter 1200ms ease"
      : "none",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#271a38",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
        opacity: phase === "fadeOut" ? 0 : 1,
        transition:
          phase === "fadeOut"
            ? "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
        pointerEvents: "none",
        padding: "0 24px",
        boxSizing: "border-box",
      }}
    >
      {!showStatic ? (
        <div style={nameStyles}>
          <DecryptedText
            text="[F]elina Beatrice"
            trigger={phase === "scramble"}
            onComplete={handleResolve}
            speed={60}
          />
        </div>
      ) : (
        <div
          style={{
            ...nameStyles,
            textShadow: "0 0 20px rgba(118, 219, 219, 0.2)",
          }}
        >
          [F]elina Beatrice
        </div>
      )}
    </div>
  );
}