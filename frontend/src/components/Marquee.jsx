const ITEMS = [
  "Architecture",
  "Design & Build",
  "General Construction",
  "Renovation & Remodeling",
  "Project Management",
  "Est. 2016",
  "Angeles City, Pampanga",
  "Continuing a Family Legacy",
];

export default function Marquee() {
  return (
    <div
      data-testid="marquee-editorial-ribbon"
      className="relative border-y border-line bg-palm/30 py-5 overflow-hidden"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center shrink-0">
            {ITEMS.map((t) => (
              <span
                key={`${copy}-${t}`}
                className="flex items-center font-mono text-[11px] sm:text-xs uppercase tracking-[0.32em] text-ash whitespace-nowrap"
              >
                <span className="px-9">{t}</span>
                <span className="text-bronze text-[8px]">●</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
