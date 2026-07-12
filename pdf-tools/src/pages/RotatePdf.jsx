import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import FileDropzone from "@/components/tools/FileDropzone";
import ProgressBar from "@/components/tools/ProgressBar";
import DownloadButton from "@/components/tools/DownloadButton";
import { rotatePdf, getPageCount } from "@/lib/pdf-engine";
import { readFileAsArrayBuffer, downloadFile, formatFileSize } from "@/lib/file-utils";

const TOOL_COLOR = "#f59e0b";

const ROTATION_OPTIONS = [
  { angle: 90, label: "90° Right", icon: "↻" },
  { angle: 180, label: "180°", icon: "↕" },
  { angle: 270, label: "90° Left", icon: "↺" },
];

/**
 * RotatePdf — Rotate all or specific pages of a PDF.
 */
export default function RotatePdf() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [angle, setAngle] = useState(90);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Rotate PDF — Rotate PDF Pages Online | Blank Five Tools";
  }, []);

  const handleFiles = async (newFiles) => {
    const pdfFile = newFiles[0];
    setFile(pdfFile);
    setStatus("idle");
    setResult(null);
    setError("");

    try {
      const buffer = await readFileAsArrayBuffer(pdfFile);
      const count = await getPageCount(buffer);
      setPageCount(count);
    } catch {
      setError("Could not read this PDF.");
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setStatus("processing");
    setProgress(10);
    setError("");

    try {
      const buffer = await readFileAsArrayBuffer(file);
      setProgress(30);
      const rotated = await rotatePdf(buffer, angle);
      setProgress(100);
      setResult(rotated);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Failed to rotate PDF.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (result) {
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(result, `${baseName}_rotated.pdf`);
    }
  };

  return (
    <div id="rotate-pdf-page">
      <ToolHero
        title="Rotate PDF"
        description="Rotate all pages of your PDF by 90°, 180°, or 270°."
        icon={RotateCcw}
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
            <div className="bg-surface border border-white/[0.06] rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{file.name}</p>
                <p className="text-neutral-500 text-xs font-mono mt-1">{pageCount} pages · {formatFileSize(file.size)}</p>
              </div>
              <button onClick={() => { setFile(null); setPageCount(0); }} className="text-neutral-500 hover:text-white text-xs font-mono uppercase tracking-wider">
                Change
              </button>
            </div>

            {/* Rotation Angle */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                Rotation
              </span>
              <div className="grid grid-cols-3 gap-3">
                {ROTATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.angle}
                    onClick={() => setAngle(opt.angle)}
                    className={`p-5 rounded-xl border text-center transition-all ${
                      angle === opt.angle
                        ? "border-tool-rotate bg-tool-rotate/10 text-white"
                        : "border-white/[0.06] text-neutral-400 hover:border-white/10"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{opt.icon}</span>
                    <p className="text-sm font-medium">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Rotate Button */}
            {status === "idle" && (
              <div className="flex justify-center">
                <button
                  id="rotate-button"
                  onClick={handleRotate}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-[0.15em] text-black transition-all duration-200 shadow-lg"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  <RotateCcw className="w-5 h-5" strokeWidth={2} />
                  Rotate PDF
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progress */}
        {status === "processing" && (
          <ProgressBar progress={progress} label="Rotating pages..." toolColor={TOOL_COLOR} />
        )}

        {/* Download */}
        {status === "done" && result && (
          <DownloadButton
            onClick={handleDownload}
            label="Download Rotated PDF"
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
              onClick={() => { setFile(null); setStatus("idle"); setResult(null); setPageCount(0); }}
              className="text-neutral-400 hover:text-white text-sm font-mono uppercase tracking-wider transition-colors"
            >
              ← Rotate another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
