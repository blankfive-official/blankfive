/**
 * compressor.js — PDF compression via client-side canvas re-rendering.
 *
 * Strategy: Render each page to canvas at lower quality, then reconstruct
 * the PDF with compressed JPEG images. This reduces file size significantly
 * for image-heavy PDFs.
 */
import { PDFDocument } from "pdf-lib";

/**
 * Compression presets mapping quality level to JPEG quality.
 */
const PRESETS = {
  low: { quality: 0.9, scale: 1.5, label: "Low Compression" },
  medium: { quality: 0.65, scale: 1.2, label: "Medium Compression" },
  high: { quality: 0.4, scale: 1.0, label: "High Compression" },
};

/**
 * Compress a PDF by re-rendering pages as JPEG images.
 *
 * @param {ArrayBuffer} pdfBuffer - Source PDF ArrayBuffer
 * @param {string} level - Compression level: "low", "medium", or "high"
 * @param {function} onProgress - Progress callback (0–100)
 * @returns {Promise<Uint8Array>} Compressed PDF bytes
 */
export async function compressPdf(pdfBuffer, level = "medium", onProgress) {
  const preset = PRESETS[level] || PRESETS.medium;

  // Dynamically import PDF.js only when compressing
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const pdf = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
  const numPages = pdf.numPages;

  const newPdf = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: preset.scale });

    // Render page to canvas
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;

    // Convert canvas to JPEG blob
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", preset.quality)
    );
    const imgBytes = new Uint8Array(await blob.arrayBuffer());

    // Embed the JPEG image into the new PDF
    const jpgImage = await newPdf.embedJpg(imgBytes);
    const newPage = newPdf.addPage([viewport.width, viewport.height]);
    newPage.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height,
    });

    // Clean up canvas memory
    canvas.width = 0;
    canvas.height = 0;

    onProgress?.(Math.round((i / numPages) * 100));
  }

  pdf.destroy();
  return newPdf.save();
}

/**
 * Get compression presets for the UI.
 * @returns {{ key: string, quality: number, scale: number, label: string }[]}
 */
export function getCompressionPresets() {
  return Object.entries(PRESETS).map(([key, value]) => ({ key, ...value }));
}
