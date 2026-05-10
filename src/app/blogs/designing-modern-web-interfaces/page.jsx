import { ArrowLeft } from "lucide-react";
import BackButton from "@/components/BackButton";
import BackButtonBottom from "@/components/BackButtonBottom";

export const metadata = {
  title: "Designing Modern Web Interfaces | Felina Beatrice",
  description:
    "Exploring clean UI patterns, motion, and user-focused design.",
};

export default function DesigningModernWebInterfaces() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#271a38",
        padding: "120px 80px 80px",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
        color: "#76dbdb",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "fixed",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(247,80,130,0.12) 0%, transparent 70%)",
          top: "0",
          right: "-200px",
          pointerEvents: "none",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <BackButton />

        <p
          style={{
            color: "#f75082",
            letterSpacing: "3px",
            fontSize: "11px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          Developer Notes
        </p>

        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 400,
            color: "#76dbdb",
            letterSpacing: "2px",
            lineHeight: 1.2,
            margin: "0 0 32px 0",
            fontFamily: "var(--font-bitcount), monospace",
          }}
        >
          Designing Modern Web Interfaces
        </h1>

        <div
          style={{
            width: "60px",
            height: "2px",
            background: "linear-gradient(90deg, #f75082, transparent)",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {[
            "Modern web design has moved far beyond static layouts and flat color blocks. Today, great interfaces are defined by how they feel — the subtle transitions, the thoughtful use of space, and the way every element responds to the user's actions.",
            "One pattern I keep returning to is the layered depth approach: using background glows, semi-transparent surfaces, and blur effects to create a sense of physical depth without relying on heavy imagery. This is especially effective in dark-themed interfaces where light sources can be implied through radial gradients.",
            "Motion plays an equally critical role. The best animations are almost invisible — they guide the eye, confirm interactions, and add polish without ever demanding attention. A 250ms ease-out on a dropdown feels intentional. A 600ms bounce feels like a gimmick.",
            "The foundation of all of this is a consistent design system: a locked color palette, a clear typographic scale, and reusable spacing units. Without that foundation, even the most creative interface becomes visually noisy.",
          ].map((para, i) => (
            <p
              key={i}
              style={{
                color: "rgba(118,219,219,0.75)",
                fontSize: "16px",
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(118,219,219,0.1)",
            margin: "48px 0",
          }}
        />

        <p
          style={{
            color: "rgba(118,219,219,0.5)",
            fontSize: "14px",
            lineHeight: 1.8,
            fontStyle: "italic",
          }}
        >
          Good design is not about what you add — it is about what you
          understand well enough to leave out.
        </p>

        <BackButtonBottom />
      </div>
    </main>
  );
}