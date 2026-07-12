/**
 * unlocker.js — Attempt to remove password protection from a PDF.
 *
 * Uses pdf-lib which can open user-password-protected PDFs
 * when the correct password is provided. The resulting save
 * produces an unprotected copy.
 */
import { PDFDocument } from "pdf-lib";

/**
 * Unlock a password-protected PDF.
 *
 * @param {ArrayBuffer} pdfBuffer - Encrypted PDF ArrayBuffer
 * @param {string} password - User password to unlock the PDF
 * @returns {Promise<{ success: boolean, data?: Uint8Array, error?: string }>}
 */
export async function unlockPdf(pdfBuffer, password) {
  try {
    // Attempt to load with the provided password
    const pdfDoc = await PDFDocument.load(pdfBuffer, {
      password,
      ignoreEncryption: false,
    });

    // Save without encryption
    const unlockedBytes = await pdfDoc.save();

    return {
      success: true,
      data: unlockedBytes,
    };
  } catch (err) {
    // Check if it's a password error
    if (
      err.message?.includes("password") ||
      err.message?.includes("encrypted") ||
      err.message?.includes("decrypt")
    ) {
      return {
        success: false,
        error: "Incorrect password. Please try again.",
      };
    }

    return {
      success: false,
      error: `Failed to process PDF: ${err.message}`,
    };
  }
}

/**
 * Check if a PDF is encrypted / password-protected.
 *
 * @param {ArrayBuffer} pdfBuffer
 * @returns {Promise<boolean>}
 */
export async function isPdfEncrypted(pdfBuffer) {
  try {
    await PDFDocument.load(pdfBuffer, { ignoreEncryption: false });
    return false; // Loaded without password = not encrypted
  } catch {
    return true; // Failed to load = likely encrypted
  }
}
