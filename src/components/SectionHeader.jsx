import RevealItem from "./RevealItem";

export default function SectionHeader({
  label,
  title,
  subtext,
  align = "left",
}) {
  const isCenter = align === "center";

  return (
    <div
      style={{
        textAlign: isCenter ? "center" : "left",
        display: "flex",
        flexDirection: "column",
        alignItems: isCenter ? "center" : "flex-start",
        marginBottom: "60px",
      }}
    >
      <RevealItem delay={0} distance={16} duration={500}>
        <p
          style={{
            color: "#f75082",
            letterSpacing: "3px",
            fontSize: "12px",
            textTransform: "uppercase",
            fontWeight: 700,
            margin: "0 0 12px 0",
          }}
        >
          {label}
        </p>
      </RevealItem>

      <RevealItem delay={100} distance={20} duration={550}>
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
          {title}
        </h2>
      </RevealItem>

      {subtext && (
        <RevealItem delay={200} distance={16} duration={500}>
          <p
            style={{
              color: "rgba(118,219,219,0.6)",
              fontSize: "15px",
              margin: 0,
              maxWidth: "550px",
              lineHeight: 1.8,
            }}
          >
            {subtext}
          </p>
        </RevealItem>
      )}
    </div>
  );
}