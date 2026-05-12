"use client";

import { useEffect, useState, useRef, useMemo } from "react";

export default function DecryptedText({
  text,
  speed = 60,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  trigger = false,
  onComplete,
}) {
  const [displayText, setDisplayText] = useState("");
  const [iteration, setIteration] = useState(0);
  const [flickerTick, setFlickerTick] = useState(0); // For organic randomness
  const intervalRef = useRef(null);
  const flickerRef = useRef(null);

  const availableChars = useMemo(() => characters.split(""), [characters]);

  // Main Reveal logic
  useEffect(() => {
    if (!trigger) {
      setDisplayText(text.split("").map(c => (c === " " || c === "[" || c === "]") ? c : availableChars[Math.floor(Math.random() * availableChars.length)]).join(""));
      return;
    }

    intervalRef.current = setInterval(() => {
      setIteration((prev) => {
        if (prev >= text.length) {
          clearInterval(intervalRef.current);
          clearInterval(flickerRef.current);
          setDisplayText(text);
          setTimeout(() => onComplete?.(), 0);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    // Organic Flicker for unrevealed letters
    flickerRef.current = setInterval(() => {
      setFlickerTick(prev => prev + 1);
    }, 70); // Slightly slower than reveal for a "shimmer" effect

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(flickerRef.current);
    };
  }, [trigger, text, speed, availableChars, onComplete]);

  // Render the string based on iteration and flickerTick
  useEffect(() => {
    const scrambled = text.split("").map((char, index) => {
      if (char === " " || char === "[" || char === "]") return char;
      if (index < iteration) return char;
      return availableChars[Math.floor(Math.random() * availableChars.length)];
    }).join("");
    setDisplayText(scrambled);
  }, [iteration, flickerTick, text, availableChars]);

  return (
    <span style={{ textShadow: trigger && iteration < text.length ? "0 0 15px rgba(118, 219, 219, 0.4)" : "none", transition: "text-shadow 0.3s ease" }}>
      {displayText.split("").map((char, index) => {
        const isRevealed = index < iteration;
        return (
          <span key={index} style={{ color: isRevealed ? "#76dbdb" : "rgba(118, 219, 219, 0.4)", transition: "color 0.2s ease" }}>
            {char}
          </span>
        );
      })}
    </span>
  );
}