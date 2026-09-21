import { Reveal, SectionHead } from "./Reveal";

const PORTRAIT =
  "https://images.pexels.com/photos/3776969/pexels-photo-3776969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=720";

export default function Founder() {
  return (
    <section id="founder" className="py-24 lg:py-36 bg-[var(--onyx-40)] border-y border-line">
      <div
        data-testid="founder-biography-section"
        className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative">
              <div className="clip-corner overflow-hidden border border-line">
                <img
                  src={PORTRAIT}
                  alt="Architect Adrian Miguel Aureon, Founder and CEO"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover grayscale-[0.45] hover:grayscale-0 transition-[filter] duration-700"
                />
              </div>
              <span className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-bronze" />
              <span className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-bronze" />
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                Fig. 01 — Founder &amp; Chief Executive Officer
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <SectionHead eyebrow="The Founder" title="Architect Adrian Miguel Aureon" />
          <Reveal delay={0.12}>
            <p className="mt-8 text-base sm:text-lg font-light leading-relaxed text-ash max-w-2xl">
              In 2016, Architect Aureon founded the firm as a small family
              practice — combining professional architectural training with
              hands-on construction expertise. Under his leadership, Aureon has
              grown from residential beginnings into an integrated architecture
              and construction firm serving homeowners, entrepreneurs,
              institutions, and developers across Central Luzon.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-faint max-w-2xl">
              As Founder and CEO, he oversees the company's strategic direction,
              architectural standards, major projects, and client relationships —
              holding every structure to a single belief: that architecture should
              be both inspiring and practical, and that construction should
              reflect discipline, quality, and accountability.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <blockquote className="mt-10 border-l-2 border-bronze pl-6 sm:pl-8 max-w-2xl">
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-light italic leading-snug text-bone">
                "We don't simply build structures. We create spaces that become
                part of people's lives, businesses, and communities."
              </p>
              <footer className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-bronze">
                — A. M. Aureon, Founder &amp; CEO
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
