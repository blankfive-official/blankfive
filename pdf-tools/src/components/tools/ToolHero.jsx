import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/**
 * ToolHero — Per-tool page hero banner with title, description, and back link.
 *
 * @param {Object} props
 * @param {string} props.title - Tool title
 * @param {string} props.description - Tool description
 * @param {React.ComponentType} props.icon - Lucide icon component
 * @param {string} props.color - Tool accent color
 */
export default function ToolHero({ title, description, icon: Icon, color = "#ff4d00" }) {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[160px] opacity-10"
        style={{ backgroundColor: color }}
      />
      <div className="absolute inset-0 noise-overlay opacity-20" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono text-xs uppercase tracking-[0.2em]">All Tools</span>
          </Link>
        </motion.div>

        <div className="flex items-start gap-5">
          {/* Tool Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10" style={{ color }} strokeWidth={1.5} />
          </motion.div>

          {/* Title + Description */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-3"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-neutral-400 text-base md:text-lg max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
