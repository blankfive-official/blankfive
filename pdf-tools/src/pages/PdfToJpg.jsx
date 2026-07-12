import { useState, useEffect } from "react";
import { Image } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import FileDropzone from "@/components/tools/FileDropzone";
import ProgressBar from "@/components/tools/ProgressBar";
import DownloadButton from "@/components/tools/DownloadButton";
import { renderPdfToImages, dataUrlToBlob } from "@/lib/pdf-renderer";
import { readFileAsArrayBuffer, downloadFile, downloadAsZip } from "@/lib/file-utils";

const TOOL_COLOR = "#8b5cf6";

const QUALITY_OPTIONS = [
  { label: "Standard (72 DPI)", scale: 1, quality: 0.85 },
  { label: "Good (150 DPI)", scale: 2.08, quality: 0.9 },
  { label: "High (300 DPI)", scale: 4.17, quality: 0.95 },
];

/**
 * PdfToJpg — Convert PDF pages to JPG images.
 */
export default function PdfToJpg() {
  const [file, setFile] = useState(null);
  const [qualityIdx, setQualityIdx] = useState(1);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "PDF to JPG — Convert PDF to Images | Blank Five Tools";
  }, []);

  const handleFiles = (newFiles) => {
    setFile(newFiles[0]);
    setStatus("idle");
    setImages([]);
    setError("");
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus("processing");
    setProgress(0);
    setError("");

    try {
      const buffer = await readFileAsArrayBuffer(file);
      const opt = QUALITY_OPTIONS[qualityIdx];
      const results = await renderPdfToImages(buffer, {
        scale: opt.scale,
        quality: opt.quality,
        onProgress: setProgress,
      });
      setImages(results);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Failed to convert PDF.");
      setStatus("error");
    }
  };

  const handleDownloadAll = () => {
    if (!images.length) return;
    const baseName = file.name.replace(/\.pdf$/i, "");

    if (images.length === 1) {
      const blob = dataUrlToBlob(images[0].dataUrl);
      downloadFile(blob, `${baseName}_page_1.jpg`, "image/jpeg");
    } else {
      const entries = images.map((img, i) => ({
        name: `${baseName}_page_${i + 1}.jpg`,
        data: dataUrlToBlob(img.dataUrl),
      }));
      downloadAsZip(entries, `${baseName}_images.zip`);
    }
  };

  const handleDownloadSingle = (img, index) => {
    const baseName = file.name.replace(/\.pdf$/i, "");
    const blob = dataUrlToBlob(img.dataUrl);
    downloadFile(blob, `${baseName}_page_${index + 1}.jpg`, "image/jpeg");
  };

  return (
    <div id="pdf-to-jpg-page">
      <ToolHero
        title="PDF to JPG"
        description="Convert each page of your PDF into high-quality JPG images."
        icon={Image}
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
                <p className="text-neutral-500 text-xs font-mono mt-1">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
              </div>
              <button onClick={() => setFile(null)} className="text-neutral-500 hover:text-white text-xs font-mono uppercase tracking-wider">
                Change
              </button>
            </div>

            {/* Quality Selection */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">Image Quality</span>
              <div className="grid grid-cols-3 gap-3">
                {QUALITY_OPTIONS.map((opt, idx) => (
                  <button
                    key={opt.label}
                    onClick={() => setQualityIdx(idx)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      qualityIdx === idx
                        ? "border-tool-convert bg-tool-convert/10 text-white"
                        : "border-white/[0.06] text-neutral-400 hover:border-white/10"
                    }`}
                  >
                    <p className="text-sm font-medium">{opt.label.split(" (")[0]}</p>
                    <p className="text-xs text-neutral-500 mt-1">{opt.label.match(/\((.+)\)/)?.[1]}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Convert Button */}
            {status === "idle" && (
              <div className="flex justify-center">
                <button
                  id="convert-button"
                  onClick={handleConvert}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-[0.15em] text-black transition-all duration-200 shadow-lg"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  <Image className="w-5 h-5" strokeWidth={2} />
                  Convert to JPG
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progress */}
        {status === "processing" && (
          <ProgressBar progress={progress} label="Converting pages to JPG..." toolColor={TOOL_COLOR} />
        )}

        {/* Results — Image Preview Grid */}
        {status === "done" && images.length > 0 && (
          <>
            <DownloadButton
              onClick={handleDownloadAll}
              label={images.length === 1 ? "Download JPG" : `Download All ${images.length} Images (ZIP)`}
              toolColor={TOOL_COLOR}
            />

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => handleDownloadSingle(img, i)}
                  className="group relative rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/20 transition-all"
                >
                  <img
                    src={img.dataUrl}
                    alt={`Page ${i + 1}`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-mono uppercase tracking-wider">
                      Page {i + 1} — Download
                    </span>
                  </div>
                </button>
              ))}
            </div>
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
              onClick={() => { setFile(null); setStatus("idle"); setImages([]); }}
              className="text-neutral-400 hover:text-white text-sm font-mono uppercase tracking-wider transition-colors"
            >
              ← Convert another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
