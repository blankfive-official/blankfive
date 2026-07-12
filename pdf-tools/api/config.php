<?php
/**
 * config.php — Blank Five PDF Tools API Configuration
 * 
 * Adjust these settings based on your Hostinger plan limits.
 */

// Maximum upload file size (50MB)
define('MAX_UPLOAD_SIZE', 50 * 1024 * 1024);

// Temporary directory for processing
define('TEMP_DIR', sys_get_temp_dir() . '/blankfive-pdf/');

// Create temp directory if it doesn't exist
if (!is_dir(TEMP_DIR)) {
    mkdir(TEMP_DIR, 0755, true);
}

// Allowed origins for CORS (update with your actual domain)
define('ALLOWED_ORIGINS', [
    'https://tools.blankfive.com',
    'https://blankfive.com',
    'http://localhost:5173',  // Vite dev server
    'http://localhost:4173',  // Vite preview
]);

/**
 * Set CORS headers based on the request origin.
 */
function setCorsHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, ALLOWED_ORIGINS)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
    
    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/**
 * Clean up temp files older than 5 minutes.
 */
function cleanTempFiles() {
    $files = glob(TEMP_DIR . '*');
    $now = time();
    
    foreach ($files as $file) {
        if (is_file($file) && ($now - filemtime($file)) > 300) {
            unlink($file);
        }
    }
}

/**
 * Send a JSON error response.
 */
function jsonError($message, $code = 400) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode(['error' => $message]);
    exit;
}

/**
 * Send a JSON success response.
 */
function jsonSuccess($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
