import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useIsFinePointer, usePrefersReducedMotion } from "../hooks/useReducedMotion";

const TRAIL_LENGTH = 14;

/**
 * Custom cursor: dot + follower ring + label + subtle canvas trail.
 * Disabled on touch devices and when reduced motion is requested.
 * Cursor state comes from data attributes on hovered elements:
 *   data-cursor="button|card|link|text"   data-cursor-label="Explore"
 * Colour comes from the --cursor CSS variable (updated by BackgroundEffects per section).
 */
export default function CustomCursor() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });

  const [state, setState] = useState({ kind: "default", label: "" });
  const [pressed, setPressed] = useState(false);
  const canvasRef = useRef(null);
  const points = useRef([]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      points.current.push({ x: e.clientX, y: e.clientY });
      if (points.current.length > TRAIL_LENGTH) points.current.shift();
    };
    const onOver = (e) => {
      const el = e.target.closest?.("[data-cursor], a, button, input, textarea");
      if (!el) return setState({ kind: "default", label: "" });
      const kind =
        el.dataset.cursor ||
        (el.tagName === "A" ? "link" : el.tagName === "BUTTON" ? "button" : "text");
      setState({ kind, label: el.dataset.cursorLabel || "" });
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    // trail
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = getComputedStyle(document.documentElement).getPropertyValue("--cursor").trim() || "#8b5cf6";
      const pts = points.current;
      // fade the trail away when the pointer stops
      if (pts.length > 0) pts.shift();
      pts.forEach((p, i) => {
        const t = i / pts.length;
        ctx.globalAlpha = t * 0.35;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + t * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize =
    state.kind === "button" ? 76 : state.kind === "card" ? 64 : state.kind === "link" ? 52 : state.kind === "text" ? 30 : 40;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* follower ring */}
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--cursor)",
          background: state.kind === "button" ? "color-mix(in srgb, var(--cursor) 14%, transparent)" : "transparent",
        }}
        animate={{ width: ringSize, height: ringSize, scale: pressed ? 0.85 : 1, borderRadius: state.kind === "text" ? "8px" : "9999px" }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <AnimatePresence>
          {state.label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[10px] font-medium uppercase tracking-widest text-soft"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      {/* dot */}
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%", background: "var(--cursor)" }}
      />
    </div>
  );
}
