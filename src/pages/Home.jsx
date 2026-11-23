import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Seo from "../components/Seo";
import AnimatedText from "../components/AnimatedText";
import MagneticButton from "../components/MagneticButton";
import HeroVisual from "../components/HeroVisual";
import Terminal from "../components/Terminal";
import SectionHeading from "../components/SectionHeading";
import SkillCard from "../components/SkillCard";
import Icon from "../components/Icon";
import { profile, stats, skillGroups, careerHighlights } from "../data/profile";
import { stagger, fadeUp, viewportOnce } from "../animations/variants";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      className="glass rounded-2xl p-6"
      data-cursor="card"
    >
      <p className="font-display text-3xl font-bold gradient-text sm:text-4xl">
        {stat.text ? (
          stat.text
        ) : (
          <>
            {stat.prefix}
            {inView ? (
              <CountUp
                start={stat.countFrom ?? 0}
                end={stat.value}
                duration={reduced ? 0 : 2}
                suffix={stat.suffix}
              />
            ) : (
              <span>{stat.countFrom ?? 0}</span>
            )}
          </>
        )}
      </p>
      <p className="mt-2 text-sm text-muted">{stat.label}</p>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 1.4, delay: 0.2 + index * 0.1 }}
          className="h-full bg-gradient-to-r from-violet to-cyan"
        />
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Frontend & React.js Developer"
        description="Chaitanya Vibhute – Frontend Developer and React.js Developer in Nagpur, India with 3+ years of experience building responsive, scalable web applications with React.js and Angular."
        path="/"
        jsonLd
      />

      {/* HERO */}
      <section className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs text-cyan"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" /> {profile.title}
          </motion.p>

          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <AnimatedText text="Hi, I'm Chaitanya." delay={1.5} />
          </h1>

          <p className="mt-5 font-display text-xl font-medium leading-snug text-soft/95 sm:text-2xl">
            <AnimatedText
              text="Crafting Modern Web Experiences with React.js & JavaScript."
              delay={1.9}
              gradientWords={["Modern", "Web", "Experiences"]}
            />
          </p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <MagneticButton to="/experience" cursorLabel="Explore">
              Explore My Experience <Icon name="arrow" size={16} />
            </MagneticButton>
            <MagneticButton to="/contact" variant="ghost" cursorLabel="Connect">
              Let&apos;s Connect
            </MagneticButton>
            <MagneticButton href={profile.resumeUrl} variant="outline" cursorLabel="Get" download>
              <Icon name="download" size={16} /> Download Resume
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          className="space-y-6"
        >
          <HeroVisual />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="lg:col-span-2"
        >
          <div className="mx-auto max-w-2xl">
            <Terminal />
          </div>
        </motion.div>
      </section>

      <div className="section-sep" />

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-6 py-24" aria-label="Key statistics">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </motion.div>
      </section>

      {/* TECHNICAL EXPERTISE */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="// Technical expertise"
          title="Tools I build with"
          gradientWords={["build"]}
          subtitle="A focused stack across frontend, UI architecture, APIs and tooling."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((g, i) => (
            <SkillCard key={g.title} title={g.title} icon={g.icon} items={g.items} index={i} />
          ))}
        </motion.div>
      </section>

      <div className="section-sep" />

      {/* PROFESSIONAL HIGHLIGHTS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="// Professional highlights"
          title="What I bring to a team"
          gradientWords={["bring"]}
        />
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 md:grid-cols-2"
        >
          {careerHighlights.map((h, i) => (
            <motion.li
              key={h}
              variants={fadeUp}
              custom={i}
              className="glass flex items-center gap-4 rounded-2xl p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan font-mono text-xs font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-soft/95">{h}</span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-12">
          <MagneticButton to="/experience" cursorLabel="Explore">
            See full experience <Icon name="arrow" size={16} />
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
