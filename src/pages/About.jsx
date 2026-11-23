import { motion } from "framer-motion";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import SkillCard from "../components/SkillCard";
import { profile, skillGroups, education, strengths } from "../data/profile";
import { stagger, fadeUp, viewportOnce } from "../animations/variants";

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Learn about Chaitanya Vibhute, a React.js and Angular Frontend Developer from Nagpur, India – skills, education and development approach."
        path="/about"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-36">
        <SectionHeading
          as="h1"
          eyebrow="// About"
          title="More About Me"
          gradientWords={["About", "Me"]}
          subtitle="Passionate about building meaningful digital experiences through clean code and thoughtful design."
        />
      </section>

      {/* INTRO + CAREER */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 md:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass rounded-2xl p-7"
          data-cursor="card"
        >
          <h2 className="font-display text-2xl font-semibold">Introduction</h2>
          <p className="mt-4 leading-relaxed text-muted">
            I&apos;m {profile.name}, a Frontend Developer based in {profile.location} with {profile.experienceYears}{" "}
            years of experience building responsive, scalable, and performance-oriented web applications using
            React.js and Angular.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass rounded-2xl p-7"
          data-cursor="card"
        >
          <h2 className="font-display text-2xl font-semibold">Career background</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Since {profile.employment.split(" – ")[0]}, I&apos;ve worked as a {profile.position} at {profile.company},
            developing business-workflow applications and integrating REST APIs for billing, inventory tracking, and
            reporting modules.
          </p>
        </motion.div>
      </section>

      {/* PHILOSOPHY + STRENGTHS */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-24 md:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass rounded-2xl p-7"
          data-cursor="card"
        >
          <h2 className="font-display text-2xl font-semibold">Development philosophy</h2>
          <p className="mt-4 leading-relaxed text-muted">
            I focus on reusable, component-based interfaces that stay consistent and maintainable, and on writing
            clean code that performs well across device sizes.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass rounded-2xl p-7"
        >
          <h2 className="font-display text-2xl font-semibold">Professional strengths</h2>
          <ul className="mt-4 space-y-3">
            {strengths.map((s, i) => (
              <motion.li key={s} variants={fadeUp} custom={i} className="flex gap-3 text-muted">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                {s}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      <div className="section-sep" />

      {/* TECHNICAL SKILLS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="// Technical expertise" title="Technical skills" gradientWords={["skills"]} />
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

      {/* EDUCATION */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="// Education" title="Education" gradientWords={["Education"]} />
        <div className="relative mt-12 pl-8">
          <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-violet to-cyan" />
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute left-0 top-2 h-6 w-6 rounded-full bg-ink ring-2 ring-cyan"
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="glass rounded-2xl p-7"
            data-cursor="card"
          >
            <h3 className="font-display text-xl font-semibold">{education.degree}</h3>
            <p className="mt-1 text-soft/90">{education.school}</p>
            <p className="mt-3 font-mono text-xs text-cyan">{education.date}</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
