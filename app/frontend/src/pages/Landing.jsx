import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import WhyChoose from "@/components/site/WhyChoose";
import Process from "@/components/site/Process";
import Projects from "@/components/site/Projects";
import TechStack from "@/components/site/TechStack";
import Stats from "@/components/site/Stats";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import CTA from "@/components/site/CTA";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function Landing() {
  return (
    <div data-testid="landing-page" className="relative bg-[#050505]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <Process />
        <Projects />
        <TechStack />
        <Stats />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}