"use client";

import { useEffect } from "react";

export default function NoZoom() {
  useEffect(() => {
    const preventZoomKeys = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0")
      ) {
        e.preventDefault();
      }
    };

    const preventZoomWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    const preventGestureZoom = (e) => {
      e.preventDefault();
    };

    window.addEventListener("keydown", preventZoomKeys, { passive: false });
    window.addEventListener("wheel", preventZoomWheel, { passive: false });
    window.addEventListener("gesturestart", preventGestureZoom, {
      passive: false,
    });
    window.addEventListener("gesturechange", preventGestureZoom, {
      passive: false,
    });
    window.addEventListener("gestureend", preventGestureZoom, {
      passive: false,
    });

    return () => {
      window.removeEventListener("keydown", preventZoomKeys);
      window.removeEventListener("wheel", preventZoomWheel);
      window.removeEventListener("gesturestart", preventGestureZoom);
      window.removeEventListener("gesturechange", preventGestureZoom);
      window.removeEventListener("gestureend", preventGestureZoom);
    };
  }, []);

  return null;
}