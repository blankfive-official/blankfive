/**
 * image-to-pdf.js — Convert JPG/PNG images into a single PDF document.
 * Uses pdf-lib for pure client-side processing.
 */
import { PDFDocument } from "pdf-lib";

/**
 * Standard page sizes in points (72 points = 1 inch).
 */
const PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
  original: null, // Use image dimensions
};

/**
 * Convert an array of image files to a single PDF.
 *
 * @param {File[]} imageFiles - Array of image File objects
 * @param {Object} options
 * @param {string} options.pageSize - "a4", "letter", or "original"
 * @param {string} options.orientation - "portrait" or "landscape"
 * @param {boolean} options.fitToPage - Scale image to fit page
 * @param {function} options.onProgress - Progress callback (0–100)
 * @returns {Promise<Uint8Array>} PDF bytes
 */
export async function imagesToPdf(imageFiles, options = {}) {
  const {
    pageSize = "a4",
    orientation = "portrait",
    fitToPage = true,
    onProgress,
  } = options;

  const pdfDoc = await PDFDocument.create();
  const total = imageFiles.length;

  for (let i = 0; i < total; i++) {
    const file = imageFiles[i];
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // Embed image based on type
    let image;
    const type = file.type.toLowerCase();
    if (type === "image/png") {
      image = await pdfDoc.embedPng(bytes);
    } else {
      // Default to JPEG for jpg/jpeg and any other format
      image = await pdfDoc.embedJpg(bytes);
    }

    const imgWidth = image.width;
    const imgHeight = image.height;

    // Determine page dimensions
    let pageWidth, pageHeight;
    const size = PAGE_SIZES[pageSize];

    if (size) {
      pageWidth = orientation === "landscape" ? size.height : size.width;
      pageHeight = orientation === "landscape" ? size.width : size.height;
    } else {
      // "original" — use image dimensions directly
      pageWidth = imgWidth;
      pageHeight = imgHeight;
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    if (fitToPage && size) {
      // Scale image to fit within page with margins
      const margin = 0;
      const maxW = pageWidth - margin * 2;
      const maxH = pageHeight - margin * 2;
      const scale = Math.min(maxW / imgWidth, maxH / imgHeight);

      const drawW = imgWidth * scale;
      const drawH = imgHeight * scale;

      // Center the image on the page
      page.drawImage(image, {
        x: (pageWidth - drawW) / 2,
        y: (pageHeight - drawH) / 2,
        width: drawW,
        height: drawH,
      });
    } else {
      // Draw at original size
      page.drawImage(image, {
        x: 0,
        y: pageHeight - imgHeight,
        width: imgWidth,
        height: imgHeight,
      });
    }

    onProgress?.(Math.round(((i + 1) / total) * 100));
  }

  return pdfDoc.save();
}
