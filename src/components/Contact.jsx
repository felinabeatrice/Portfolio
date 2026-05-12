"use client";
import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import RevealSection from "./RevealSection";
import RevealItem from "./RevealItem";
import useBreakpoint from "@/hooks/useBreakpoint";

const socials = [
  { name: "GitHub", icon: FaGithub, href: "https://github.com/felinabeatrice" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "https://linkedin.com/in/felinabeatricenm" },
  { name: "Email", icon: Mail, href: "mailto:felinabeatricenm@gmail.com" },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(118,219,219,0.2)",
    background: "rgba(118,219,219,0.04)",
    color: "#76dbdb",
    fontSize: "14px",
    fontFamily: "var(--font-manrope), sans-serif",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    letterSpacing: "0.3px",
  };

  const handleFocus = (e) => {
    Object.assign(e.target.style, {
      border: "1px solid rgba(247,80,130,0.5)",
      background: "rgba(247,80,130,0.04)",
      boxShadow: "0 0 20px rgba(247,80,130,0.1)",
    });
  };

  const handleBlur = (e) => {
    Object.assign(e.target.style, {
      border: "1px solid rgba(118,219,219,0.2)",
      background: "rgba(118,219,219,0.04)",
      boxShadow: "none",
    });
  };

  return (
    <section
      id="contact"
      style={{
        scrollMarginTop: "80px",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile
          ? "80px 24px"
          : isTablet
          ? "80px 40px"
          : "120px 80px",
        background: "#271a38",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-manrope), sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ position: "absolute", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(247,80,130,0.10) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", filter: "blur(80px)" }} />

      <RevealSection
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Label */}
        <RevealItem delay={0} distance={12} duration={500}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "1px", background: "rgba(247,80,130,0.6)" }} />
            <span style={{ fontSize: "12px", color: "#f75082", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>Get In Touch</span>
            <div style={{ width: "40px", height: "1px", background: "rgba(247,80,130,0.6)" }} />
          </div>
        </RevealItem>

        {/* Heading */}
        <RevealItem delay={100} distance={16} duration={550}>
          <h2
            style={{
              fontSize: isMobile
                ? "clamp(32px, 10vw, 48px)"
                : "clamp(44px, 6vw, 72px)",
              fontWeight: 400,
              margin: "0 0 24px 0",
              color: "#76dbdb",
              letterSpacing: isMobile ? "1px" : "2px",
              lineHeight: 1.15,
              fontFamily: "var(--font-bitcount), monospace",
            }}
          >
            Let's Work Together
          </h2>
        </RevealItem>

        {/* Subtext */}
        <RevealItem delay={200} distance={14} duration={500}>
          <p style={{ color: "rgba(118,219,219,0.7)", fontSize: isMobile ? "14px" : "16px", lineHeight: 1.8, maxWidth: "520px", marginBottom: "48px" }}>
            Open to collaborations, freelance work, and creative projects. Let's build something amazing together.
          </p>
        </RevealItem>

        {/* Form */}
        <RevealItem delay={300} distance={18} duration={500} style={{ width: "100%" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%", marginBottom: "48px" }}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required style={inputStyle} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required style={inputStyle} />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }} />
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px 38px",
                background: status === "success" ? "#76dbdb" : status === "error" ? "#ff4444" : "#f75082",
                color: "#271a38",
                borderRadius: "50px",
                border: "none",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: status === "sending" ? "wait" : "pointer",
                transition: "all 0.3s ease",
                fontFamily: "var(--font-manrope), sans-serif",
                opacity: status === "sending" ? 0.7 : 1,
                alignSelf: "center",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {status === "idle" && (<><Send size={16} />Send Message</>)}
              {status === "sending" && "Sending..."}
              {status === "success" && (<><CheckCircle size={16} />Message Sent!</>)}
              {status === "error" && (<><AlertCircle size={16} />Failed</>)}
            </button>
            {status === "error" && errorMsg && (
              <p style={{ color: "#ff4444", fontSize: "13px", margin: "4px 0 0 0", textAlign: "center" }}>{errorMsg}</p>
            )}
          </form>
        </RevealItem>

        {/* Divider */}
        <RevealItem delay={400} distance={8} duration={400} style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(118,219,219,0.1)" }} />
            <span style={{ fontSize: "11px", color: "rgba(118,219,219,0.3)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>Or find me on</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(118,219,219,0.1)" }} />
          </div>
        </RevealItem>

        {/* Socials */}
        <RevealItem delay={500} distance={12} duration={450}>
          <div style={{ display: "flex", gap: isMobile ? "20px" : "32px", alignItems: "flex-start", justifyContent: "center" }}>
            {socials.map(({ name, icon: Icon, href }) => (
              <SocialIcon key={name} name={name} Icon={Icon} href={href} />
            ))}
          </div>
        </RevealItem>
      </RevealSection>
    </section>
  );
}

function SocialIcon({ name, Icon, href }) {
  const [hovered, setHovered] = useState(false);
  const isEmail = href.startsWith("mailto:");

  return (
    <a href={href} target={isEmail ? undefined : "_blank"} rel={isEmail ? undefined : "noopener noreferrer"} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textDecoration: "none", cursor: "pointer" }}>
      <div style={{ width: "52px", height: "52px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: hovered ? "rgba(247,80,130,0.15)" : "rgba(118,219,219,0.05)", border: hovered ? "1px solid #f75082" : "1px solid rgba(118,219,219,0.25)", color: hovered ? "#f75082" : "#76dbdb", boxShadow: hovered ? "0 0 30px rgba(247,80,130,0.35)" : "none", transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "all 0.35s ease" }}>
        <Icon size={22} />
      </div>
      <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "1px", color: "#76dbdb", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "all 0.35s ease", pointerEvents: "none" }}>{name}</span>
    </a>
  );
}