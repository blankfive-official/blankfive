import { ArrowUpRight, ArrowDown } from "lucide-react";
import Reveal from "./Reveal";

const badges = [
  "Trusted Development Partner",
  "Fast Delivery",
  "Modern Technology",
  "End-to-End Solutions",
];

export default function Hero() {
  return (
    <section id="top" data-testid="hero-section" className="relative min-h-screen w-full pt-32 md:pt-36 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-bg.jpeg"
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/85 to-[#050505]" />
        <div className="absolute inset-0 noise-overlay opacity-40" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end min-h-[75vh]">
        <div className="lg:col-span-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-[#ff4d00]" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-400">
                BlankFive / Software Studio · Est. Kerala
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 data-testid="hero-heading" className="font-display text-[13vw] leading-[0.9] md:text-[8vw] lg:text-[7.2vw] tracking-[-0.03em] text-white">
              We build<br />
              digital <span className="text-[#ff4d00]">experiences</span><br />
              that scale.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-neutral-300 leading-relaxed">
              BlankFive is a software development agency creating modern websites, web applications, AI-powered solutions, and digital products that help businesses grow faster.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" data-testid="hero-cta-start" className="group inline-flex items-center gap-3 bg-[#ff4d00] hover:bg-[#e64500] text-black font-mono text-xs uppercase tracking-[0.2em] px-6 py-4 transition-colors duration-200">
                Start Your Project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
              </a>
              <a href="#projects" data-testid="hero-cta-work" className="inline-flex items-center gap-3 border border-white/20 hover:border-white/60 hover:bg-white/5 text-white font-mono text-xs uppercase tracking-[0.2em] px-6 py-4 transition-colors duration-200">
                View Our Work <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:pl-6">
          <Reveal delay={0.35}>
            <div className="border-l border-white/10 pl-6 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">What clients get</span>
              <ul className="space-y-3">
                {badges.map((b, i) => (
                  <li key={b} className="flex items-center gap-3 group" data-testid={`hero-badge-${i}`}>
                    <span className="h-1.5 w-1.5 bg-[#ccff00] group-hover:bg-[#ff4d00] transition-colors" />
                    <span className="text-sm md:text-base text-neutral-200">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-3 will-change-transform">
          {Array.from({ length: 2 }).flatMap((_, r) =>
            ["React", "Next.js", "Node.js", "Django", "Python", "Java", "Flutter", "Docker", "AWS", "PostgreSQL", "MongoDB", "TypeScript"].map((t, i) => (
              <span key={`${r}-${i}`} className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 px-8">
                {t} <span className="text-[#ff4d00] ml-6">✱</span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}