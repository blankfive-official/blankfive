import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import ToolGrid from "@/components/home/ToolGrid";
import Features from "@/components/home/Features";

/**
 * Home — Landing page assembling Hero, ToolGrid, and Features sections.
 * Updates document title for SEO.
 */
export default function Home() {
  useEffect(() => {
    document.title = "Blank Five PDF Tools — Free Online PDF Toolkit";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Free online PDF tools by Blank Five. Merge, split, compress, convert, rotate and unlock PDFs instantly — right in your browser."
    );
  }, []);

  return (
    <div id="home-page">
      <HeroSection />
      <ToolGrid />
      <Features />
    </div>
  );
}
