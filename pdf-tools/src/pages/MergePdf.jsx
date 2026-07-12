import { useState, useEffect, useCallback } from "react";
import { Merge } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import FileDropzone from "@/components/tools/FileDropzone";
import FileList from "@/components/tools/FileList";
import ProgressBar from "@/components/tools/ProgressBar";
import DownloadButton from "@/components/tools/DownloadButton";
import { mergePdfs } from "@/lib/pdf-engine";
import { readFileAsArrayBuffer, downloadFile, formatFileSize } from "@/lib/file-utils";

const TOOL_COLOR = "#ff6b35";

/**
 * MergePdf — Merge multiple PDF files into one.
 * Supports drag-to-reorder before merging.
 */
export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | processing | done | error
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Merge PDF — Combine PDF Files Online | Blank Five Tools";
  }, []);

  const handleFiles = useCallback((newFiles) => {
    const pdfFiles = newFiles.filter((f) => f.type === "application/pdf" || f.name.endsWith(".pdf"));
    setFiles((prev) => [...prev, ...pdfFiles]);
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

  const handleMerge = async () => {
    if (files.length < 2) return;
    setStatus("processing");
    setProgress(0);
    setError("");

    try {
      const buffers = await Promise.all(files.map(readFileAsArrayBuffer));
      const merged = await mergePdfs(buffers, setProgress);
      setResult(merged);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Failed to merge PDFs.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (result) downloadFile(result, "merged.pdf");
  };

  return (
    <div id="merge-pdf-page">
      <ToolHero
        title="Merge PDF"
        description="Combine multiple PDF files into a single document. Drag to reorder before merging."
        icon={Merge}
        color={TOOL_COLOR}
      />

      <div className="max-w-3xl mx-auto px-5 md:px-8 pb-20">
        {/* Upload Area */}
        {status !== "done" && (
          <FileDropzone
            onFiles={handleFiles}
            accept=".pdf"
            multiple
            toolColor={TOOL_COLOR}
            label="Drop PDF files here"
          />
        )}

        {/* File List */}
        {files.length > 0 && status !== "done" && (
          <>
            <FileList
              files={files}
              onRemove={handleRemove}
              onReorder={handleReorder}
              toolColor={TOOL_COLOR}
            />

            {/* Merge Button */}
            {status === "idle" && files.length >= 2 && (
              <div className="mt-6 flex justify-center">
                <button
                  id="merge-button"
                  onClick={handleMerge}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-[0.15em] text-black transition-all duration-200 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  <Merge className="w-5 h-5" strokeWidth={2} />
                  Merge {files.length} PDFs
                </button>
              </div>
            )}

            {files.length === 1 && (
              <p className="text-center text-neutral-500 text-sm mt-4 font-mono">
                Add at least 2 PDFs to merge.
              </p>
            )}
          </>
        )}

        {/* Progress */}
        {status === "processing" && (
          <ProgressBar progress={progress} label="Merging PDFs..." toolColor={TOOL_COLOR} />
        )}

        {/* Download */}
        {status === "done" && result && (
          <DownloadButton
            onClick={handleDownload}
            label="Download Merged PDF"
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

        {/* Reset after done */}
        {status === "done" && (
          <div className="mt-6 text-center">
            <button
              onClick={() => { setFiles([]); setStatus("idle"); setResult(null); }}
              className="text-neutral-400 hover:text-white text-sm font-mono uppercase tracking-wider transition-colors"
            >
              ← Merge more PDFs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
