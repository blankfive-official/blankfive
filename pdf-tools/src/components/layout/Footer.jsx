import { Link } from "react-router-dom";

const toolLinks = [
  { label: "Merge PDF", path: "/merge-pdf" },
  { label: "Split PDF", path: "/split-pdf" },
  { label: "Compress PDF", path: "/compress-pdf" },
  { label: "PDF to JPG", path: "/pdf-to-jpg" },
  { label: "JPG to PDF", path: "/jpg-to-pdf" },
  { label: "Rotate PDF", path: "/rotate-pdf" },
  { label: "Unlock PDF", path: "/unlock-pdf" },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="relative bg-black border-t border-white/10 pt-16 md:pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* ── Brand Column ──────────────────────────── */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="10" fill="#121212"/>
                <path d="M14 8h12l8 8v24a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                <text x="17" y="32" fontFamily="sans-serif" fontWeight="700" fontSize="14" fill="#ff4d00">B5</text>
                <circle cx="38" cy="10" r="3" fill="#ccff00"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-display text-base leading-tight text-white">
                  Blank<span className="text-brand">Five</span>
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-neutral-500">
                  PDF Tools
                </span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Free online PDF tools by Blank Five. Process your files securely in the browser — no uploads needed for most operations.
            </p>
          </div>

          {/* ── Tools Column ──────────────────────────── */}
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-5">
              PDF Tools
            </div>
            <ul className="space-y-2.5">
              {toolLinks.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-neutral-300 hover:text-brand transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company Column ────────────────────────── */}
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-5">
              Company
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://blankfive.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-brand transition-colors text-sm"
                >
                  About Blank Five
                </a>
              </li>
              <li>
                <a
                  href="https://blankfive.com/#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-brand transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://blankfive.com/#services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-brand transition-colors text-sm"
                >
                  Our Services
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────── */}
        <div className="border-t border-white/10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            © {new Date().getFullYear()} BlankFive — Kerala, India. All rights reserved.
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            Built with ♥ by BlankFive
          </div>
        </div>

        {/* ── Large Watermark Text ────────────────────── */}
        <div aria-hidden="true" className="pointer-events-none select-none pt-2 pb-2">
          <div
            className="font-display leading-[0.85] tracking-[-0.05em] text-transparent whitespace-nowrap"
            style={{ WebkitTextStroke: "1px #151515", fontSize: "clamp(3rem, 12vw, 14rem)" }}
          >
            BLANKFIVE PDF
          </div>
        </div>
      </div>
    </footer>
  );
}
