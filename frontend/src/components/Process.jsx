import { Reveal, SectionHead } from "./Reveal";

const STEPS = [
  { step: "01", name: "Discover", slug: "discover", desc: "Vision, requirements, site conditions, budget, and long-term objectives — understood before a single line is drawn." },
  { step: "02", name: "Design", slug: "design", desc: "Requirements transformed into architectural concepts, plans, visualizations, and considered design solutions." },
  { step: "03", name: "Plan", slug: "plan", desc: "Documentation, specifications, budget parameters, schedules, and construction strategies — locked with precision." },
  { step: "04", name: "Build", slug: "build", desc: "The approved design executed through coordinated construction, rigorous supervision, and quality control." },
  { step: "05", name: "Complete", slug: "complete", desc: "Final inspections, outstanding items resolved, and the finished project prepared for formal turnover." },
  { step: "06", name: "Support", slug: "support", desc: "Ongoing availability for future renovations, improvements, maintenance, and the next development." },
];

export default function Process() {
  return (
    <section id="approach" className="py-24 lg:py-36 bg-onyx/40 border-y border-line relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" />
      <div className="relative px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-20">
          <SectionHead
            eyebrow="The Approach · Blueprint Sequence"
            title={
              <>
                From concept<br />
                to <span className="text-bronze">completion</span>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-faint">
              Six governed phases. One accountable team. Close communication
              maintained through planning, design, construction, and turnover.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.07} y={30} className="bg-obsidian">
              <article
                data-testid={`step-card-${s.step}-${s.slug}`}
                className="group relative h-full p-8 lg:p-10 hover:bg-surface transition-colors duration-500"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm tracking-[0.2em] text-bronze">
                    {s.step}
                  </span>
                  <span className="w-2 h-2 border border-edge group-hover:border-bronze group-hover:bg-bronze transition-all duration-500" />
                </div>
                <h3 className="mt-8 font-serif text-2xl lg:text-3xl font-light tracking-tight text-bone group-hover:text-bronze transition-colors duration-400">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{s.desc}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-bronze group-hover:w-full transition-[width] duration-700 ease-out" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
