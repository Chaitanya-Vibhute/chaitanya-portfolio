import { motion } from "framer-motion";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import MagneticButton from "../components/MagneticButton";
import Icon from "../components/Icon";
import { profile } from "../data/profile";
import { stagger, fadeUp } from "../animations/variants";
import { useGlowCard } from "../hooks/useGlowCard";

function InfoCard({ icon, label, value, href, index }) {
  const glow = useGlowCard();
  const live = Boolean(href);
  const Tag = live ? "a" : "div";
  const external = live && /^https?:/.test(href);

  return (
    <motion.div variants={fadeUp} custom={index}>
      <Tag
        {...(live ? { href } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onMouseMove={glow}
        data-cursor="card"
        data-cursor-label={live ? "Open" : ""}
        className="glow-card glass flex items-center gap-4 p-5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet/30 to-cyan/20 text-cyan">
          <Icon name={icon} size={20} />
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[11px] uppercase tracking-widest text-muted">{label}</span>
          <span className="block truncate text-sm text-soft">{value}</span>
        </span>
      </Tag>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Chaitanya Vibhute, a React.js and Angular Frontend Developer in Nagpur, India, for opportunities, collaborations or ideas."
        path="/contact"
      />

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-36">
        <SectionHeading
          as="h1"
          eyebrow="// Contact"
          title="Let's Build Something Amazing Together."
          gradientWords={["Amazing", "Together."]}
          subtitle="Have an opportunity, collaboration, or idea? I'd love to hear from you."
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 lg:grid-cols-[1fr_1.1fr]">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
          <InfoCard index={0} icon="mail" label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <InfoCard index={1} icon="phone" label="Phone" value={profile.phone} href={`tel:${profile.phoneHref}`} />
          <InfoCard index={2} icon="pin" label="Location" value={profile.location} />
          <InfoCard
            index={3}
            icon="linkedin"
            label="LinkedIn"
            value={profile.linkedin ? "Connect on LinkedIn" : "Profile link coming soon"}
            href={profile.linkedin}
          />
          <InfoCard
            index={4}
            icon="github"
            label="GitHub"
            value={profile.github ? "View on GitHub" : "Profile link coming soon"}
            href={profile.github}
          />
          <motion.div variants={fadeUp} custom={5} className="pt-2">
            <MagneticButton href={profile.resumeUrl} variant="outline" cursorLabel="Get" download>
              <Icon name="download" size={16} /> Download Resume
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <ContactForm />
        </motion.div>
      </section>
    </>
  );
}
