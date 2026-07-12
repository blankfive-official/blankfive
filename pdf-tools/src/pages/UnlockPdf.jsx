import { useState, useEffect } from "react";
import { Unlock, Eye, EyeOff } from "lucide-react";
import ToolHero from "@/components/tools/ToolHero";
import FileDropzone from "@/components/tools/FileDropzone";
import ProgressBar from "@/components/tools/ProgressBar";
import DownloadButton from "@/components/tools/DownloadButton";
import { unlockPdf } from "@/lib/unlocker";
import { readFileAsArrayBuffer, downloadFile, formatFileSize } from "@/lib/file-utils";

const TOOL_COLOR = "#ef4444";

/**
 * UnlockPdf — Remove password protection from a PDF.
 */
export default function UnlockPdf() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Unlock PDF — Remove PDF Password | Blank Five Tools";
  }, []);

  const handleFiles = (newFiles) => {
    setFile(newFiles[0]);
    setStatus("idle");
    setResult(null);
    setError("");
    setPassword("");
  };

  const handleUnlock = async () => {
    if (!file) return;
    setStatus("processing");
    setProgress(30);
    setError("");

    try {
      const buffer = await readFileAsArrayBuffer(file);
      setProgress(60);

      const outcome = await unlockPdf(buffer, password);
      setProgress(100);

      if (outcome.success) {
        setResult(outcome.data);
        setStatus("done");
      } else {
        setError(outcome.error);
        setStatus("idle");
      }
    } catch (err) {
      setError(err.message || "Failed to process PDF.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (result) {
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(result, `${baseName}_unlocked.pdf`);
    }
  };

  return (
    <div id="unlock-pdf-page">
      <ToolHero
        title="Unlock PDF"
        description="Remove password protection from your PDF file. You must know the password."
        icon={Unlock}
        color={TOOL_COLOR}
      />

      <div className="max-w-3xl mx-auto px-5 md:px-8 pb-20">
        {/* Upload */}
        {status !== "done" && !file && (
          <FileDropzone onFiles={handleFiles} accept=".pdf" toolColor={TOOL_COLOR} />
        )}

        {/* Password Input */}
        {file && status !== "done" && (
          <div className="mt-6 space-y-6">
            {/* File info */}
            <div className="bg-surface border border-white/[0.06] rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{file.name}</p>
                <p className="text-neutral-500 text-xs font-mono mt-1">{formatFileSize(file.size)}</p>
              </div>
              <button onClick={() => setFile(null)} className="text-neutral-500 hover:text-white text-xs font-mono uppercase tracking-wider">
                Change
              </button>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label
                htmlFor="pdf-password"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 block"
              >
                PDF Password
              </label>
              <div className="relative">
                <input
                  id="pdf-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the PDF password"
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  className="w-full bg-surface border border-white/[0.06] rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-tool-unlock transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Unlock Button */}
            {status === "idle" && (
              <div className="flex justify-center">
                <button
                  id="unlock-button"
                  onClick={handleUnlock}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-[0.15em] text-black transition-all duration-200 shadow-lg"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  <Unlock className="w-5 h-5" strokeWidth={2} />
                  Unlock PDF
                </button>
              </div>
            )}

            {/* Note */}
            <p className="text-center text-neutral-600 text-xs font-mono">
              Note: You must know the password to unlock the PDF. This tool cannot bypass encryption.
            </p>
          </div>
        )}

        {/* Progress */}
        {status === "processing" && (
          <ProgressBar progress={progress} label="Unlocking PDF..." toolColor={TOOL_COLOR} />
        )}

        {/* Download */}
        {status === "done" && result && (
          <DownloadButton
            onClick={handleDownload}
            label="Download Unlocked PDF"
            toolColor={TOOL_COLOR}
            fileInfo={formatFileSize(result.byteLength)}
          />
        )}

        {/* Reset */}
        {status === "done" && (
          <div className="mt-6 text-center">
            <button
              onClick={() => { setFile(null); setStatus("idle"); setResult(null); setPassword(""); }}
              className="text-neutral-400 hover:text-white text-sm font-mono uppercase tracking-wider transition-colors"
            >
              ← Unlock another PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
