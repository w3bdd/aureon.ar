import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal, SectionHead, EASE } from "./Reveal";

const FILTERS = [
  { label: "All", testid: "portfolio-filter-all" },
  { label: "Residential", testid: "portfolio-filter-residential" },
  { label: "Commercial", testid: "portfolio-filter-commercial" },
  { label: "Institutional", testid: "portfolio-filter-institutional" },
  { label: "Development", testid: "portfolio-filter-development" },
];

const PROJECTS = [
  {
    title: "Villa Sierra",
    sector: "Residential",
    year: "2024",
    location: "Angeles City, Pampanga",
    area: "480 sqm",
    duration: "14 months",
    scope: "Design & Build",
    desc: "A modern courtyard residence composed around filtered daylight — cantilevered volumes, warm stone, and deep eaves tuned to the Central Luzon climate.",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-7",
  },
  {
    title: "Casa Lumen",
    sector: "Residential",
    year: "2023",
    location: "San Fernando, Pampanga",
    area: "320 sqm",
    duration: "11 months",
    scope: "Architecture & Construction",
    desc: "A minimalist family home where a double-height living hall anchors daily life — glass, timber, and board-formed concrete in quiet dialogue.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-5",
  },
  {
    title: "The Dusk Pavilion",
    sector: "Residential",
    year: "2025",
    location: "Clark Freeport Zone",
    area: "560 sqm",
    duration: "16 months",
    scope: "Design & Build",
    desc: "An evening-oriented residence — west-facing terraces, a lantern-lit pool court, and interiors designed to hold the golden hour.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-5",
  },
  {
    title: "Meridian Offices",
    sector: "Commercial",
    year: "2024",
    location: "Angeles City Business District",
    area: "1,850 sqm",
    duration: "20 months",
    scope: "General Construction",
    desc: "A five-storey professional hub with a sculpted facade grid — engineered for flexible tenancies, daylight autonomy, and low operating cost.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-7",
  },
  {
    title: "Halcyon Commercial Hub",
    sector: "Commercial",
    year: "2022",
    location: "MacArthur Highway, Angeles City",
    area: "2,400 sqm",
    duration: "22 months",
    scope: "Design & Build",
    desc: "A retail and dining destination anchored by a landscaped forecourt — high-visibility frontage paired with efficient back-of-house planning.",
    img: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-7",
  },
  {
    title: "San Agustin Learning Hall",
    sector: "Institutional",
    year: "2023",
    location: "Mabalacat, Pampanga",
    area: "1,100 sqm",
    duration: "15 months",
    scope: "Architecture & Project Management",
    desc: "A multi-purpose institutional hall — natural ventilation, durable finishes, and a dignified civic presence built for generations of use.",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-5",
  },
  {
    title: "Sierra Verde Terraces",
    sector: "Development",
    year: "2025",
    location: "Porac, Pampanga",
    area: "1.2 hectares",
    duration: "Ongoing — Phase II",
    scope: "Master Planning & Construction",
    desc: "A twelve-unit terraced residential development stepping with the terrain — shared greens, rainwater harvesting, and a unified material palette.",
    img: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-6",
  },
  {
    title: "Foundry Row Lofts",
    sector: "Development",
    year: "2026",
    location: "Angeles City Heritage District",
    area: "3,600 sqm",
    duration: "In construction",
    scope: "Property Development",
    desc: "Adaptive reuse of a mid-century industrial shell into eight loft residences — original trusses retained, new life inserted with surgical precision.",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-6",
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [cursorOn, setCursorOn] = useState(false);

  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const sx = useSpring(cx, { stiffness: 350, damping: 32 });
  const sy = useSpring(cy, { stiffness: 350, damping: 32 });

  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.sector === filter);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    window.aureonLenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.aureonLenis?.start();
    };
  }, [selected]);

  return (
    <section id="portfolio" className="py-24 lg:py-36">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <SectionHead
            eyebrow="Selected Works · 2016 — 2026"
            title={
              <>
                Structures that<br />
                <span className="text-bronze">outlive</span> their drawings
              </>
            }
          />
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.label}
                  data-testid={f.testid}
                  onClick={() => setFilter(f.label)}
                  className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] px-4 py-2.5 border transition-colors duration-300 ${
                    filter === f.label
                      ? "border-bronze text-bronze"
                      : "border-line text-faint hover:text-bone hover:border-edge"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div
          className="relative"
          onMouseMove={(e) => {
            cx.set(e.clientX);
            cy.set(e.clientY);
            if (!cursorOn) setCursorOn(true);
          }}
          onMouseLeave={() => setCursorOn(false)}
        >
          {cursorOn && !selected && (
            <motion.div
              style={{ x: sx, y: sy }}
              className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
            >
              <div className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                <div className="w-10 h-10 border border-bronze/80 rounded-full flex items-center justify-center">
                  <span className="w-1 h-1 bg-bronze rounded-full" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bronze bg-obsidian/80 px-2 py-1 border border-line">
                  View Project
                </span>
              </div>
            </motion.div>
          )}

          <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.button
                  layout
                  key={p.title}
                  data-testid={`portfolio-project-card-${i + 1}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
                  onClick={() => setSelected(p)}
                  className={`group relative text-left col-span-1 ${p.span}`}
                >
                  <div className="clip-corner overflow-hidden border border-line group-hover:border-bronze/50 transition-colors duration-500">
                    <div className="overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover grayscale-[0.7] group-hover:grayscale-0 group-hover:scale-[1.06] transition-[transform,filter] duration-[900ms] ease-out"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                        {p.sector} · {p.year} · {p.location}
                      </p>
                      <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl font-light text-bone group-hover:text-bronze transition-colors duration-400">
                        {p.title}
                      </h3>
                    </div>
                    <span className="mt-1 w-9 h-9 shrink-0 border border-line flex items-center justify-center text-ash group-hover:border-bronze group-hover:text-bronze transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
          >
            <div
              className="absolute inset-0 bg-obsidian/90 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative w-full max-w-5xl bg-onyx border border-line grid md:grid-cols-2 max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="h-64 md:h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="p-8 lg:p-10">
                <p className="eyebrow">
                  {selected.sector} — {selected.location}
                </p>
                <h3 className="mt-4 font-serif text-3xl sm:text-4xl font-light tracking-tight text-bone">
                  {selected.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-ash">
                  {selected.desc}
                </p>
                <dl className="mt-8">
                  {[
                    ["Year", selected.year],
                    ["Area", selected.area],
                    ["Duration", selected.duration],
                    ["Scope", selected.scope],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-t border-line py-3.5 last:border-b"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                        {k}
                      </dt>
                      <dd className="font-mono text-xs text-bone">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <button
                data-testid="portfolio-project-modal-close-button"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 w-10 h-10 bg-obsidian/70 backdrop-blur border border-line flex items-center justify-center text-bone hover:border-bronze hover:text-bronze transition-colors duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
