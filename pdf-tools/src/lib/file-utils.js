/**
 * file-utils.js — File download helpers and zip creation utilities.
 */
import JSZip from "jszip";

/**
 * Trigger a browser download of a Uint8Array or Blob.
 *
 * @param {Uint8Array|Blob} data - File data
 * @param {string} filename - Suggested filename
 * @param {string} [mimeType="application/pdf"] - MIME type
 */
export function downloadFile(data, filename, mimeType = "application/pdf") {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Revoke after a short delay to ensure download starts
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * Create and download a ZIP file from multiple entries.
 *
 * @param {{ name: string, data: Uint8Array|Blob|string }[]} entries - Files to zip
 * @param {string} zipFilename - Output ZIP filename
 * @param {function} [onProgress] - Progress callback (0–100)
 */
export async function downloadAsZip(entries, zipFilename = "output.zip", onProgress) {
  const zip = new JSZip();

  entries.forEach((entry) => {
    zip.file(entry.name, entry.data);
  });

  const blob = await zip.generateAsync(
    { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
    (meta) => onProgress?.(Math.round(meta.percent))
  );

  downloadFile(blob, zipFilename, "application/zip");
}

/**
 * Read a File object as an ArrayBuffer.
 *
 * @param {File} file
 * @returns {Promise<ArrayBuffer>}
 */
export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Format bytes to human-readable string.
 *
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
