import { motion } from "framer-motion";
import { Shield, Zap, Lock, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Most tools process entirely in your browser — no uploading, no waiting for server responses.",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your files never leave your device for most operations. No data is stored on our servers.",
  },
  {
    icon: Lock,
    title: "No Sign-up Required",
    description: "Start using tools immediately. No account creation, no email, no friction.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Fully responsive and works on desktop, tablet, and mobile browsers — any platform, any device.",
  },
];

/**
 * Features — "Why Choose Us" section on the home page.
 */
export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/30 to-bg" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3 block">
            Why Blank Five
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Built for <span className="text-brand">speed</span> and <span className="text-accent">privacy</span>
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-surface/50 border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-base text-white mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
