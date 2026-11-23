import { motion } from "framer-motion";
import { cn } from "../utils/cn";

/**
 * Split-text reveal. Words are split (not characters) to keep the DOM small and
 * to preserve natural wrapping. aria-label keeps the sentence readable by screen readers.
 */
export default function AnimatedText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  gradientWords = [],
  once = true,
}) {
  const MotionTag = motion[Tag] || motion.span;
  const words = text.split(" ");

  return (
    <MotionTag
      className={cn("inline-block", className)}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", gradientWords.includes(word) && "gradient-text")}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </MotionTag>
  );
}
