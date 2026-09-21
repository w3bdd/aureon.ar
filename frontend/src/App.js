import { useEffect, useState } from "react";
import "@/App.css";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Values from "@/components/Values";
import Founder from "@/components/Founder";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Intro = () => (
  <motion.div
    exit={{ y: "-100%" }}
    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    className="fixed inset-0 z-[90] bg-obsidian flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-16 h-16 border border-bronze flex items-center justify-center"
    >
      <span className="font-serif text-3xl text-bronze">A</span>
    </motion.div>
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.6 }}
      className="mt-6 font-mono text-[10px] uppercase tracking-[0.45em] text-ash"
    >
      Aureon · Est. 2016
    </motion.p>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 h-px w-40 origin-left bg-bronze/70"
    />
  </motion.div>
);

function App() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    window.aureonLenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const timer = setTimeout(() => setIntro(false), 1500);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="App bg-obsidian text-bone min-h-screen antialiased">
      <AnimatePresence>{intro && <Intro />}</AnimatePresence>
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Portfolio />
        <Process />
        <Values />
        <Founder />
        <Contact />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--surface)",
            border: "1px solid var(--edge)",
            color: "var(--bone)",
            borderRadius: "12px",
          },
        }}
      />
    </div>
  );
}

export default App;
