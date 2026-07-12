/**
 * pdf-engine.js — Core PDF operations using pdf-lib.
 * Handles merge, split, and rotate operations entirely client-side.
 */
import { PDFDocument, degrees } from "pdf-lib";

/**
 * Merge multiple PDF files into one.
 * @param {ArrayBuffer[]} pdfBuffers - Array of PDF file ArrayBuffers
 * @param {function} onProgress - Progress callback (0–100)
 * @returns {Promise<Uint8Array>} Merged PDF bytes
 */
export async function mergePdfs(pdfBuffers, onProgress) {
  const mergedPdf = await PDFDocument.create();
  const total = pdfBuffers.length;

  for (let i = 0; i < total; i++) {
    const donorPdf = await PDFDocument.load(pdfBuffers[i]);
    const pages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));

    onProgress?.(Math.round(((i + 1) / total) * 100));
  }

  return mergedPdf.save();
}

/**
 * Split a PDF by extracting specific page ranges.
 * @param {ArrayBuffer} pdfBuffer - Source PDF ArrayBuffer
 * @param {number[][]} ranges - Array of [start, end] page ranges (0-indexed)
 * @param {function} onProgress - Progress callback (0–100)
 * @returns {Promise<Uint8Array[]>} Array of PDF bytes for each range
 */
export async function splitPdf(pdfBuffer, ranges, onProgress) {
  const sourcePdf = await PDFDocument.load(pdfBuffer);
  const results = [];
  const total = ranges.length;

  for (let i = 0; i < total; i++) {
    const [start, end] = ranges[i];
    const newPdf = await PDFDocument.create();
    const indices = [];

    for (let p = start; p <= end; p++) {
      indices.push(p);
    }

    const pages = await newPdf.copyPages(sourcePdf, indices);
    pages.forEach((page) => newPdf.addPage(page));

    results.push(await newPdf.save());
    onProgress?.(Math.round(((i + 1) / total) * 100));
  }

  return results;
}

/**
 * Split a PDF into individual pages.
 * @param {ArrayBuffer} pdfBuffer - Source PDF ArrayBuffer
 * @param {function} onProgress - Progress callback (0–100)
 * @returns {Promise<Uint8Array[]>} Array of single-page PDF bytes
 */
export async function splitPdfByPages(pdfBuffer, onProgress) {
  const sourcePdf = await PDFDocument.load(pdfBuffer);
  const pageCount = sourcePdf.getPageCount();
  const ranges = Array.from({ length: pageCount }, (_, i) => [i, i]);
  return splitPdf(pdfBuffer, ranges, onProgress);
}

/**
 * Rotate pages of a PDF.
 * @param {ArrayBuffer} pdfBuffer - Source PDF ArrayBuffer
 * @param {number} angle - Rotation angle (90, 180, or 270)
 * @param {number[]} [pageIndices] - Specific pages to rotate (0-indexed). Rotates all if omitted.
 * @returns {Promise<Uint8Array>} Rotated PDF bytes
 */
export async function rotatePdf(pdfBuffer, angle, pageIndices) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();

  const indicesToRotate = pageIndices || pages.map((_, i) => i);

  indicesToRotate.forEach((idx) => {
    if (idx < pages.length) {
      const page = pages[idx];
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + angle));
    }
  });

  return pdfDoc.save();
}

/**
 * Get page count from a PDF buffer.
 * @param {ArrayBuffer} pdfBuffer
 * @returns {Promise<number>}
 */
export async function getPageCount(pdfBuffer) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  return pdfDoc.getPageCount();
}

/**
 * Parse a page range string like "1-3, 5, 7-10" into 0-indexed [start, end] pairs.
 * @param {string} rangeStr - Human-readable page range (1-indexed)
 * @param {number} maxPage - Total page count
 * @returns {number[][]} Array of [start, end] pairs (0-indexed)
 */
export function parsePageRanges(rangeStr, maxPage) {
  const ranges = [];
  const parts = rangeStr.split(",").map((s) => s.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [a, b] = part.split("-").map((n) => parseInt(n.trim(), 10));
      const start = Math.max(1, Math.min(a, maxPage));
      const end = Math.max(1, Math.min(b, maxPage));
      ranges.push([start - 1, end - 1]); // Convert to 0-indexed
    } else {
      const page = parseInt(part, 10);
      if (page >= 1 && page <= maxPage) {
        ranges.push([page - 1, page - 1]);
      }
    }
  }

  return ranges;
}
