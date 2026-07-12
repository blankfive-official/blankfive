import ToolCard, { TOOLS } from "./ToolCard";

/**
 * ToolGrid — Responsive grid of all 7 PDF tool cards on the home page.
 */
export default function ToolGrid() {
  return (
    <section id="tools-grid" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3 block">
            All Tools
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Every tool you need for <span className="gradient-text">PDFs</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-base">
            Select a tool below to get started. All processing happens right in your browser — fast, private, and free.
          </p>
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
