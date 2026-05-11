"use client";
import { useEffect, useRef, useState, createContext, useContext } from "react";

const RevealContext = createContext(false);

export function useReveal() {
  return useContext(RevealContext);
}

export default function RevealSection({ children, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealContext.Provider value={visible}>
      <div ref={ref} style={style}>
        {children}
      </div>
    </RevealContext.Provider>
  );
}
