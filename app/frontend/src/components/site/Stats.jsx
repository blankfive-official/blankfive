import Reveal from "./Reveal";

const stats = [
  { value: "10+", label: "Projects Completed" },
  { value: "10+", label: "Technologies Mastered" },
  { value: "100%", label: "Client-Focused" },
  { value: "24/7", label: "Support Available" },
];

export default function Stats() {
  return (
    <section data-testid="stats-section" className="relative py-24 md:py-32 border-t border-white/10 bg-[#ff4d00] text-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-black/70">(07) — By the Numbers</span>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border-t border-black/20">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.06 * i}>
              <div data-testid={`stat-${i}`} className={`py-12 md:py-16 pr-4 ${i < 3 ? "lg:border-r border-black/20" : ""} ${i < 2 ? "border-r border-black/20 lg:border-r" : ""}`}>
                <div className="font-display text-6xl md:text-8xl leading-none tracking-[-0.04em]">{s.value}</div>
                <div className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-black/80">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}