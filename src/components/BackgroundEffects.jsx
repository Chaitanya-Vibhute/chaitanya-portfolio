import { lazy, Suspense, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

const ParticleField = lazy(() => import("./ParticleField"));

// Coordinated palettes the page drifts through while scrolling (never abrupt: interpolated).
const A = ["#8B5CF6", "#3B82F6", "#06B6D4", "#8B5CF6"]; // primary glow
const B = ["#3B82F6", "#06B6D4", "#8B5CF6", "#3B82F6"]; // secondary glow
const STOPS = [0, 0.38, 0.7, 1];

export default function BackgroundEffects() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  const colorA = useTransform(scrollYProgress, STOPS, A);
  const colorB = useTransform(scrollYProgress, STOPS, B);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "40%"]);

  // Pointer-driven lighting
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.4);
  const smx = useSpring(mx, { stiffness: 40, damping: 18 });
  const smy = useSpring(my, { stiffness: 40, damping: 18 });
  const lightX = useTransform(smx, (v) => `${v * 100}%`);
  const lightY = useTransform(smy, (v) => `${v * 100}%`);

  // Publish the current accent so cursor, particles and CSS can follow the section colour.
  useMotionValueEvent(colorA, "change", (c) => {
    document.documentElement.style.setProperty("--cursor", c);
  });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-navy/60 to-ink" />
      <div className="grid-bg absolute inset-0" />

      <motion.div
        className="absolute left-[-10%] h-[60vmax] w-[60vmax] rounded-full opacity-20 blur-[120px]"
        style={{ background: colorA, top: glowY }}
      />
      <motion.div
        className="absolute right-[-15%] top-[30%] h-[50vmax] w-[50vmax] rounded-full opacity-[0.16] blur-[130px]"
        style={{ background: colorB }}
      />
      {!reduced && (
        <motion.div
          className="absolute h-[32vmax] w-[32vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[90px]"
          style={{ left: lightX, top: lightY, background: colorB }}
        />
      )}

      {!reduced && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-70">
            <ParticleField />
          </div>
        </Suspense>
      )}
    </div>
  );
}
