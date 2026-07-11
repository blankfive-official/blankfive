import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative py-24 md:py-40 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(01) — About Us</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-white">
              Building the future,<br />
              <span className="text-neutral-500">one product at a time.</span>
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden aspect-[16/10] border border-white/10 mb-10">
              <img
                src="/images/about-team.jpeg"
                alt="BlankFive team collaborating"
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-xs font-mono uppercase tracking-[0.24em] text-white/80">
                <span>Studio · Kerala</span>
                <span>MMXXV</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.2}>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                BlankFive is a technology company dedicated to transforming ideas into powerful digital products. We combine creativity, engineering, and business strategy to build software that is beautiful, scalable, and reliable.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                Whether you're a startup launching your first product or an established company modernizing legacy systems, our team delivers solutions tailored to your goals — we don't just ship software, we build long-term partnerships.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}