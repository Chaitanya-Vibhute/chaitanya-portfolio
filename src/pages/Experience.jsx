import { motion } from "framer-motion";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import ExperienceTimeline from "../components/ExperienceTimeline";
import SkillCard from "../components/SkillCard";
import MagneticButton from "../components/MagneticButton";
import { expertise, careerHighlights } from "../data/profile";
import { stagger, fadeUp, viewportOnce } from "../animations/variants";

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience"
        description="Professional experience of Chaitanya Vibhute – Frontend Developer at Cloud Solution Pvt. Ltd., building React.js and Angular business applications since February 2024."
        path="/experience"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-36">
        <SectionHeading
          as="h1"
          eyebrow="// Experience"
          title="My Professional Journey"
          gradientWords={["Professional", "Journey"]}
          subtitle="3+ years of experience building modern web applications, creating reusable interfaces, and delivering reliable frontend solutions."
        />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24" aria-label="Work history">
        <ExperienceTimeline />
      </section>

      <div className="section-sep" />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="// Professional expertise" title="Areas of expertise" gradientWords={["expertise"]} />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {expertise.map((e, i) => (
            <SkillCard key={e.title} title={e.title} icon={e.icon} blurb={e.blurb} index={i} />
          ))}
        </motion.div>
      </section>

      <div className="section-sep" />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="// Career highlights" title="Career highlights" gradientWords={["highlights"]} />
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 md:grid-cols-2"
        >
          {careerHighlights.map((h, i) => (
            <motion.li key={h} variants={fadeUp} custom={i} className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan font-mono text-xs font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-soft/95">{h}</span>
            </motion.li>
          ))}
        </motion.ul>
        <div className="mt-12">
          <MagneticButton to="/contact" cursorLabel="Connect">
            Let&apos;s work together
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
