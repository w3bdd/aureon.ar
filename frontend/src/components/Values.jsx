import { Reveal } from "./Reveal";

const VALUES = [
  { name: "Integrity", desc: "Honesty, transparency, and accountability in every transaction." },
  { name: "Quality", desc: "High standards in design, materials, workmanship, and execution." },
  { name: "Craftsmanship", desc: "Precision, skill, and attention to detail at every stage." },
  { name: "Collaboration", desc: "Close work with clients, engineers, contractors, and consultants." },
  { name: "Responsibility", desc: "Respect for our clients' resources, schedules, and expectations." },
  { name: "Innovation", desc: "Appropriate technologies, materials, and construction practices." },
  { name: "Legacy", desc: "A family perspective — building for the long term, with pride." },
];

export default function Values() {
  return (
    <section className="py-24 lg:py-32">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-12">Core Values · What Endures</p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {VALUES.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.06} y={26} className="bg-obsidian">
              <div
                data-testid={`value-${v.name.toLowerCase()}`}
                className="group h-full p-7 lg:p-9 hover:bg-surface transition-colors duration-500"
              >
                <span className="font-mono text-[10px] tracking-[0.25em] text-faint group-hover:text-bronze transition-colors duration-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-serif text-xl lg:text-2xl font-light text-bone group-hover:text-bronze transition-colors duration-400">
                  {v.name}
                </h3>
                <p className="mt-2.5 text-xs lg:text-sm leading-relaxed text-ash">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.42} y={26} className="bg-bronze">
            <div className="h-full p-7 lg:p-9 flex items-center">
              <p className="font-serif text-xl lg:text-2xl font-light italic leading-snug text-onbronze">
                "Design with purpose. Build with integrity."
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
