/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#121212',
        'surface-hover': '#1a1a1a',
        border: '#262626',
        brand: '#ff4d00',
        'brand-hover': '#e64500',
        accent: '#ccff00',
        'tool-merge': '#ff6b35',
        'tool-split': '#3b82f6',
        'tool-compress': '#10b981',
        'tool-convert': '#8b5cf6',
        'tool-rotate': '#f59e0b',
        'tool-unlock': '#ef4444',
      },
      fontFamily: {
        display: ['"Clash Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
