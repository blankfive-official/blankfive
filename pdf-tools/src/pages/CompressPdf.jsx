import { useState, useEffect } from "react";
import { FileDown } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import FileDropzone from "@/components/tools/FileDropzone";
import ProgressBar from "@/components/tools/ProgressBar";
import DownloadButton from "@/components/tools/DownloadButton";
import { compressPdf, getCompressionPresets } from "@/lib/compressor";
import { readFileAsArrayBuffer, downloadFile, formatFileSize } from "@/lib/file-utils";

const TOOL_COLOR = "#10b981";
const presets = getCompressionPresets();

/**
 * CompressPdf — Reduce PDF file size with selectable compression levels.
 */
export default function CompressPdf() {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState("medium");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Compress PDF — Reduce PDF File Size | Blank Five Tools";
  }, []);

  const handleFiles = (newFiles) => {
    const pdfFile = newFiles[0];
    setFile(pdfFile);
    setOriginalSize(pdfFile.size);
    setStatus("idle");
    setResult(null);
    setError("");
  };

  const handleCompress = async () => {
    if (!file) return;
    setStatus("processing");
    setProgress(0);
    setError("");

    try {
      const buffer = await readFileAsArrayBuffer(file);
      const compressed = await compressPdf(buffer, level, setProgress);
      setResult(compressed);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Failed to compress PDF.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (result) {
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(result, `${baseName}_compressed.pdf`);
    }
  };

  const compressedSize = result ? result.byteLength : 0;
  const savingsPercent = originalSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0;

  return (
    <div id="compress-pdf-page">
      <ToolHero
        title="Compress PDF"
        description="Reduce your PDF file size while maintaining the best possible quality."
        icon={FileDown}
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
                  <p className="text-neutral-500 text-xs font-mono mt-1">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={() => { setFile(null); }}
                  className="text-neutral-500 hover:text-white text-xs font-mono uppercase tracking-wider"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Compression Level */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                Compression Level
              </span>
              <div className="grid grid-cols-3 gap-3">
                {presets.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setLevel(p.key)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      level === p.key
                        ? "border-tool-compress bg-tool-compress/10 text-white"
                        : "border-white/[0.06] text-neutral-400 hover:border-white/10"
                    }`}
                  >
                    <p className="text-sm font-medium capitalize">{p.key}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {p.key === "low" ? "Best quality" : p.key === "medium" ? "Balanced" : "Smallest size"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Compress Button */}
            {status === "idle" && (
              <div className="flex justify-center">
                <button
                  id="compress-button"
                  onClick={handleCompress}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-[0.15em] text-black transition-all duration-200 shadow-lg"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  <FileDown className="w-5 h-5" strokeWidth={2} />
                  Compress PDF
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progress */}
        {status === "processing" && (
          <ProgressBar progress={progress} label="Compressing PDF..." toolColor={TOOL_COLOR} />
        )}

        {/* Results */}
        {status === "done" && result && (
          <>
            {/* Size Comparison */}
            <div className="mt-8 bg-surface border border-white/[0.06] rounded-2xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Original</p>
                  <p className="text-lg font-display text-white">{formatFileSize(originalSize)}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Compressed</p>
                  <p className="text-lg font-display text-tool-compress">{formatFileSize(compressedSize)}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Saved</p>
                  <p className={`text-lg font-display ${savingsPercent > 0 ? "text-accent" : "text-neutral-400"}`}>
                    {savingsPercent > 0 ? `${savingsPercent}%` : "~0%"}
                  </p>
                </div>
              </div>
            </div>

            <DownloadButton
              onClick={handleDownload}
              label="Download Compressed PDF"
              toolColor={TOOL_COLOR}
              fileInfo={formatFileSize(compressedSize)}
            />
          </>
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
              onClick={() => { setFile(null); setStatus("idle"); setResult(null); }}
              className="text-neutral-400 hover:text-white text-sm font-mono uppercase tracking-wider transition-colors"
            >
              ← Compress another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
