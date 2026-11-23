import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      role="status"
      aria-label="Loading"
    >
      <div className="relative h-20 w-20">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-violet/80"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
          style={{ borderTopColor: "transparent" }}
        />
        <motion.span
          className="absolute inset-3 rounded-full border-2 border-cyan/80"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          style={{ borderBottomColor: "transparent" }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold gradient-text">
          CV
        </span>
      </div>
      <motion.p
        className="mt-6 font-mono text-xs uppercase tracking-[0.35em] text-muted"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        Loading experience
      </motion.p>
    </motion.div>
  );
}
