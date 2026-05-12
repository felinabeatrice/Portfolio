"use client";
import { useState, useEffect } from "react";

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 480) setBreakpoint("mobile");
      else if (w <= 768) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
}