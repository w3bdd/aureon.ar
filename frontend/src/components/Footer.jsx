import { ArrowUp } from "lucide-react";
import { scrollToId } from "./Reveal";

const NAV = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Approach", href: "#approach" },
  { label: "Founder", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  "Architecture & Design",
  "Design & Build",
  "General Construction",
  "Renovation & Remodeling",
  "Project Management",
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-onyx/60">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto pt-20 pb-10">
        <p className="font-serif font-light leading-none tracking-tight text-stroke text-[clamp(4rem,15vw,13rem)] select-none">
          AUREON
        </p>

        <div className="mt-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-serif text-lg tracking-[0.18em] text-bone">
              AUREON <span className="text-bronze">·</span> ARCHITECTURE &amp; BUILDERS
            </p>
            <p className="mt-4 text-sm leading-relaxed text-faint max-w-xs">
              A family-owned architectural and construction firm. Design. Build.
              Endure. — serving Central Luzon and selected projects nationwide
              since 2016.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <button
                    data-testid={`footer-nav-${n.label.toLowerCase()}`}
                    onClick={() => scrollToId(n.href)}
                    className="text-sm text-ash hover:text-bronze transition-colors duration-300"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-5">
              Capabilities
            </p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm text-ash">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-5">
              Head Office
            </p>
            <p
              data-testid="footer-corporate-address"
              className="text-sm leading-relaxed text-ash"
            >
              Aureon Center, MacArthur Highway<br />
              Angeles City, Pampanga 2009<br />
              Philippines
            </p>
            <a
              data-testid="footer-phone-link"
              href="tel:+63451234580"
              className="mt-4 block text-sm text-ash hover:text-bronze transition-colors duration-300"
            >
              +63 (045) 123 4580
            </a>
            <a
              data-testid="footer-email-link"
              href="mailto:info@aureonbuilders.example"
              className="mt-1.5 block text-sm text-ash hover:text-bronze transition-colors duration-300"
            >
              info@aureonbuilders.example
            </a>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              Mon–Fri 8AM–5PM · Sat 8AM–12NN
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            © 2016–2026 Aureon Architecture &amp; Builders. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bronze">
            Design. Build. Endure.
          </p>
          <button
            data-testid="footer-back-to-top-button"
            onClick={() => scrollToId(0)}
            aria-label="Back to top"
            className="w-11 h-11 border border-line flex items-center justify-center text-ash hover:border-bronze hover:text-bronze transition-colors duration-300"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
