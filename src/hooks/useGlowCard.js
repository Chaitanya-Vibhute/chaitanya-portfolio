import { useCallback } from "react";

// Sets --mx / --my on the element so the .glow-card gradient border follows the pointer.
export function useGlowCard() {
  return useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
}
