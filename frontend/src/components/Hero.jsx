import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { MaskedLine, Counter, EASE, scrollToId } from "./Reveal";

const HERO_IMG =
  "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBsdXh1cnklMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvciUyMGV4dGVyaW9yJTIwbWluaW1hbGlzdCUyMGhvdXNlfGVufDB8fHx8MTc4OTk2NjMxNHww&ixlib=rb-4.1.0&q=85";

const STATS = [
  { end: 10, suffix: "+", label: "Years of Legacy" },
  { end: 120, suffix: "+", label: "Projects Delivered" },
  { end: 4, suffix: "", label: "Project Sectors" },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20 });
  const sy = useSpring(my, { stiffness: 55, damping: 20 });

  const onMouse = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 14);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouse}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Modern architectural residence at dusk"
          className="w-full h-full object-cover scale-[1.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/75 via-obsidian/45 to-obsidian" />
        <div className="absolute inset-0 blueprint-grid" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full pt-36 pb-10"
      >
        <motion.div style={{ x: sx, y: sy }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45, duration: 0.9 }}
            className="eyebrow"
            data-testid="hero-tagline"
          >
            Aureon Architecture &amp; Builders — Est. 2016 · Angeles City, Pampanga
          </motion.p>

          <h1
            data-testid="hero-title"
            className="mt-6 font-serif font-light tracking-tight leading-[0.98] text-bone text-[clamp(3.4rem,11vw,9.5rem)]"
          >
            <MaskedLine delay={1.55}>Design.</MaskedLine>
            <MaskedLine delay={1.68}>Build.</MaskedLine>
            <MaskedLine delay={1.81}>
              <span>
                Endure<span className="text-bronze">.</span>
              </span>
            </MaskedLine>
          </h1>
        </motion.div>

        <div className="mt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.9, ease: EASE }}
            className="max-w-md text-base sm:text-lg font-light leading-relaxed text-ash"
          >
            Creating thoughtful spaces. Building lasting structures. Continuing a
            family legacy — from concept to completion since 2016.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.9, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-explore-projects-button"
              onClick={() => scrollToId("#portfolio")}
              className="inline-flex items-center gap-2 border border-edge text-bone text-sm font-medium px-7 py-3.5 hover:border-bronze hover:text-bronze transition-colors duration-300"
            >
              Explore Projects
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              data-testid="hero-book-consultation-button"
              onClick={() => scrollToId("#contact")}
              className="inline-flex items-center gap-2 bg-bronze text-obsidian text-sm font-semibold px-7 py-3.5 hover:bg-bone transition-colors duration-300"
            >
              Book a Consultation
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.45, duration: 1 }}
          className="mt-14 pt-8 border-t border-line/80 grid grid-cols-3 gap-6"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl sm:text-5xl font-light text-bone lnum">
                <Counter end={s.end} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-faint">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 1 }}
        className="absolute right-6 sm:right-10 bottom-40 hidden md:flex flex-col items-center gap-3 z-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint rotate-90 origin-center translate-y-[-8px]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-bronze mt-6" />
        </motion.span>
      </motion.div>
    </section>
  );
}
