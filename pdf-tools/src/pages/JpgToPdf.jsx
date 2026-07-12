import { useState, useEffect, useCallback } from "react";
import { ImagePlus } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import FileDropzone from "@/components/tools/FileDropzone";
import FileList from "@/components/tools/FileList";
import ProgressBar from "@/components/tools/ProgressBar";
import DownloadButton from "@/components/tools/DownloadButton";
import { imagesToPdf } from "@/lib/image-to-pdf";
import { downloadFile, formatFileSize } from "@/lib/file-utils";

const TOOL_COLOR = "#8b5cf6";

/**
 * JpgToPdf — Convert JPG/PNG images into a single PDF.
 */
export default function JpgToPdf() {
  const [files, setFiles] = useState([]);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "JPG to PDF — Convert Images to PDF | Blank Five Tools";
  }, []);

  const handleFiles = useCallback((newFiles) => {
    const imageFiles = newFiles.filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...imageFiles]);
    setStatus("idle");
    setResult(null);
  }, []);

  const handleRemove = useCallback((index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleReorder = useCallback((from, to) => {
    setFiles((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  }, []);

  const handleConvert = async () => {
    if (!files.length) return;
    setStatus("processing");
    setProgress(0);
    setError("");

    try {
      const pdfBytes = await imagesToPdf(files, {
        pageSize,
        orientation,
        fitToPage: true,
        onProgress: setProgress,
      });
      setResult(pdfBytes);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Failed to create PDF.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (result) downloadFile(result, "images_to_pdf.pdf");
  };

  return (
    <div id="jpg-to-pdf-page">
      <ToolHero
        title="JPG to PDF"
        description="Turn your JPG or PNG images into a single, beautifully formatted PDF document."
        icon={ImagePlus}
        color={TOOL_COLOR}
      />

      <div className="max-w-3xl mx-auto px-5 md:px-8 pb-20">
        {/* Upload */}
        {status !== "done" && (
          <FileDropzone
            onFiles={handleFiles}
            accept="image/jpeg,image/png,image/jpg,.jpg,.jpeg,.png"
            multiple
            toolColor={TOOL_COLOR}
            label="Drop images here"
          />
        )}

        {/* File List + Options */}
        {files.length > 0 && status !== "done" && (
          <div className="mt-6 space-y-6">
            <FileList
              files={files}
              onRemove={handleRemove}
              onReorder={handleReorder}
              toolColor={TOOL_COLOR}
            />

            {/* Page Size */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                Page Size
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "a4", label: "A4", sub: "210 × 297 mm" },
                  { key: "letter", label: "Letter", sub: "8.5 × 11 in" },
                  { key: "original", label: "Original", sub: "Image size" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setPageSize(opt.key)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      pageSize === opt.key
                        ? "border-tool-convert bg-tool-convert/10 text-white"
                        : "border-white/[0.06] text-neutral-400 hover:border-white/10"
                    }`}
                  >
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-neutral-500">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation (only for non-original page sizes) */}
            {pageSize !== "original" && (
              <div className="space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                  Orientation
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {["portrait", "landscape"].map((o) => (
                    <button
                      key={o}
                      onClick={() => setOrientation(o)}
                      className={`p-3 rounded-xl border text-center transition-all capitalize ${
                        orientation === o
                          ? "border-tool-convert bg-tool-convert/10 text-white"
                          : "border-white/[0.06] text-neutral-400 hover:border-white/10"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Convert Button */}
            {status === "idle" && (
              <div className="flex justify-center">
                <button
                  id="convert-jpg-button"
                  onClick={handleConvert}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-[0.15em] text-black transition-all duration-200 shadow-lg"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  <ImagePlus className="w-5 h-5" strokeWidth={2} />
                  Create PDF
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progress */}
        {status === "processing" && (
          <ProgressBar progress={progress} label="Creating PDF from images..." toolColor={TOOL_COLOR} />
        )}

        {/* Download */}
        {status === "done" && result && (
          <DownloadButton
            onClick={handleDownload}
            label="Download PDF"
            toolColor={TOOL_COLOR}
            fileInfo={formatFileSize(result.byteLength)}
          />
        )}

        {/* Error */}
        {status === "error" && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Reset */}
        {status === "done" && (
          <div className="mt-6 text-center">
            <button
              onClick={() => { setFiles([]); setStatus("idle"); setResult(null); }}
              className="text-neutral-400 hover:text-white text-sm font-mono uppercase tracking-wider transition-colors"
            >
              ← Convert more images
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
