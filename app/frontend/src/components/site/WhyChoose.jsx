import Reveal from "./Reveal";

const items = [
  { title: "Innovative Thinking", desc: "We craft solutions designed for tomorrow, not just today's brief." },
  { title: "Clean Code", desc: "Maintainable, scalable, and secure architectures that age well." },
  { title: "Client First", desc: "Every decision starts with your business goals and end-users." },
  { title: "Fast Delivery", desc: "Efficient development without sacrificing quality or rigor." },
  { title: "Modern Technology", desc: "React · Next.js · Node · Django · Python · Java · Flutter · AWS." },
  { title: "Continuous Support", desc: "We stay with you after launch — updates, monitoring, iteration." },
];

export default function WhyChoose() {
  return (
    <section id="why" data-testid="why-section" className="relative py-24 md:py-40 border-t border-white/10 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(03) — Why BlankFive</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-white max-w-4xl">
            Six reasons teams trust us<br />
            <span className="text-neutral-500">from kickoff to production.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={0.05 * (i % 3)}>
              <div data-testid={`why-item-${i}`} className="group bg-[#050505] hover:bg-[#0e0e0e] p-8 md:p-10 min-h-[220px] flex flex-col justify-between transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#ccff00]">◆</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600">
                    Trait {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-3 tracking-tight">{it.title}</h3>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{it.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}