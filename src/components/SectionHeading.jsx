import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import { cn } from "../utils/cn";

export default function SectionHeading({ eyebrow, title, subtitle, as = "h2", align = "left", gradientWords, className }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan"
        >
          {eyebrow}
        </motion.p>
      )}
      <AnimatedText
        as={as}
        text={title}
        gradientWords={gradientWords}
        className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-5 text-base leading-relaxed text-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
