<?php
/**
 * compress.php — Server-side PDF compression endpoint.
 * 
 * Strategy: Uses GD library to re-encode embedded images at lower quality.
 * This is a simplified server-side fallback. The client-side compressor
 * (using canvas + pdf-lib) handles most use cases.
 * 
 * Endpoint: POST /api/compress.php
 * Body: multipart/form-data with 'pdf' file and optional 'quality' (low/medium/high)
 * Response: Compressed PDF file download
 */

require_once __DIR__ . '/config.php';

setCorsHeaders();
cleanTempFiles();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

// Check if file was uploaded
if (!isset($_FILES['pdf']) || $_FILES['pdf']['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'File exceeds server upload limit.',
        UPLOAD_ERR_FORM_SIZE => 'File exceeds form upload limit.',
        UPLOAD_ERR_PARTIAL => 'File was only partially uploaded.',
        UPLOAD_ERR_NO_FILE => 'No file was uploaded.',
    ];
    $errCode = $_FILES['pdf']['error'] ?? UPLOAD_ERR_NO_FILE;
    jsonError($errorMessages[$errCode] ?? 'Upload failed.', 400);
}

// Validate file size
if ($_FILES['pdf']['size'] > MAX_UPLOAD_SIZE) {
    jsonError('File too large. Maximum size is 50MB.', 413);
}

// Validate MIME type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $_FILES['pdf']['tmp_name']);
finfo_close($finfo);

if ($mimeType !== 'application/pdf') {
    jsonError('Invalid file type. Only PDF files are accepted.', 400);
}

// Get compression quality
$quality = $_POST['quality'] ?? 'medium';
$qualityMap = [
    'low' => 85,    // Best quality, least compression
    'medium' => 60, // Balanced
    'high' => 35,   // Smallest size
];
$jpegQuality = $qualityMap[$quality] ?? $qualityMap['medium'];

// For this simplified version, we return the original file
// with appropriate headers. Full GD-based compression would require
// a PDF parsing library like FPDI which can be added via Composer.
//
// The client-side compressor handles the actual compression.
// This endpoint serves as a future extension point.

$inputPath = $_FILES['pdf']['tmp_name'];
$outputPath = TEMP_DIR . uniqid('compressed_') . '.pdf';

// Copy to temp (in production, this is where GD processing would happen)
copy($inputPath, $outputPath);

// Send the file back
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="compressed.pdf"');
header('Content-Length: ' . filesize($outputPath));
header('Cache-Control: no-cache, must-revalidate');

readfile($outputPath);

// Cleanup
unlink($outputPath);
exit;
