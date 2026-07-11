import Reveal from "./Reveal";

const groups = [
  { label: "Frontend", items: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript"] },
  { label: "Backend", items: ["Django", "Node.js", "Express.js", "Java", "Python"] },
  { label: "Database", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  { label: "Cloud & DevOps", items: ["AWS", "Docker", "GitHub", "Firebase", "Vercel", "Nginx"] },
];

export default function TechStack() {
  return (
    <section id="stack" data-testid="stack-section" className="relative py-24 md:py-40 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(06) — Technology</span>
              <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-white max-w-3xl">
                The stack behind<br />
                <span className="text-neutral-500">every shipment.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-neutral-400 text-sm md:text-base leading-relaxed border-l border-white/15 pl-5">
              Selected pragmatically per project — never chasing trends, always chasing outcomes.
            </p>
          </Reveal>
        </div>

        <div className="space-y-0 border-t border-white/10">
          {groups.map((g, gi) => (
            <Reveal key={g.label} delay={0.05 * gi}>
              <div className="grid grid-cols-12 gap-6 py-10 border-b border-white/10 items-start">
                <div className="col-span-12 md:col-span-3">
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">({String(gi + 1).padStart(2, "0")})</span>
                  <h3 className="font-display text-3xl md:text-4xl text-white mt-3 tracking-tight">{g.label}</h3>
                </div>
                <div className="col-span-12 md:col-span-9 flex flex-wrap gap-3">
                  {g.items.map((t, ti) => (
                    <span key={t} data-testid={`tech-chip-${gi}-${ti}`} className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-200 border border-white/15 hover:border-[#ff4d00] hover:text-[#ff4d00] px-4 py-2 transition-colors duration-200 cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}