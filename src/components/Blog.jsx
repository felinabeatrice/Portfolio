"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import blogs from "@/data/blogs";
import RevealSection from "./RevealSection";
import RevealItem from "./RevealItem";
import SectionHeader from "./SectionHeader";

/* ── Covers — unchanged ── */
function DesignCover() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1e0f32 0%, #2d1548 50%, #3a1a55 100%)", zIndex: 0, overflow: "hidden" }}>
      {[...Array(5)].map((_, i) => (<div key={`h${i}`} style={{ position: "absolute", left: "8%", right: "8%", top: `${18 + i * 16}%`, height: "1px", background: "rgba(118,219,219,0.07)" }} />))}
      {[...Array(5)].map((_, i) => (<div key={`v${i}`} style={{ position: "absolute", top: "10%", bottom: "10%", left: `${15 + i * 18}%`, width: "1px", background: "rgba(118,219,219,0.05)" }} />))}
      <div style={{ position: "absolute", top: "12%", left: "8%", right: "8%", height: "10%", borderRadius: "6px", background: "rgba(118,219,219,0.06)", border: "1px solid rgba(118,219,219,0.12)", display: "flex", alignItems: "center", padding: "0 12px", gap: "8px" }}>
        {[40, 28, 28, 28].map((w, i) => (<div key={i} style={{ width: `${w}px`, height: "5px", borderRadius: "4px", background: i === 0 ? "rgba(247,80,130,0.4)" : "rgba(118,219,219,0.15)" }} />))}
      </div>
      <div style={{ position: "absolute", top: "28%", left: "8%", width: "55%", height: "28%", borderRadius: "8px", background: "rgba(247,80,130,0.06)", border: "1px solid rgba(247,80,130,0.12)" }} />
      <div style={{ position: "absolute", top: "28%", right: "8%", width: "28%", height: "28%", borderRadius: "8px", background: "rgba(118,219,219,0.04)", border: "1px solid rgba(118,219,219,0.1)" }} />
      {[62, 72, 82].map((top, i) => (<div key={i} style={{ position: "absolute", top: `${top}%`, left: "8%", width: `${70 - i * 10}%`, height: "4px", borderRadius: "4px", background: i === 0 ? "rgba(118,219,219,0.12)" : "rgba(118,219,219,0.07)" }} />))}
      {["#f75082", "#76dbdb", "#604285", "#ffffff"].map((c, i) => (<div key={i} style={{ position: "absolute", bottom: "12%", right: `${10 + i * 8}%`, width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.5 }} />))}
      <div style={{ position: "absolute", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(247,80,130,0.15), transparent 70%)", top: "-50px", right: "-50px", filter: "blur(40px)" }} />
    </div>
  );
}

function ArchitectureCover() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0f1a2e 0%, #1a2540 50%, #221530 100%)", zIndex: 0, overflow: "hidden", fontFamily: "monospace" }}>
      {[{ w: "62%", color: "rgba(118,219,219,0.2)", top: "12%" }, { w: "52%", color: "rgba(247,80,130,0.18)", top: "22%" }, { w: "42%", color: "rgba(118,219,219,0.15)", top: "32%" }, { w: "40%", color: "rgba(118,219,219,0.12)", top: "42%" }, { w: "50%", color: "rgba(247,80,130,0.15)", top: "52%" }].map(({ w, color, top }, i) => (<div key={i} style={{ position: "absolute", top, left: "8%", width: w, height: "14px", borderRadius: "3px", background: color }} />))}
      {[{ top: "18%", left: "55%", borderColor: "rgba(118,219,219,0.2)" }, { top: "36%", left: "58%", borderColor: "rgba(247,80,130,0.2)" }, { top: "54%", left: "61%", borderColor: "rgba(118,219,219,0.15)" }].map(({ top, left, borderColor }, i) => (<div key={i} style={{ position: "absolute", top, left, width: "30%", height: "14%", borderRadius: "8px", background: "rgba(39,26,56,0.6)", border: `1px solid ${borderColor}` }} />))}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2 }} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        <line x1="210" y1="55" x2="210" y2="85" stroke="#76dbdb" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="210" y1="105" x2="210" y2="130" stroke="#f75082" strokeWidth="1" strokeDasharray="3 2" />
      </svg>
      <div style={{ position: "absolute", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(118,219,219,0.12), transparent 70%)", bottom: "-50px", left: "-50px", filter: "blur(40px)" }} />
    </div>
  );
}

function PerformanceCover() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a0f28 0%, #27183a 50%, #1e1035 100%)", zIndex: 0, overflow: "hidden" }}>
      {[{ top: "20%", width: "75%", opacity: 0.25, color: "#76dbdb" }, { top: "30%", width: "55%", opacity: 0.18, color: "#f75082" }, { top: "40%", width: "85%", opacity: 0.22, color: "#76dbdb" }, { top: "50%", width: "45%", opacity: 0.15, color: "#f75082" }, { top: "60%", width: "70%", opacity: 0.2, color: "#76dbdb" }, { top: "70%", width: "60%", opacity: 0.12, color: "#76dbdb" }].map(({ top, width, opacity, color }, i) => (<div key={i} style={{ position: "absolute", top, left: 0, width, height: "1.5px", background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity }} />))}
      <svg style={{ position: "absolute", top: "10%", right: "8%", width: "90px", height: "90px", opacity: 0.5 }} viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="36" fill="none" stroke="rgba(118,219,219,0.1)" strokeWidth="6" />
        <circle cx="45" cy="45" r="36" fill="none" stroke="#76dbdb" strokeWidth="6" strokeDasharray="190 226" strokeLinecap="round" transform="rotate(-90 45 45)" opacity="0.6" />
        <text x="45" y="49" textAnchor="middle" fontSize="14" fontWeight="700" fill="rgba(118,219,219,0.7)" fontFamily="monospace">98</text>
      </svg>
      {[{ label: "FCP", value: "88%", color: "#76dbdb" }, { label: "LCP", value: "72%", color: "#f75082" }, { label: "CLS", value: "95%", color: "#76dbdb" }].map(({ label, value, color }, i) => (
        <div key={label} style={{ position: "absolute", bottom: `${28 + i * 16}%`, left: "8%", width: "50%" }}>
          <div style={{ height: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
            <div style={{ width: value, height: "100%", borderRadius: "4px", background: color, opacity: 0.35 }} />
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(118,219,219,0.12), transparent 70%)", top: "-40px", left: "-40px", filter: "blur(40px)" }} />
    </div>
  );
}

const coverMap = {
  "designing-modern-web-interfaces": DesignCover,
  "building-scalable-fullstack-applications": ArchitectureCover,
  "optimizing-frontend-performance": PerformanceCover,
};

/* ── BlogCard ── */
function BlogCard({ blog }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const Cover = coverMap[blog.slug];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/blogs/${blog.slug}`)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        height: "300px",
        border: hovered ? "1px solid rgba(247,80,130,0.6)" : "1px solid rgba(118,219,219,0.15)",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(247,80,130,0.2), 0 0 60px rgba(247,80,130,0.1)" : "none",
      }}
    >
      {Cover && <Cover />}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px", background: "linear-gradient(180deg, transparent 0%, rgba(26,15,40,0.9) 100%)", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 2 }}>
        <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.5px", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{blog.title}</h3>
      </div>
      <div style={{ position: "absolute", inset: 0, padding: "28px", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "linear-gradient(180deg, rgba(26,15,40,0.3) 0%, rgba(26,15,40,0.94) 100%)", backdropFilter: "blur(6px)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", zIndex: 3 }}>
        <div style={{ position: "absolute", top: "20px", right: "20px", width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(247,80,130,0.9)", color: "#271a38", opacity: hovered ? 1 : 0, transform: hovered ? "translate(0,0) rotate(0deg)" : "translate(6px,-6px) rotate(-15deg)", transition: "all 0.4s ease 0.1s" }}>
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </div>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "20px", fontWeight: 700, color: "#76dbdb", letterSpacing: "0.5px", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(15px)", transition: "all 0.4s ease 0.15s" }}>{blog.title}</h3>
        <p style={{ margin: 0, color: "rgba(118,219,219,0.8)", fontSize: "13px", lineHeight: 1.7, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(20px)", transition: "all 0.4s ease 0.2s" }}>{blog.description}</p>
      </div>
    </div>
  );
}

/* ── Blog Section ── */
export default function Blog() {
  return (
    <section
      id="blog"
      style={{
        minHeight: "100vh",
        padding: "100px 80px",
        background: "#271a38",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
        scrollMarginTop: "80px",
      }}
    >
      <div style={{ position: "absolute", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(118,219,219,0.08) 0%, transparent 70%)", top: "20%", left: "-200px", pointerEvents: "none", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(247,80,130,0.08) 0%, transparent 70%)", bottom: "10%", right: "-150px", pointerEvents: "none", filter: "blur(60px)" }} />

      <RevealSection
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionHeader
          label="My Thoughts"
          title="Developer Notes"
          subtext="Thoughts on development, design, and building modern web experiences."
          align="center"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {blogs.map((blog, i) => (
            <RevealItem key={i} delay={300 + i * 120} distance={20} duration={500}>
              <BlogCard blog={blog} />
            </RevealItem>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}