function Github({ className, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Instagram({ className, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Twitter({ className, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Mail({ className, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#projects" },
  { label: "Careers", href: "#contact" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = ["Web Development", "Software Development", "Mobile Apps", "AI Solutions", "UI/UX Design", "Cloud Services"];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/blankfive" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/blank5" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/blankfive.official/" },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com/blankfivehq" },
  { icon: Mail, label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=blankfive.official@gmail.com" },
];

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative bg-black border-t border-white/10 pt-20 md:pt-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          <div className="md:col-span-5">
            <div className="flex items-center mb-6">
              <img src="/images/logo.png" alt="BlankFive logo" className="h-26 md:h-30 w-auto object-contain" />
            </div>
            <p className="text-neutral-400 text-base leading-relaxed max-w-md">
              Building the next generation of digital experiences through innovation, design, and technology.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                const isMail = s.href.startsWith("mailto:");
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    aria-label={s.label}
                    data-testid={`footer-social-${s.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                    className="h-11 w-11 flex items-center justify-center border border-white/15 hover:border-[#ff4d00] hover:text-[#ff4d00] text-neutral-300 transition-colors duration-200"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500 mb-6">Quick Links</div>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} data-testid={`footer-link-${l.label.toLowerCase()}`} className="text-neutral-300 hover:text-[#ff4d00] transition-colors text-base">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500 mb-6">Services</div>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-neutral-300 hover:text-[#ff4d00] transition-colors text-base">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500">
            © {new Date().getFullYear()} BlankFive — Kerala, India. All rights reserved.
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500">Built by blankfive.</div>
        </div>

        <div aria-hidden="true" className="pointer-events-none select-none pt-4 pb-2">
          <div
            className="font-display leading-[0.85] tracking-[-0.05em] text-transparent whitespace-nowrap"
            style={{ WebkitTextStroke: "1px #1f1f1f", fontSize: "clamp(4rem, 15vw, 20rem)" }}
          >
            BLANKFIVE
          </div>
        </div>
      </div>
    </footer>
  );
}