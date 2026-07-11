import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 md:py-40 border-t border-white/10 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#ff4d00]">(11) — Contact</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-white">Let's talk.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-neutral-400 text-base md:text-lg leading-relaxed max-w-lg mb-12">
                Have an idea worth building? Tell us about it. We reply to every genuine inquiry within one business day — no bots, no gatekeepers, just the founding team.
              </p>
            </Reveal>
          </div>

          <div className="space-y-6 hidden lg:block">
            <Reveal delay={0.15}>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=blankfive.official@gmail.com" target="_blank" rel="noopener noreferrer" data-testid="contact-email" className="group flex items-start gap-6 border border-white/10 hover:border-[#ff4d00] p-6 transition-colors duration-300 bg-[#050505]">
                <Mail className="h-6 w-6 mt-1 text-[#ff4d00] shrink-0" strokeWidth={1.5} />
                <div className="flex-1">
                  <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500">Email</div>
                  <div className="font-display text-xl md:text-2xl text-white mt-2 tracking-tight break-all">blankfive.official@gmail.com</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-neutral-500 group-hover:text-[#ff4d00] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={2} />
              </a>
            </Reveal>

            <Reveal delay={0.25}>
              <div data-testid="contact-location" className="flex items-start gap-6 border border-white/10 p-6 bg-[#050505]">
                <MapPin className="h-6 w-6 mt-1 text-[#ccff00] shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500">Location</div>
                  <div className="font-display text-xl md:text-2xl text-white mt-2 tracking-tight">Kerala, India</div>
                  <div className="mt-2 font-mono text-xs text-neutral-500">Working with clients worldwide</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.3}>
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6 bg-[#050505] p-6 md:p-10 border border-white/10">
              <input type="hidden" name="access_key" value="40a4f163-7016-4119-812b-93de02bf9dec" />
              <input type="hidden" name="subject" value="🚀 New Project Inquiry - BlankFive" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-neutral-400">Full Name <span className="text-[#ff4d00]">*</span></label>
                  <input type="text" id="name" name="name" placeholder="John Doe" required className="w-full bg-black border border-white/10 focus:border-[#ff4d00] outline-none px-4 py-3 text-white transition-colors placeholder:text-neutral-700" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-neutral-400">Work Email <span className="text-[#ff4d00]">*</span></label>
                  <input type="email" id="email" name="email" placeholder="john@company.com" required className="w-full bg-black border border-white/10 focus:border-[#ff4d00] outline-none px-4 py-3 text-white transition-colors placeholder:text-neutral-700" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="font-mono text-xs uppercase tracking-widest text-neutral-400">Phone <span className="text-neutral-600">(Optional)</span></label>
                  <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" className="w-full bg-black border border-white/10 focus:border-[#ff4d00] outline-none px-4 py-3 text-white transition-colors placeholder:text-neutral-700" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="font-mono text-xs uppercase tracking-widest text-neutral-400">Company <span className="text-neutral-600">(Optional)</span></label>
                  <input type="text" id="company" name="company" placeholder="Company or Brand Name" className="w-full bg-black border border-white/10 focus:border-[#ff4d00] outline-none px-4 py-3 text-white transition-colors placeholder:text-neutral-700" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="project_type" className="font-mono text-xs uppercase tracking-widest text-neutral-400">Project Type <span className="text-[#ff4d00]">*</span></label>
                  <div className="relative">
                    <select id="project_type" name="project_type" required className="w-full bg-black border border-white/10 focus:border-[#ff4d00] outline-none px-4 py-3 text-white transition-colors appearance-none cursor-pointer">
                      <option value="">Select Project Type</option>
                      <option>Business Website</option>
                      <option>E-Commerce Website</option>
                      <option>Portfolio Website</option>
                      <option>Web Application</option>
                      <option>AI Automation</option>
                      <option>AI Chatbot</option>
                      <option>UI/UX Design</option>
                      <option>Website Redesign</option>
                      <option>Maintenance & Support</option>
                      <option>Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="timeline" className="font-mono text-xs uppercase tracking-widest text-neutral-400">Timeline <span className="text-neutral-600">(Optional)</span></label>
                  <div className="relative">
                    <select id="timeline" name="timeline" className="w-full bg-black border border-white/10 focus:border-[#ff4d00] outline-none px-4 py-3 text-white transition-colors appearance-none cursor-pointer">
                      <option value="">Select Timeline</option>
                      <option>Immediately</option>
                      <option>Within 2 Weeks</option>
                      <option>Within 1 Month</option>
                      <option>1–3 Months</option>
                      <option>Flexible</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="font-mono text-xs uppercase tracking-widest text-neutral-400">Project Description <span className="text-[#ff4d00]">*</span></label>
                <textarea id="description" name="project_description" rows="5" placeholder="Tell us about your project, goals, required features, inspiration..." required className="w-full bg-black border border-white/10 focus:border-[#ff4d00] outline-none px-4 py-3 text-white transition-colors placeholder:text-neutral-700 resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#ff4d00] hover:bg-[#e64500] text-black font-mono text-sm uppercase tracking-[0.2em] px-6 py-4 transition-colors duration-200 mt-4 font-bold">
                Start Project
              </button>
            </form>
          </Reveal>

          <div className="space-y-6 mt-12 lg:hidden">
            <Reveal delay={0.15}>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=blankfive.official@gmail.com" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-6 border border-white/10 hover:border-[#ff4d00] p-6 transition-colors duration-300 bg-[#050505]">
                <Mail className="h-6 w-6 mt-1 text-[#ff4d00] shrink-0" strokeWidth={1.5} />
                <div className="flex-1">
                  <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500">Email</div>
                  <div className="font-display text-xl text-white mt-2 tracking-tight break-all">blankfive.official@gmail.com</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-neutral-500 group-hover:text-[#ff4d00] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={2} />
              </a>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex items-start gap-6 border border-white/10 p-6 bg-[#050505]">
                <MapPin className="h-6 w-6 mt-1 text-[#ccff00] shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500">Location</div>
                  <div className="font-display text-xl text-white mt-2 tracking-tight">Kerala, India</div>
                  <div className="mt-2 font-mono text-xs text-neutral-500">Working with clients worldwide</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}