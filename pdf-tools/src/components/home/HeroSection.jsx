import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/**
 * HeroSection — Home page hero with large heading, subtitle, and CTA.
 */
export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-bg/80 to-bg" />
      <div className="absolute inset-0 noise-overlay opacity-30" />

      {/* Decorative floating elements */}
      <div className="absolute top-20 right-10 md:right-20 w-72 h-72 bg-brand/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 left-10 md:left-20 w-60 h-60 bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 w-full">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 bg-brand" />
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-400">
              BlankFive / PDF Tools — Free & Online
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            id="hero-heading"
            className="font-display text-[11vw] md:text-[6vw] lg:text-[5.5vw] leading-[0.95] tracking-tight text-white"
          >
            Every PDF tool<br />
            you need, in{" "}
            <span className="gradient-text">one place.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-base md:text-lg text-neutral-300 leading-relaxed"
          >
            Merge, split, compress, convert, rotate, and unlock your PDF files — all for free, directly in your browser. No sign-up, no watermarks, no limits.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#tools-grid"
              id="hero-cta-explore"
              className="group inline-flex items-center gap-3 bg-brand hover:bg-brand-hover text-black font-mono text-xs uppercase tracking-[0.2em] px-7 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-brand/20 hover:shadow-brand/30"
            >
              Explore Tools
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" strokeWidth={2.5} />
            </a>
            <a
              href="https://blankfive.com"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-about"
              className="inline-flex items-center gap-3 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white font-mono text-xs uppercase tracking-[0.2em] px-7 py-4 rounded-xl transition-all duration-200"
            >
              About Us
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 flex flex-wrap gap-8 md:gap-14"
          >
            {[
              { num: "7", label: "PDF Tools" },
              { num: "100%", label: "Free & Online" },
              { num: "0", label: "Uploads to Server*" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-2xl md:text-3xl text-white">
                  {stat.num}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-wider text-neutral-600">
            * Most tools process entirely in your browser. Compress PDF may use our server for best results.
          </p>
        </div>
      </div>
    </section>
  );
}
