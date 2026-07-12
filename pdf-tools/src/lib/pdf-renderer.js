/**
 * pdf-renderer.js — Renders PDF pages to canvas/images using PDF.js.
 * Used for PDF → JPG conversion and thumbnail previews.
 *
 * PDF.js is lazy-loaded only when this module is actually imported,
 * keeping the initial bundle small.
 */

let pdfjsLib = null;

/**
 * Lazily initialize PDF.js library.
 */
async function initPdfJs() {
  if (pdfjsLib) return pdfjsLib;

  pdfjsLib = await import("pdfjs-dist");

  // Set worker source to CDN to avoid bundling the worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  return pdfjsLib;
}

/**
 * Render all pages of a PDF to JPG data URLs.
 *
 * @param {ArrayBuffer} pdfBuffer - PDF file ArrayBuffer
 * @param {Object} options
 * @param {number} options.scale - Render scale (1 = 72dpi, 2 = 144dpi, ~4.17 = 300dpi)
 * @param {number} options.quality - JPEG quality (0.0 – 1.0)
 * @param {function} options.onProgress - Progress callback (0–100)
 * @returns {Promise<{ dataUrl: string, width: number, height: number }[]>}
 */
export async function renderPdfToImages(pdfBuffer, options = {}) {
  const { scale = 2, quality = 0.92, onProgress } = options;

  const pdfjs = await initPdfJs();
  const pdf = await pdfjs.getDocument({ data: pdfBuffer }).promise;
  const numPages = pdf.numPages;
  const results = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    // Create offscreen canvas
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");

    await page.render({ canvasContext: ctx, viewport }).promise;

    results.push({
      dataUrl: canvas.toDataURL("image/jpeg", quality),
      width: viewport.width,
      height: viewport.height,
      pageNumber: i,
    });

    onProgress?.(Math.round((i / numPages) * 100));

    // Clean up
    canvas.width = 0;
    canvas.height = 0;
  }

  pdf.destroy();
  return results;
}

/**
 * Convert a data URL to a Blob.
 * @param {string} dataUrl
 * @returns {Blob}
 */
export function dataUrlToBlob(dataUrl) {
  const [header, data] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

/**
 * Get the number of pages in a PDF.
 * @param {ArrayBuffer} pdfBuffer
 * @returns {Promise<number>}
 */
export async function getPdfPageCount(pdfBuffer) {
  const pdfjs = await initPdfJs();
  const pdf = await pdfjs.getDocument({ data: pdfBuffer }).promise;
  const count = pdf.numPages;
  pdf.destroy();
  return count;
}
