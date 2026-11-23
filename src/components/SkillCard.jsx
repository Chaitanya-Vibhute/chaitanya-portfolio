import { motion } from "framer-motion";
import { useRef } from "react";
import Icon from "./Icon";
import { useGlowCard } from "../hooks/useGlowCard";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";
import { fadeUp } from "../animations/variants";

/**
 * Interactive card: 3D tilt + pointer-following gradient border + animated icon.
 * Pass `items` for a chip list, or `blurb` for a description.
 */
export default function SkillCard({ title, icon, items, blurb, index = 0 }) {
  const ref = useRef(null);
  const glow = useGlowCard();
  const reduced = usePrefersReducedMotion();

  const onMove = (e) => {
    glow(e);
    if (reduced) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateZ(0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <motion.div variants={fadeUp} custom={index} className="h-full">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="card"
        data-cursor-label="View"
        className="glow-card glass group h-full p-6 transition-transform duration-200 ease-out will-change-transform"
      >
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet/30 to-cyan/20 text-cyan"
        >
          <Icon name={icon} size={22} />
        </motion.div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        {blurb && <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>}
        {items && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {items.map((it) => (
              <li
                key={it}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-soft/90 transition-colors group-hover:border-violet/40"
              >
                {it}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
