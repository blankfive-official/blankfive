import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 md:h-24 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center group">
          <img src="/images/logo.png" alt="BlankFive logo" className="h-8 md:h-10 w-auto object-contain" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white link-underline transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-testid="nav-cta"
          className="hidden lg:inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#e64500] text-black font-mono text-xs uppercase tracking-[0.18em] px-5 py-3 transition-colors duration-200"
        >
          Start Project <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        </a>

        <button
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 border border-white/15 hover:border-white/40 transition-colors"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-6 py-8 flex flex-col gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                className="font-display text-2xl text-neutral-200 hover:text-[#ff4d00] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-cta"
              className="mt-2 inline-flex items-center gap-2 bg-[#ff4d00] text-black font-mono text-xs uppercase tracking-[0.18em] px-5 py-3 w-fit"
            >
              Start Project <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}