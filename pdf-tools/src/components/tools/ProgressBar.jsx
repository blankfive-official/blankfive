/**
 * ProgressBar — Animated progress indicator for PDF processing.
 *
 * @param {Object} props
 * @param {number} props.progress - 0–100 percentage
 * @param {string} props.label - Status label text
 * @param {string} props.toolColor - Accent color for the bar
 */
export default function ProgressBar({ progress = 0, label = "Processing...", toolColor }) {
  return (
    <div id="progress-bar" className="w-full mt-6">
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-neutral-300">{label}</span>
        <span className="font-mono text-xs text-neutral-500">{Math.round(progress)}%</span>
      </div>

      {/* Bar track */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            background: toolColor
              ? `linear-gradient(90deg, ${toolColor}, ${toolColor}cc)`
              : undefined,
          }}
        />
      </div>
    </div>
  );
}
