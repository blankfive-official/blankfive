import Reveal from "./Reveal";

const steps = [
  { n: "01", title: "Discovery", desc: "Understanding your vision, users, market, and business objectives before writing a line of code." },
  { n: "02", title: "Planning", desc: "Project roadmap, architecture, timelines, and success metrics — all documented and agreed." },
  { n: "03", title: "Design", desc: "Wireframes, UI/UX systems, and interactive prototypes validated with real users." },
  { n: "04", title: "Development", desc: "Agile sprints with continuous integration, code reviews, and demoable increments." },
  { n: "05", title: "Testing", desc: "Performance, security, accessibility, and quality assurance across every device." },
  { n: "06", title: "Launch & Support", desc: "Deployment, monitoring, updates, and long-term maintenance — we don't ghost after launch." },
];

export default function Process() {
  return (
    <section id="process" data-testid="process-section" className="relative py-24 md:py-40 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(04) — Our Process</span>
              <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-white max-w-3xl">
                From blank page<br />
                <span className="text-neutral-500">to shipped product.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-neutral-400 text-sm md:text-base leading-relaxed border-l border-white/15 pl-5">
              A structured six-stage process refined across every project — so you always know what happens next.
            </p>
          </Reveal>
        </div>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={0.04 * i}>
              <div data-testid={`process-step-${i}`} className="group grid grid-cols-12 gap-6 items-center py-10 md:py-14 border-t border-white/10 last:border-b hover:bg-white/[0.02] transition-colors duration-300">
                <div className="col-span-4 md:col-span-3">
                  <span className={`hollow-num text-[6rem] md:text-[9rem] block ${i === 5 ? "hollow-num-accent" : ""}`}>{s.n}</span>
                </div>
                <div className="col-span-8 md:col-span-4">
                  <h3 className="font-display text-3xl md:text-5xl text-white tracking-tight">{s.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-lg">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}