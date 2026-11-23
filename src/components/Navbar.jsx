import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "../data/profile";
import MagneticButton from "./MagneticButton";
import { cn } from "../utils/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
          scrolled ? "glass shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)]" : "border border-transparent bg-transparent"
        )}
      >
        <Link to="/" className="font-display text-lg font-bold tracking-tight" data-cursor="link" data-cursor-label="Home">
          <span className="gradient-text">Chaitanya</span>
          <span className="text-soft"> Vibhute</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-soft" : "text-muted hover:text-soft"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-violet/40"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {l.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton to="/contact" className="px-5 py-2.5" cursorLabel="Hire">
            Let&apos;s Talk
          </MagneticButton>
        </div>

        <button
          type="button"
          className="relative z-[90] flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 top-0 h-0.5 w-6 rounded bg-soft"
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="absolute left-0 top-[7px] h-0.5 w-6 rounded bg-soft"
              animate={{ opacity: open ? 0 : 1 }}
            />
            <motion.span
              className="absolute left-0 top-[14px] h-0.5 w-6 rounded bg-soft"
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[85] flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.25 + i * 0.07 } }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "block py-3 font-display text-4xl font-bold",
                        isActive ? "gradient-text" : "text-soft/80"
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <p className="mt-10 font-mono text-xs text-muted">{profile.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
