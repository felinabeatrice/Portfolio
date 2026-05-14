"use client";
import { useEffect, useState } from "react";

export default function BlogProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        background: "rgba(118,219,219,0.1)",
        zIndex: 99999,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #76dbdb, #f75082)",
          transition: "width 0.1s linear",
          borderRadius: "0 2px 2px 0",
          boxShadow: "0 0 8px rgba(247,80,130,0.4)",
        }}
      />
    </div>
  );
}