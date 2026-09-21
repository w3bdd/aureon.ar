import { Reveal, SectionHead } from "./Reveal";

const CHAPTERS = [
  {
    num: "01",
    title: "Design with Purpose",
    desc: "Architecture as a balance of creativity, functionality, technology, budget, and long-term value. Every project begins with understanding — of the client, the site, and the life the space must serve.",
  },
  {
    num: "02",
    title: "Build with Integrity",
    desc: "Quality craftsmanship, responsible material selection, and disciplined execution. From structural work to final finishes, every millimetre is accountable to the standard we set in 2016.",
  },
  {
    num: "03",
    title: "Endure as Legacy",
    desc: "A family-owned practice building for generations. We measure success not at turnover, but in decades — in structures that stand, and relationships that last beyond them.",
  },
];

export default function Manifesto() {
  return (
    <section id="philosophy" className="py-24 lg:py-36">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead
              eyebrow="Our Philosophy"
              title={
                <>
                  A manifesto in <span className="text-bronze">three</span> chapters
                </>
              }
            />
            <Reveal delay={0.15}>
              <p className="mt-8 text-base font-normal leading-relaxed text-ash max-w-md">
                Every project begins with understanding the client's requirements
                and ends with delivering a structure that is carefully planned and
                responsibly built — guided by purposeful design, clear
                communication, and professional project management.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                Ch. 01 — 03 · The Aureon Doctrine
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.num} delay={i * 0.12}>
              <article
                data-testid={`manifesto-chapter-${i + 1}`}
                className="group border-t border-line py-10 lg:py-12 last:border-b grid sm:grid-cols-12 gap-4 sm:gap-8"
              >
                <span className="sm:col-span-2 font-mono text-sm text-bronze tracking-[0.2em]">
                  {c.num}
                </span>
                <div className="sm:col-span-10">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-bone group-hover:text-bronze transition-colors duration-500">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-ash max-w-xl">
                    {c.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
