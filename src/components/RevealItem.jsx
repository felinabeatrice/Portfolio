"use client";
import { useReveal } from "./RevealSection";

export default function RevealItem({
  children,
  delay = 0,
  distance = 24,
  duration = 600,
  style = {},
}) {
  const visible = useReveal();

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0px)"
          : `translateY(${distance}px)`,
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}