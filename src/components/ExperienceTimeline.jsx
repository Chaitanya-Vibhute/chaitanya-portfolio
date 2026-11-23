import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile, responsibilities } from "../data/profile";
import { useGlowCard } from "../hooks/useGlowCard";
import { stagger, fadeUp } from "../animations/variants";

export default function ExperienceTimeline() {
  const ref = useRef(null);
  const glow = useGlowCard();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative pl-8 md:pl-14">
      {/* vertical rail */}
      <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-2 w-px bg-white/10 md:left-[27px]" />
      <motion.div
        aria-hidden="true"
        className="absolute left-[11px] top-2 bottom-0 w-px origin-top bg-gradient-to-b from-violet via-neon to-cyan md:left-[27px]"
        style={{ scaleY: lineScale }}
      />
      {/* node */}
      <motion.span
        aria-hidden="true"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink ring-2 ring-violet md:left-4"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
      </motion.span>

      <motion.article
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        onMouseMove={glow}
        data-cursor="card"
        data-cursor-label="Read"
        className="glow-card glass p-6 sm:p-9"
      >
        <motion.div variants={fadeUp} className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">{profile.position}</h3>
            <p className="mt-1 text-base text-soft/90">
              {profile.company} <span className="text-muted">– {profile.location}</span>
            </p>
          </div>
          <span className="rounded-full border border-cyan/40 bg-cyan/10 px-4 py-1.5 font-mono text-xs text-cyan">
            {profile.employment}
          </span>
        </motion.div>

        <ul className="mt-8 space-y-4">
          {responsibilities.map((r, i) => (
            <motion.li key={i} variants={fadeUp} custom={i + 1} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan" />
              <span>{r}</span>
            </motion.li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}
