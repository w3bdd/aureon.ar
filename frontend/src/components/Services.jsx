import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, SectionHead, EASE } from "./Reveal";

const SERVICES = [
  {
    code: "SRV-01",
    slug: "architecture-design",
    name: "Architecture & Design",
    desc: "Conceptual design shaped by vision, site, and long-term requirements.",
    items: ["Concept Development", "Architectural Planning", "Space Planning", "Design Development", "Construction Drawings", "3D Visualization", "Interior Architecture", "Construction Documentation"],
  },
  {
    code: "SRV-02",
    slug: "design-build",
    name: "Design & Build",
    desc: "Design and construction under one coordinated, accountable team.",
    items: ["Design Development", "Cost Planning", "Construction Documentation", "Procurement Coordination", "Construction Execution", "Quality Control", "Project Completion"],
  },
  {
    code: "SRV-03",
    slug: "general-construction",
    name: "General Construction",
    desc: "Full-scope construction for new buildings and property development.",
    items: ["Site Preparation", "Structural Works", "Masonry", "Roofing", "Electrical & Plumbing", "Doors & Windows", "Interior & Exterior Finishes", "Painting", "Site Development"],
  },
  {
    code: "SRV-04",
    slug: "renovation-remodeling",
    name: "Renovation & Remodeling",
    desc: "Planned renewal — expansion, restoration, and transformation.",
    items: ["Residential Renovations", "Commercial Renovations", "Building Extensions", "Interior Remodeling", "Facade Improvements", "Space Reconfiguration", "Structural Improvements", "Property Upgrades"],
  },
  {
    code: "SRV-05",
    slug: "project-management",
    name: "Project Management",
    desc: "Professional control over schedule, quality, and cost.",
    items: ["Project Planning", "Construction Scheduling", "Contractor Coordination", "Supplier Coordination", "Site Supervision", "Progress Monitoring", "Quality Control", "Client Reporting", "Project Turnover"],
  },
];

export default function Services() {
  const [open, setOpen] = useState(1);

  return (
    <section id="services" className="py-24 lg:py-36 bg-onyx/40 border-y border-line">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-20">
          <SectionHead
            eyebrow="Index of Capabilities"
            title={
              <>
                Five disciplines.<br />
                One <span className="text-bronze">integrated</span> firm.
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-faint">
              Select a discipline to inspect its full scope of work — each
              delivered by a single coordinated team from concept to turnover.
            </p>
          </Reveal>
        </div>

        <div>
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s.code} delay={i * 0.06} y={28}>
                <div className="border-b border-line first:border-t">
                  <button
                    data-testid={`service-card-${s.slug}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group w-full text-left grid grid-cols-12 items-center gap-3 sm:gap-6 py-7 sm:py-9"
                  >
                    <span className="col-span-3 sm:col-span-2 font-mono text-[11px] sm:text-xs tracking-[0.2em] text-faint group-hover:text-bronze transition-colors duration-300">
                      {s.code}
                    </span>
                    <span
                      className={`col-span-8 font-serif text-xl sm:text-3xl lg:text-4xl font-light tracking-tight transition-colors duration-400 ${
                        isOpen ? "text-bronze" : "text-bone group-hover:text-bronze"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span className="col-span-1 flex justify-end">
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className={`w-9 h-9 sm:w-11 sm:h-11 border flex items-center justify-center transition-colors duration-300 ${
                          isOpen ? "border-bronze text-bronze" : "border-edge text-ash group-hover:border-bronze group-hover:text-bronze"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </motion.span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 sm:pl-[16.66%] grid md:grid-cols-12 gap-6">
                          <p className="md:col-span-4 text-sm leading-relaxed text-ash">
                            {s.desc}
                          </p>
                          <div className="md:col-span-8 flex flex-wrap gap-2.5">
                            {s.items.map((item) => (
                              <span
                                key={item}
                                className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-ash border border-line rounded-full px-3.5 py-2 hover:border-bronze/60 hover:text-bone transition-colors duration-300"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
