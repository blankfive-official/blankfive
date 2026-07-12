import { FileText, X, GripVertical } from "lucide-react";

/**
 * FileList — Displays uploaded files with remove and reorder capabilities.
 *
 * @param {Object} props
 * @param {File[]} props.files - Array of File objects
 * @param {function} props.onRemove - Callback(index) to remove a file
 * @param {function} props.onReorder - Callback(fromIndex, toIndex) to reorder
 * @param {string} props.toolColor - Accent color
 */
export default function FileList({ files, onRemove, onReorder, toolColor = "#ff4d00" }) {
  if (!files.length) return null;

  /**
   * Simple drag-to-reorder using native HTML drag events.
   */
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (fromIndex !== toIndex && onReorder) {
      onReorder(fromIndex, toIndex);
    }
  };

  /**
   * Format file size to human-readable string.
   */
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="mt-6 space-y-2" id="file-list">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          {files.length} file{files.length > 1 ? "s" : ""} selected
        </span>
      </div>

      {/* File Items */}
      {files.map((file, i) => (
        <div
          key={`${file.name}-${i}`}
          draggable={!!onReorder}
          onDragStart={(e) => handleDragStart(e, i)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, i)}
          className="flex items-center gap-3 bg-surface border border-white/[0.06] rounded-xl px-4 py-3 group hover:border-white/10 transition-colors"
        >
          {/* Drag Handle (only if reorder is enabled) */}
          {onReorder && (
            <GripVertical className="w-4 h-4 text-neutral-600 cursor-grab active:cursor-grabbing flex-shrink-0" />
          )}

          {/* File Icon */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${toolColor}12` }}
          >
            <FileText className="w-4 h-4" style={{ color: toolColor }} strokeWidth={1.75} />
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{file.name}</p>
            <p className="text-xs text-neutral-500 font-mono">{formatSize(file.size)}</p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(i)}
            aria-label={`Remove ${file.name}`}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-400/10 transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
