import { useCallback, useState, useRef } from "react";
import { Upload, FileText, Image as ImageIcon } from "lucide-react";

/**
 * FileDropzone — Drag-and-drop file upload area.
 * Supports PDF and image file types, single or multiple files.
 *
 * @param {Object} props
 * @param {function} props.onFiles - Callback receiving array of File objects
 * @param {string} props.accept - File accept string (e.g. ".pdf" or "image/*")
 * @param {boolean} props.multiple - Allow multiple files
 * @param {string} props.toolColor - Accent color for the dropzone
 * @param {string} props.label - Custom label text
 */
export default function FileDropzone({
  onFiles,
  accept = ".pdf",
  multiple = false,
  toolColor = "#ff4d00",
  label,
}) {
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef(null);

  const isPdf = accept.includes(".pdf");

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragover(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length) onFiles(multiple ? files : [files[0]]);
    },
    [onFiles, multiple]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragover(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragover(false);
  }, []);

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) onFiles(files);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  return (
    <div
      id="file-dropzone"
      role="button"
      tabIndex={0}
      className={`dropzone rounded-2xl p-10 md:p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
        dragover ? "dragover" : ""
      }`}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
        aria-label="File upload"
      />

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300"
        style={{ backgroundColor: `${toolColor}12` }}
      >
        {isPdf ? (
          <FileText className="w-10 h-10" style={{ color: toolColor }} strokeWidth={1.5} />
        ) : (
          <ImageIcon className="w-10 h-10" style={{ color: toolColor }} strokeWidth={1.5} />
        )}
      </div>

      {/* Upload icon & text */}
      <div className="flex items-center gap-2 mb-3">
        <Upload className="w-5 h-5 text-neutral-400" strokeWidth={1.75} />
        <span className="font-display text-lg text-white">
          {label || (multiple ? "Drop files here" : "Drop a file here")}
        </span>
      </div>

      <p className="text-sm text-neutral-500 mb-5">
        or <span className="text-brand underline underline-offset-2">browse your computer</span>
      </p>

      {/* Accepted formats */}
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-600">
        <span className="px-2 py-1 bg-white/5 rounded">
          {isPdf ? "PDF" : "JPG / PNG"} files
        </span>
        {multiple && (
          <span className="px-2 py-1 bg-white/5 rounded">Multiple allowed</span>
        )}
      </div>
    </div>
  );
}
