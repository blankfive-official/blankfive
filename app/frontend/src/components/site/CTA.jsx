import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section data-testid="cta-section" className="relative py-32 md:py-48 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 noise-overlay opacity-30" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(10) — Let's Build</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-8 text-[12vw] md:text-[9vw] lg:text-[8vw] leading-[0.88] tracking-[-0.035em] text-white">
            Ready to build<br />
            something <span className="italic text-[#ff4d00]">amazing?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <p className="max-w-xl text-neutral-300 text-base md:text-lg leading-relaxed">
              Let's create software that helps your business grow. Reach out with an idea, a napkin sketch, or a full brief — we'll take it from there.
            </p>
            <a href="#contact" data-testid="cta-start" className="group inline-flex items-center gap-3 bg-[#ff4d00] hover:bg-[#e64500] text-black font-mono text-xs uppercase tracking-[0.2em] px-7 py-5 transition-colors duration-200 w-fit">
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}