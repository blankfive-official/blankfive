import Reveal from "./Reveal";

const features = [
  { line1: "100%", line2: "Custom Designed" },
  { line1: "Mobile", line2: "First" },
  { line1: "SEO", line2: "Optimized" }
];

export default function Testimonials() {
  return (
    <section data-testid="testimonials-section" className="relative py-24 md:py-40 border-t border-white/10 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(08) — Trusted by brands</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-white max-w-3xl">
            Designing digital products<br />
            <span className="text-neutral-500">that drive growth.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <div className="group flex flex-col justify-center h-full min-h-[250px] border border-white/10 hover:border-white/30 bg-[#050505] p-8 md:p-10 transition-colors duration-300">
                <span className="font-display text-5xl md:text-6xl text-[#ff4d00] leading-tight mb-2">{f.line1}</span>
                <span className="text-neutral-200 text-2xl font-display leading-tight">{f.line2}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}