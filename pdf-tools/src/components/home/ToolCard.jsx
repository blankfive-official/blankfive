import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Merge, Split, FileDown, Image, ImagePlus, RotateCcw, Unlock,
} from "lucide-react";

/**
 * TOOLS — Central definition for all PDF tools.
 * Each entry drives the ToolCard, Navbar, and route config.
 */
export const TOOLS = [
  {
    id: "merge-pdf",
    label: "Merge PDF",
    description: "Combine multiple PDF files into one document in the order you choose.",
    icon: Merge,
    color: "#ff6b35",
    colorClass: "tool-merge",
    path: "/merge-pdf",
  },
  {
    id: "split-pdf",
    label: "Split PDF",
    description: "Separate a PDF into individual pages or extract specific page ranges.",
    icon: Split,
    color: "#3b82f6",
    colorClass: "tool-split",
    path: "/split-pdf",
  },
  {
    id: "compress-pdf",
    label: "Compress PDF",
    description: "Reduce PDF file size while keeping the best possible quality.",
    icon: FileDown,
    color: "#10b981",
    colorClass: "tool-compress",
    path: "/compress-pdf",
  },
  {
    id: "pdf-to-jpg",
    label: "PDF to JPG",
    description: "Convert each page of your PDF into high-quality JPG images.",
    icon: Image,
    color: "#8b5cf6",
    colorClass: "tool-convert",
    path: "/pdf-to-jpg",
  },
  {
    id: "jpg-to-pdf",
    label: "JPG to PDF",
    description: "Turn your JPG images into a single, well-formatted PDF document.",
    icon: ImagePlus,
    color: "#8b5cf6",
    colorClass: "tool-convert",
    path: "/jpg-to-pdf",
  },
  {
    id: "rotate-pdf",
    label: "Rotate PDF",
    description: "Rotate all or selected pages of your PDF by 90°, 180°, or 270°.",
    icon: RotateCcw,
    color: "#f59e0b",
    colorClass: "tool-rotate",
    path: "/rotate-pdf",
  },
  {
    id: "unlock-pdf",
    label: "Unlock PDF",
    description: "Remove password protection from your PDF so anyone can open it.",
    icon: Unlock,
    color: "#ef4444",
    colorClass: "tool-unlock",
    path: "/unlock-pdf",
  },
];

/**
 * ToolCard — A single tool card for the home page grid.
 * Features hover glow, accent color top-line, icon, and description.
 */
export default function ToolCard({ tool, index }) {
  const Icon = tool.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={tool.path}
        id={`tool-card-${tool.id}`}
        className="tool-card block bg-surface rounded-2xl border border-white/[0.06] p-6 md:p-7 h-full"
        style={{ "--tool-color": tool.color }}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${tool.color}15` }}
        >
          <Icon
            className="w-7 h-7"
            style={{ color: tool.color }}
            strokeWidth={1.75}
          />
        </div>

        {/* Title */}
        <h3 className="font-display text-lg text-white mb-2">
          {tool.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-400 leading-relaxed">
          {tool.description}
        </p>

        {/* Bottom accent line */}
        <div className="mt-5 flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: tool.color }}>
          <span>Use tool</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
