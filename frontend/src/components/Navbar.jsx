import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { EASE, scrollToId } from "./Reveal";

const LINKS = [
  { label: "Philosophy", href: "#philosophy", testid: "navbar-nav-item-philosophy" },
  { label: "Services", href: "#services", testid: "navbar-nav-item-services" },
  { label: "Portfolio", href: "#portfolio", testid: "navbar-nav-item-portfolio" },
  { label: "Approach", href: "#approach", testid: "navbar-nav-item-approach" },
  { label: "Founder", href: "#founder", testid: "navbar-nav-item-founder" },
  { label: "Contact", href: "#contact", testid: "navbar-nav-item-contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("aureon-theme", next ? "light" : "dark");
    } catch (e) {}
  };
  const go = (href) => {
    setOpen(false);
    setTimeout(() => scrollToId(href), open ? 250 : 0);
  };

  return (
    <>
      <div className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.9, ease: EASE }}
        className="w-full max-w-6xl pointer-events-auto"
      >
        <div className="backdrop-blur-xl bg-[var(--navbg)] border border-line rounded-full pl-4 pr-3 sm:pl-6 sm:pr-4 py-3 flex items-center justify-between shadow-2xl shadow-black/40">
          <button
            data-testid="navbar-logo-link"
            onClick={() => go(0)}
            className="flex items-center gap-3 group"
          >
            <span className="w-8 h-8 border border-[var(--bronze-70)] flex items-center justify-center font-serif text-bronze text-lg leading-none group-hover:bg-bronze group-hover:text-onbronze transition-colors duration-300">
              A
            </span>
            <span className="font-serif text-lg sm:text-xl tracking-[0.18em] text-bone">
              AUREON
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <button
                key={l.href}
                data-testid={l.testid}
                onClick={() => go(l.href)}
                className="text-[13px] font-medium tracking-wide text-ash hover:text-bone transition-colors duration-300"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              data-testid="navbar-theme-toggle"
              onClick={toggleTheme}
              aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
              className="w-10 h-10 flex items-center justify-center border border-line rounded-full text-ash hover:text-bronze hover:border-bronze transition-colors duration-300"
            >
              {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              data-testid="navbar-cta-consultation-button"
              onClick={() => go("#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 bg-bronze text-obsidian text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-bone transition-colors duration-300"
            >
              Request Consultation
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              data-testid="navbar-menu-button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center border border-line rounded-full text-bone"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-[var(--overlay)] backdrop-blur-lg flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-serif text-xl tracking-[0.18em] text-bone">AUREON</span>
              <button
                data-testid="navbar-menu-close-button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center border border-line rounded-full text-bone"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.href}
                  data-testid={`mobile-${l.testid}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.6, ease: EASE }}
                  onClick={() => go(l.href)}
                  className="text-left font-serif text-4xl sm:text-5xl font-light text-ash hover:text-bronze transition-colors duration-300 py-2"
                >
                  <span className="font-mono text-xs text-bronze mr-4 align-middle">
                    0{i + 1}
                  </span>
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <p className="px-8 pb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              Design. Build. Endure. — Est. 2016
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
