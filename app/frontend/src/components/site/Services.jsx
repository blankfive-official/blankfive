import { Code2, Boxes, Smartphone, PenTool, BrainCircuit, Cloud } from "lucide-react";
import Reveal from "./Reveal";

const services = [
  { icon: Code2, title: "Web Development", desc: "Modern, responsive, SEO-friendly websites built with the latest technologies." },
  { icon: Boxes, title: "Custom Software", desc: "Business management systems, ERP, CRM, dashboards, and enterprise applications." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform Android & iOS applications engineered for performance." },
  { icon: PenTool, title: "UI/UX Design", desc: "User-centered interfaces that are clean, intuitive, and conversion-focused." },
  { icon: BrainCircuit, title: "AI Solutions", desc: "AI chatbots, automation systems, recommendation engines, and intelligent workflows." },
  { icon: Cloud, title: "Cloud & DevOps", desc: "Secure hosting, deployment pipelines, cloud infrastructure, and server management." },
];

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 md:py-40 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(02) — Our Services</span>
              <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-white max-w-3xl">
                Full-spectrum engineering<br />
                <span className="text-neutral-500">for ambitious teams.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-neutral-400 text-sm md:text-base leading-relaxed border-l border-white/15 pl-5">
              Six practice areas, one integrated team — no hand-offs, no lost context, no friction between design and shipping.
            </p>
          </Reveal>
        </div>

        <div className="border-l border-t border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={0.05 * (i % 3)}>
                <div data-testid={`service-card-${i}`} className="grid-cell group p-8 md:p-10 min-h-[280px] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-white group-hover:text-[#ff4d00] transition-colors duration-300" strokeWidth={1.5} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-16">
                    <h3 className="font-display text-2xl md:text-3xl text-white mb-4 tracking-tight">{s.title}</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}