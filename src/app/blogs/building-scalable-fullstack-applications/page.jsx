import BackButton from "@/components/BackButton";
import BackButtonBottom from "@/components/BackButtonBottom";

export const metadata = {
  title: "Building Scalable Full-Stack Applications",
  description:
    "Thoughts on structuring efficient PERN stack applications.",
};

export default function BuildingScalableFullStackApplications() {
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
            "radial-gradient(circle, rgba(118,219,219,0.1) 0%, transparent 70%)",
          top: "0",
          left: "-200px",
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
          Building Scalable Full-Stack Applications
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
              "0 8px 40px rgba(118,219,219,0.08), 0 0 60px rgba(118,219,219,0.04)",
          }}
        >
          <img
            src="/blogs/fullstack-hero.jpg"
            alt="Building Scalable Full-Stack Applications"
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
            "Scalability is not something you add to an application after the fact — it is a decision that starts with how you structure your folders, name your routes, and define the boundaries between your frontend and backend.",
            "In a PERN stack application, the separation of concerns is especially important. Your Express API should know nothing about how your React components are structured, and your React components should never contain business logic that belongs in the server. This boundary is what makes both sides independently testable and replaceable.",
            "Database design is where most scalability problems originate. A poorly normalized schema or missing indexes will hold back even the most optimized Node.js server. Time spent on the data model early — thinking through relationships, constraints, and query patterns — pays back significantly as the application grows.",
            "On the frontend, scalability means component isolation. Each component should do one thing well, accept its data through clearly defined props, and make no assumptions about where it lives in the tree. When you need to move it, refactor it, or reuse it — it should require no surgery.",
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
          The best architecture is the one your future self can understand
          without reading the git history.
        </p>

        <BackButtonBottom />
      </div>
    </main>
  );
}