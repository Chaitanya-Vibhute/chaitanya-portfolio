import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { SiReact, SiAngular, SiJavascript, SiTailwindcss, SiNodedotjs, SiMongodb } from "react-icons/si";
import { useWebGLSupport } from "../hooks/useWebGL";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

// The 3D scene (three.js) is a separate lazy chunk so it never blocks first paint.
const HeroScene = lazy(() => import("./HeroScene"));

const floaters = [
  { Icon: SiReact, color: "#06B6D4", pos: "left-[6%] top-[12%]", delay: 0 },
  { Icon: SiAngular, color: "#ef4444", pos: "right-[8%] top-[8%]", delay: 0.6 },
  { Icon: SiJavascript, color: "#facc15", pos: "left-[2%] bottom-[22%]", delay: 1.2 },
  { Icon: SiTailwindcss, color: "#38bdf8", pos: "right-[4%] bottom-[28%]", delay: 0.3 },
  { Icon: SiNodedotjs, color: "#4ade80", pos: "left-[28%] bottom-[2%]", delay: 0.9 },
  { Icon: SiMongodb, color: "#22c55e", pos: "right-[26%] top-[0%]", delay: 1.5 },
];

function Fallback() {
  // Graceful non-WebGL fallback: a CSS-only gradient orb.
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="h-48 w-48 animate-float rounded-full bg-gradient-to-br from-violet via-neon to-cyan opacity-70 blur-[2px] shadow-[0_0_120px_rgba(139,92,246,0.55)]" />
    </div>
  );
}

export default function HeroVisual() {
  const webgl = useWebGLSupport();
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-0">
        {webgl && !reduced ? (
          <Suspense fallback={<Fallback />}>
            <HeroScene />
          </Suspense>
        ) : (
          <Fallback />
        )}
      </div>

      {floaters.map(({ Icon, color, pos, delay }, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={`absolute ${pos} flex h-12 w-12 items-center justify-center rounded-2xl glass`}
          animate={reduced ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay }}
          style={{ color, boxShadow: `0 0 28px -8px ${color}` }}
        >
          <Icon size={22} />
        </motion.div>
      ))}
    </div>
  );
}
