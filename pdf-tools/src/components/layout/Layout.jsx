import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Layout — Wraps all pages with consistent Navbar + Footer.
 * Provides min-height to push footer to bottom.
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-white">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
