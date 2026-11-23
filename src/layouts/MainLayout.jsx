import { Suspense, useEffect, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import BackgroundEffects from "../components/BackgroundEffects";
import Preloader from "../components/Preloader";
import PageTransition from "../components/PageTransition";
import ScrollEngine from "../animations/ScrollEngine";

export default function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet(); // frozen per-render so exit animations keep the old page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(id);
  }, []);

  // Scroll to top on route change (works with or without Lenis)
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[300] rounded-md bg-violet px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      <ScrollEngine />
      <BackgroundEffects />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main" className="relative min-h-screen">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Suspense fallback={<div className="min-h-screen" />}>
              {outlet}
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
      <Toaster theme="dark" position="bottom-right" richColors />
    </>
  );
}
