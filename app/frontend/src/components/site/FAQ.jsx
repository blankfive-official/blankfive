import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "./Reveal";

const faqs = [
  { q: "How long does a project take?", a: "Project timelines depend on complexity. Most websites take 2–6 weeks, while custom software and AI-heavy platforms may take longer. We share a detailed timeline after the Discovery phase." },
  { q: "Do you provide maintenance?", a: "Yes. We offer ongoing maintenance, updates, security patches, and technical support — either through retainer or on-demand blocks." },
  { q: "Can you redesign existing software?", a: "Absolutely. We modernize legacy systems with improved performance, cleaner architecture, and better UX — often incrementally so business isn't disrupted." },
  { q: "What industries do you work with?", a: "We build solutions for startups, education, healthcare, retail, manufacturing, finance, logistics, and more. If it needs software, we're a fit." },
];

export default function FAQ() {
  return (
    <section id="faq" data-testid="faq-section" className="relative py-24 md:py-40 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(09) — FAQ</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-white">
              Answers to<br />
              <span className="text-neutral-500">common questions.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-neutral-400 text-sm md:text-base leading-relaxed">
              Still curious? Ping us at{" "}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=blankfive.official@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-[#ff4d00] transition-colors">
                blankfive.official@gmail.com
              </a>{" "}
              and we'll respond within a business day.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={0.15}>
            <Accordion type="single" collapsible className="border-t border-white/10" data-testid="faq-accordion">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-white/10">
                  <AccordionTrigger data-testid={`faq-trigger-${i}`} className="group py-8 hover:no-underline">
                    <div className="flex items-center gap-6 text-left w-full">
                      <span className="font-mono text-xs text-neutral-500">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-xl md:text-2xl text-white group-hover:text-[#ff4d00] transition-colors tracking-tight">{f.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent data-testid={`faq-content-${i}`} className="pb-8 pl-10 pr-6 text-neutral-400 text-base md:text-lg leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}