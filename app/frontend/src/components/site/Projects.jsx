import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const projects = [
  { title: "Business Management Platform", tag: "ERP · SaaS", desc: "A complete ERP system with dashboards, reports, inventory, finance, and employee management.", img: "/images/project-business.jpeg", span: "md:col-span-8", ratio: "aspect-[16/9]" },
  { title: "Healthcare Appointments", tag: "Health · Web + Mobile", desc: "Online booking, patient records, payments, and doctor dashboards.", img: "/images/project-healthcare.jpeg", span: "md:col-span-4", ratio: "aspect-[3/4]" },
  { title: "Learning Management System", tag: "EdTech", desc: "Interactive courses, quizzes, certifications, and student analytics.", img: "/images/project-learning.jpeg", span: "md:col-span-4", ratio: "aspect-[4/3]" },
  { title: "AI Customer Support Assistant", tag: "AI · Chatbot", desc: "An intelligent chatbot capable of answering customer questions 24/7.", img: "/images/project-support.jpeg", span: "md:col-span-8", ratio: "aspect-[16/9]" },
  { title: "E-Commerce Platform", tag: "Retail · Payments", desc: "Secure online shopping experience with payment integration and admin dashboard.", img: "/images/project-ecommerce.jpeg", span: "md:col-span-6", ratio: "aspect-[4/3]" },
  { title: "Portfolio & Business Sites", tag: "Marketing", desc: "High-performance websites built for speed, SEO, and conversions.", img: "/images/project-portfolio.jpeg", span: "md:col-span-6", ratio: "aspect-[4/3]" },
];

export default function Projects() {
  return (
    <section id="projects" data-testid="projects-section" className="relative py-24 md:py-40 border-t border-white/10 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(05) — Featured Work</span>
              <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-white max-w-3xl">
                Products that ship,<br />
                <span className="text-neutral-500">outcomes that compound.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="#contact" data-testid="projects-cta" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white border-b border-white/40 hover:border-[#ff4d00] hover:text-[#ff4d00] pb-2 transition-colors duration-200">
              Discuss your project <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * (i % 3)} className={p.span}>
              <a href="#contact" data-testid={`project-card-${i}`} className="group block relative overflow-hidden border border-white/10 hover:border-white/40 transition-colors duration-300">
                <div className={`relative ${p.ratio} overflow-hidden bg-[#0a0a0a]`}>
                  <img src={p.img} alt={p.title} className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70 bg-black/40 backdrop-blur-sm px-2 py-1">{p.tag}</span>
                    <span className="h-9 w-9 border border-white/30 group-hover:border-[#ff4d00] group-hover:bg-[#ff4d00] flex items-center justify-center transition-colors duration-300">
                      <ArrowUpRight className="h-4 w-4 text-white group-hover:text-black transition-colors" strokeWidth={2.5} />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="font-display text-2xl md:text-3xl text-white mb-2 tracking-tight">{p.title}</h3>
                    <p className="text-neutral-300 text-sm md:text-base max-w-md">{p.desc}</p>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}