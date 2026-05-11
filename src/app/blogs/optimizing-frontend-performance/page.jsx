import BackButton from "@/components/BackButton";
import BackButtonBottom from "@/components/BackButtonBottom";

export const metadata = {
  title: "Optimizing Frontend Performance",
  description:
    "Creating fast, responsive, and smooth user experiences.",
};

export default function OptimizingFrontendPerformance() {
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
      <div
        style={{
          position: "fixed",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(247,80,130,0.1) 0%, transparent 70%)",
          bottom: "0",
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
          Optimizing Frontend Performance
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

        {/* Hero Image */}
        <div
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "48px",
            border: "1px solid rgba(118,219,219,0.15)",
            boxShadow:
              "0 8px 40px rgba(247,80,130,0.08), 0 0 60px rgba(247,80,130,0.04)",
          }}
        >
          <img
            src="/blogs/performance-hero.jpg"
            alt="Optimizing Frontend Performance"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {[
            "Frontend performance is one of those things that nobody notices when it is done well — and everybody notices when it is not. A sluggish interface damages trust faster than any visual bug, because it makes the application feel unreliable.",
            "The most impactful optimizations are rarely the most technical ones. Eliminating unnecessary re-renders, lazy loading components that are not immediately visible, and deferring heavy scripts until after the initial paint will outperform micro-optimizations in almost every case.",
            "Images are consistently the largest contributors to slow load times. Using modern formats, sizing images to their display dimensions, and loading them lazily are foundational steps that every project should take before reaching for anything more complex.",
            "Animations deserve special attention in performance work. Sticking to CSS properties that trigger only the compositor — opacity and transform — avoids layout recalculations entirely. A smooth 60fps animation costs almost nothing when it is implemented correctly.",
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
          Performance is not a feature you ship — it is a discipline you
          maintain.
        </p>

        <BackButtonBottom />
      </div>
    </main>
  );
}