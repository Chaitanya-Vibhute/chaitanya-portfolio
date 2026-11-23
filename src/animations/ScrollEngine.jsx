import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * The ONE scroll engine. Lenis drives smooth scrolling; GSAP's ticker drives Lenis;
 * ScrollTrigger is updated from Lenis. No other component creates scroll listeners
 * for the same purpose, so there is no duplicate engine.
 */
export default function ScrollEngine() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      window.__lenis = null;
      return;
    }

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [reduced]);

  return null;
}
