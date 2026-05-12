"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Cursor() {
  const cursorRef = useRef(null);
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const isGamePage = pathname === "/game";

  useEffect(() => {
    if (isGamePage) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [data-cursor='hover']"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    addHoverListeners();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isGamePage, pathname]);

  if (isGamePage) return null;

  const size = isHovering ? 26 : 20;
  const gap = 4;
  const half = size / 2;
  const transition = "0.18s ease";

  const glowStyle = isHovering
    ? {
        filter:
          "drop-shadow(0 0 4px #76dbdb) drop-shadow(0 0 8px #76dbdb) drop-shadow(0 0 14px #76dbdb)",
      }
    : {
        filter: "none",
      };

  const armColor = "#76dbdb";

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: `opacity 0.2s ease, filter ${transition}`,
          willChange: "transform",
          ...glowStyle,
        }}
      >
        {/* Horizontal left arm */}
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: `${gap}px`,
            width: `${half - gap}px`,
            height: "1px",
            background: armColor,
            transform: "translateY(-50%)",
            transition: `width ${transition}`,
          }}
        />

        {/* Horizontal right arm */}
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: `${gap}px`,
            width: `${half - gap}px`,
            height: "1px",
            background: armColor,
            transform: "translateY(-50%)",
            transition: `width ${transition}`,
          }}
        />

        {/* Vertical top arm */}
        <div
          style={{
            position: "absolute",
            left: "0px",
            bottom: `${gap}px`,
            width: "1px",
            height: `${half - gap}px`,
            background: armColor,
            transform: "translateX(-50%)",
            transition: `height ${transition}`,
          }}
        />

        {/* Vertical bottom arm */}
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: `${gap}px`,
            width: "1px",
            height: `${half - gap}px`,
            background: armColor,
            transform: "translateX(-50%)",
            transition: `height ${transition}`,
          }}
        />
      </div>
    </>
  );
}