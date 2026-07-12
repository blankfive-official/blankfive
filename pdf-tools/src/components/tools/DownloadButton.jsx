import { Download, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

/**
 * DownloadButton — Animated download button shown after processing.
 *
 * @param {Object} props
 * @param {function} props.onClick - Download handler
 * @param {string} props.label - Button label
 * @param {string} props.toolColor - Accent color
 * @param {string} props.fileInfo - Optional "2.3 MB" info string
 */
export default function DownloadButton({
  onClick,
  label = "Download",
  toolColor = "#ff4d00",
  fileInfo,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 flex flex-col items-center gap-4"
    >
      {/* Success indicator */}
      <div className="flex items-center gap-2 text-accent">
        <CheckCircle className="w-5 h-5" strokeWidth={2} />
        <span className="font-mono text-xs uppercase tracking-widest">Done!</span>
      </div>

      {/* Download button */}
      <button
        id="download-button"
        onClick={onClick}
        className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-[0.15em] text-black transition-all duration-200 shadow-lg hover:shadow-xl"
        style={{
          backgroundColor: toolColor,
          boxShadow: `0 8px 24px ${toolColor}30`,
        }}
      >
        <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
        {label}
      </button>

      {/* File size info */}
      {fileInfo && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
          {fileInfo}
        </span>
      )}
    </motion.div>
  );
}
