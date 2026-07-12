import { useState, useEffect } from "react";
import { Split } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import FileDropzone from "@/components/tools/FileDropzone";
import ProgressBar from "@/components/tools/ProgressBar";
import DownloadButton from "@/components/tools/DownloadButton";
import { splitPdf, splitPdfByPages, getPageCount, parsePageRanges } from "@/lib/pdf-engine";
import { readFileAsArrayBuffer, downloadFile, downloadAsZip, formatFileSize } from "@/lib/file-utils";

const TOOL_COLOR = "#3b82f6";

/**
 * SplitPdf — Split a PDF by page ranges or into individual pages.
 */
export default function SplitPdf() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState("all"); // "all" = split every page, "ranges" = custom ranges
  const [rangeInput, setRangeInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Split PDF — Extract Pages from PDF | Blank Five Tools";
  }, []);

  const handleFiles = async (newFiles) => {
    const pdfFile = newFiles[0];
    setFile(pdfFile);
    setStatus("idle");
    setResults(null);
    setError("");

    try {
      const buffer = await readFileAsArrayBuffer(pdfFile);
      const count = await getPageCount(buffer);
      setPageCount(count);
      setRangeInput(`1-${count}`);
    } catch {
      setError("Could not read this PDF. It may be corrupted or encrypted.");
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    setStatus("processing");
    setProgress(0);
    setError("");

    try {
      const buffer = await readFileAsArrayBuffer(file);
      let pdfs;

      if (mode === "all") {
        pdfs = await splitPdfByPages(buffer, setProgress);
      } else {
        const ranges = parsePageRanges(rangeInput, pageCount);
        if (!ranges.length) {
          setError("Invalid page range. Use format like: 1-3, 5, 7-10");
          setStatus("idle");
          return;
        }
        pdfs = await splitPdf(buffer, ranges, setProgress);
      }

      setResults(pdfs);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Failed to split PDF.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (!results) return;

    if (results.length === 1) {
      downloadFile(results[0], "split_page.pdf");
    } else {
      const entries = results.map((data, i) => ({
        name: `page_${i + 1}.pdf`,
        data,
      }));
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadAsZip(entries, `${baseName}_split.zip`);
    }
  };

  const totalSize = results ? results.reduce((sum, r) => sum + r.byteLength, 0) : 0;

  return (
    <div id="split-pdf-page">
      <ToolHero
        title="Split PDF"
        description="Separate a PDF into individual pages or extract specific page ranges."
        icon={Split}
        color={TOOL_COLOR}
      />

      <div className="max-w-3xl mx-auto px-5 md:px-8 pb-20">
        {/* Upload */}
        {status !== "done" && !file && (
          <FileDropzone onFiles={handleFiles} accept=".pdf" toolColor={TOOL_COLOR} />
        )}

        {/* Options */}
        {file && status !== "done" && (
          <div className="mt-6 space-y-6">
            {/* File info */}
            <div className="bg-surface border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{file.name}</p>
                  <p className="text-neutral-500 text-xs font-mono mt-1">
                    {pageCount} pages · {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  onClick={() => { setFile(null); setPageCount(0); }}
                  className="text-neutral-500 hover:text-white text-xs font-mono uppercase tracking-wider"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Split Mode */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                Split Mode
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode("all")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    mode === "all"
                      ? "border-tool-split bg-tool-split/10 text-white"
                      : "border-white/[0.06] text-neutral-400 hover:border-white/10"
                  }`}
                >
                  <p className="text-sm font-medium">Split All Pages</p>
                  <p className="text-xs text-neutral-500 mt-1">One PDF per page</p>
                </button>
                <button
                  onClick={() => setMode("ranges")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    mode === "ranges"
                      ? "border-tool-split bg-tool-split/10 text-white"
                      : "border-white/[0.06] text-neutral-400 hover:border-white/10"
                  }`}
                >
                  <p className="text-sm font-medium">Custom Ranges</p>
                  <p className="text-xs text-neutral-500 mt-1">Extract specific pages</p>
                </button>
              </div>

              {mode === "ranges" && (
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder="e.g. 1-3, 5, 7-10"
                  className="w-full mt-3 bg-surface border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-tool-split transition-colors"
                />
              )}
            </div>

            {/* Split Button */}
            {status === "idle" && (
              <div className="flex justify-center">
                <button
                  id="split-button"
                  onClick={handleSplit}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-[0.15em] text-black transition-all duration-200 shadow-lg"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  <Split className="w-5 h-5" strokeWidth={2} />
                  Split PDF
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progress */}
        {status === "processing" && (
          <ProgressBar progress={progress} label="Splitting PDF..." toolColor={TOOL_COLOR} />
        )}

        {/* Download */}
        {status === "done" && results && (
          <DownloadButton
            onClick={handleDownload}
            label={results.length === 1 ? "Download PDF" : `Download ${results.length} PDFs (ZIP)`}
            toolColor={TOOL_COLOR}
            fileInfo={formatFileSize(totalSize)}
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
              onClick={() => { setFile(null); setStatus("idle"); setResults(null); setPageCount(0); }}
              className="text-neutral-400 hover:text-white text-sm font-mono uppercase tracking-wider transition-colors"
            >
              ← Split another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
