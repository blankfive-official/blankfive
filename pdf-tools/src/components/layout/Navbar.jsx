import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

/* ── Tool definitions used in nav dropdown ────────────────────── */
const tools = [
  { label: "Merge PDF", path: "/merge-pdf", color: "text-tool-merge" },
  { label: "Split PDF", path: "/split-pdf", color: "text-tool-split" },
  { label: "Compress PDF", path: "/compress-pdf", color: "text-tool-compress" },
  { label: "PDF to JPG", path: "/pdf-to-jpg", color: "text-tool-convert" },
  { label: "JPG to PDF", path: "/jpg-to-pdf", color: "text-tool-convert" },
  { label: "Rotate PDF", path: "/rotate-pdf", color: "text-tool-rotate" },
  { label: "Unlock PDF", path: "/unlock-pdf", color: "text-tool-unlock" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Close menus on route change */
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [location.pathname]);

  /* Track scroll position for backdrop */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        {/* ── Logo ─────────────────────────────────────────── */}
        <Link to="/" id="nav-logo" className="flex items-center gap-2.5 group">
          {/* Inline SVG logo mark */}
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-105">
            <rect width="48" height="48" rx="10" fill="#121212"/>
            <path d="M14 8h12l8 8v24a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
            <path d="M26 8v8h8" fill="none" stroke="#333" strokeWidth="1"/>
            <text x="17" y="32" fontFamily="sans-serif" fontWeight="700" fontSize="14" fill="#ff4d00">B5</text>
            <circle cx="38" cy="10" r="3" fill="#ccff00"/>
          </svg>
          <div className="flex flex-col">
            <span className="font-display text-lg leading-tight text-white">
              Blank<span className="text-brand">Five</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500">
              PDF Tools
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ──────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Tools Dropdown */}
          <div className="relative">
            <button
              id="nav-tools-toggle"
              onClick={() => setToolsOpen((v) => !v)}
              className="flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              All Tools
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  toolsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {toolsOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setToolsOpen(false)}
                />
                <div className="absolute top-full left-0 mt-2 z-20 w-56 bg-surface border border-white/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
                  <div className="p-2">
                    {tools.map((tool) => (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        id={`nav-tool-${tool.path.slice(1)}`}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          location.pathname === tool.path
                            ? "bg-white/10 text-white"
                            : "text-neutral-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-current ${tool.color}`} />
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Link
            to="/"
            className="px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            Home
          </Link>
        </nav>

        {/* ── Desktop CTA ──────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://blankfive.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-400 hover:text-white transition-colors px-4 py-2"
          >
            blankfive.com
          </a>
        </div>

        {/* ── Mobile Menu Toggle ───────────────────────────── */}
        <button
          id="mobile-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 border border-white/15 hover:border-white/40 rounded-lg transition-colors"
        >
          {mobileOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
        >
          <div className="px-5 py-6 space-y-1">
            <Link
              to="/"
              className="block px-4 py-3 rounded-lg font-display text-lg text-neutral-200 hover:text-brand hover:bg-white/5 transition-colors"
            >
              Home
            </Link>
            <div className="pl-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                Tools
              </span>
            </div>
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-colors ${
                  location.pathname === tool.path
                    ? "bg-white/10 text-white"
                    : "text-neutral-300 hover:text-brand hover:bg-white/5"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full bg-current ${tool.color}`} />
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
