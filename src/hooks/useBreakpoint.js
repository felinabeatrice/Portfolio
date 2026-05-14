"use client";
import { useState, useEffect, useCallback } from "react";

let cachedBreakpoint = null;

function getBreakpoint() {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w <= 480) return "mobile";
  if (w <= 768) return "tablet";
  return "desktop";
}

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() => {
    if (cachedBreakpoint) return cachedBreakpoint;
    return "desktop";
  });

  const update = useCallback(() => {
    const bp = getBreakpoint();
    cachedBreakpoint = bp;
    setBreakpoint(bp);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return breakpoint;
}