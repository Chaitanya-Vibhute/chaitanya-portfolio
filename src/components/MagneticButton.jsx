import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

const variants = {
  primary:
    "bg-gradient-to-r from-violet to-neon text-white shadow-[0_0_30px_-6px_rgba(139,92,246,0.7)] hover:shadow-[0_0_44px_-4px_rgba(59,130,246,0.8)]",
  ghost: "glass text-soft hover:border-cyan/60 hover:shadow-[0_0_28px_-8px_rgba(6,182,212,0.8)]",
  outline: "border border-violet/60 text-soft hover:bg-violet/10",
};

/**
 * Magnetic button. Renders a router <Link> (to), an <a> (href) or a <button>.
 * data-cursor / data-cursor-label drive the custom cursor state.
 */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  strength = 0.3,
  cursorLabel = "Click",
  className,
  type = "button",
  disabled,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-60",
    variants[variant],
    className
  );

  const common = {
    ref,
    className: classes,
    onMouseMove: onMove,
    onMouseLeave: reset,
    "data-cursor": "button",
    "data-cursor-label": cursorLabel,
    ...rest,
  };

  let inner;
  if (to) {
    inner = (
      <Link to={to} {...common} onClick={onClick}>
        {children}
      </Link>
    );
  } else if (href) {
    const external = /^https?:/.test(href);
    inner = (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...common}
        onClick={onClick}
      >
        {children}
      </a>
    );
  } else {
    inner = (
      <button type={type} disabled={disabled} onClick={onClick} {...common}>
        {children}
      </button>
    );
  }

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-block">
      {inner}
    </motion.span>
  );
}
