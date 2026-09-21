import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const scrollToId = (target) => {
  const lenis = window.aureonLenis;
  if (target === 0 || target === "#top") {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(target);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const Reveal = ({ children, delay = 0, y = 44, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.95, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: "112%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const SectionHead = ({ eyebrow, title, className = "" }) => (
  <Reveal className={className}>
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.08] text-bone">
      {title}
    </h2>
  </Reveal>
);

export const Counter = ({ end, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, end]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};
