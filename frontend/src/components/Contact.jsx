import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Loader2 } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY || "";

const buildSummary = (f) =>
  [
    `Sector: ${f.sector}`,
    `Services: ${f.services.length ? f.services.join(", ") : "Not specified"}`,
    `Budget: ${f.budget || "Not specified"}`,
    `Timeline: ${f.timeline || "Not specified"}`,
    `Location: ${f.location}`,
    "",
    f.message,
  ].join("\n");

const SECTORS = ["Residential", "Commercial", "Institutional", "Property Development"];
const SERVICE_CHIPS = ["Architecture & Design", "Design & Build", "General Construction", "Renovation & Remodeling", "Project Management"];
const BUDGETS = ["PHP 5M – 15M", "PHP 15M – 30M", "PHP 30M – 75M", "PHP 75M+", "To be advised"];
const TIMELINES = ["Ready to start", "Within 3 months", "3 – 6 months", "6 – 12 months", "Early planning"];

const INITIAL = {
  full_name: "",
  email: "",
  phone: "",
  sector: "",
  services: [],
  budget: "",
  timeline: "",
  location: "",
  message: "",
  botcheck: false,
};

const inputCls =
  "w-full bg-onyx border border-line rounded-lg px-4 py-3.5 text-sm text-bone placeholder:text-faint outline-none focus:border-bronze transition-colors duration-300";
const labelCls = "block font-mono text-[10px] uppercase tracking-[0.25em] text-faint mb-2.5";

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggleService = (s) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.botcheck) {
      setForm(INITIAL);
      return;
    }
    setSending(true);
    try {
      if (BACKEND_URL) {
        const { data } = await axios.post(`${API}/enquiries`, form);
        toast.success("Enquiry received", {
          description: `Reference ${data.reference_id} — our team will respond within one business day.`,
        });
      } else if (WEB3FORMS_KEY) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `Aureon Project Consultation — ${form.sector}`,
            from_name: "Aureon Website",
            name: form.full_name,
            email: form.email,
            phone: form.phone,
            message: buildSummary(form),
          }),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || "Submission failed");
        toast.success("Enquiry sent", {
          description: "Thank you — our team will respond within one business day.",
        });
      } else {
        const subject = encodeURIComponent(`Aureon Project Consultation — ${form.sector}`);
        const body = encodeURIComponent(
          `Name: ${form.full_name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${buildSummary(form)}`
        );
        window.location.href = `mailto:projects@aureonbuilders.example?subject=${subject}&body=${body}`;
        toast.success("Opening your email app", {
          description: "Your enquiry is pre-filled — just press send.",
        });
      }
      setForm(INITIAL);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error("Submission failed", {
        description:
          (typeof detail === "string" && detail) ||
          err?.message ||
          "Please check the form and try again, or email projects@aureonbuilders.example.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-36">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="Project Consultations"
            title={
              <>
                Let's build something<br />
                that <span className="text-bronze">endures</span>
              </>
            }
          />
          <Reveal delay={0.12}>
            <p className="mt-8 text-base leading-relaxed text-ash max-w-md">
              Building a home, commercial property, or development is a
              significant investment. Tell us about your project — we respond to
              every consultation request within one business day.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 space-y-5 max-w-md">
              <div className="flex gap-4 items-start">
                <MapPin className="w-4 h-4 text-bronze mt-1 shrink-0" />
                <p className="text-sm leading-relaxed text-ash">
                  Aureon Center, MacArthur Highway<br />
                  Angeles City, Pampanga 2009, Philippines
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="w-4 h-4 text-bronze mt-1 shrink-0" />
                <p className="text-sm text-ash">
                  +63 (045) 123 4580<br />+63 917 845 6210
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <Mail className="w-4 h-4 text-bronze mt-1 shrink-0" />
                <p className="text-sm text-ash">
                  projects@aureonbuilders.example<br />info@aureonbuilders.example
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <Clock className="w-4 h-4 text-bronze mt-1 shrink-0" />
                <p className="text-sm text-ash">
                  Mon – Fri: 8:00 AM – 5:00 PM<br />Sat: 8:00 AM – 12:00 PM · Sun: Closed
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <form
              data-testid="consultation-form"
              onSubmit={submit}
              className="bg-surface border border-line rounded-2xl p-6 sm:p-10"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls} htmlFor="cf-name">Full Name *</label>
                  <input
                    id="cf-name"
                    data-testid="consultation-input-full-name"
                    required
                    minLength={2}
                    value={form.full_name}
                    onChange={set("full_name")}
                    placeholder="Juan D. Cruz"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="cf-email">Email *</label>
                  <input
                    id="cf-email"
                    data-testid="consultation-input-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="cf-phone">Phone *</label>
                  <input
                    id="cf-phone"
                    data-testid="consultation-input-phone"
                    required
                    minLength={6}
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+63 917 000 0000"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="cf-sector">Project Sector *</label>
                  <select
                    id="cf-sector"
                    data-testid="consultation-select-sector"
                    required
                    value={form.sector}
                    onChange={set("sector")}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled>Select a sector</option>
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-7">
                <span className={labelCls}>Service Required</span>
                <div className="flex flex-wrap gap-2.5">
                  {SERVICE_CHIPS.map((s) => {
                    const active = form.services.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        data-testid={`consultation-chip-${s.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                        onClick={() => toggleService(s)}
                        className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] px-3.5 py-2.5 border rounded-full transition-colors duration-300 ${
                          active
                            ? "border-bronze text-bronze bg-[var(--bronze-10)]"
                            : "border-line text-faint hover:text-bone hover:border-edge"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mt-7">
                <div>
                  <label className={labelCls} htmlFor="cf-budget">Estimated Budget</label>
                  <select
                    id="cf-budget"
                    data-testid="consultation-input-budget"
                    value={form.budget}
                    onChange={set("budget")}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled>Select a range</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="cf-timeline">Target Timeline</label>
                  <select
                    id="cf-timeline"
                    data-testid="consultation-input-timeline"
                    value={form.timeline}
                    onChange={set("timeline")}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled>Select a timeline</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-7">
                <label className={labelCls} htmlFor="cf-location">Project Location / Site *</label>
                <input
                  id="cf-location"
                  data-testid="consultation-input-location"
                  required
                  minLength={2}
                  value={form.location}
                  onChange={set("location")}
                  placeholder="e.g. Lot 12, Brgy. Mining, Angeles City"
                  className={inputCls}
                />
              </div>

              <div className="mt-7">
                <label className={labelCls} htmlFor="cf-message">Your Vision *</label>
                <textarea
                  id="cf-message"
                  data-testid="consultation-input-message"
                  required
                  minLength={10}
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Describe your project — the site, the spaces you imagine, and what matters most to you."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <input
                type="checkbox"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                className="hidden"
                checked={form.botcheck}
                onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked }))}
              />
              <button
                data-testid="consultation-form-submit-button"
                type="submit"
                disabled={sending}
                className="mt-9 w-full inline-flex items-center justify-center gap-2 bg-bronze rounded-full text-onbronze text-sm font-semibold px-7 py-4 hover:bg-bone disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transmitting…
                  </>
                ) : (
                  <>
                    Request Consultation
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-faint text-center">
                Response within one business day · Reference ID issued on submission
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
