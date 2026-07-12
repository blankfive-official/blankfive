import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

/* ── Lazy-loaded tool pages for optimal code splitting ────────── */
const Home = lazy(() => import("@/pages/Home"));
const MergePdf = lazy(() => import("@/pages/MergePdf"));
const SplitPdf = lazy(() => import("@/pages/SplitPdf"));
const CompressPdf = lazy(() => import("@/pages/CompressPdf"));
const PdfToJpg = lazy(() => import("@/pages/PdfToJpg"));
const JpgToPdf = lazy(() => import("@/pages/JpgToPdf"));
const RotatePdf = lazy(() => import("@/pages/RotatePdf"));
const UnlockPdf = lazy(() => import("@/pages/UnlockPdf"));

/* ── Loading Spinner ─────────────────────────────────────────── */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
            <Route path="/split-pdf" element={<SplitPdf />} />
            <Route path="/compress-pdf" element={<CompressPdf />} />
            <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
            <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/rotate-pdf" element={<RotatePdf />} />
            <Route path="/unlock-pdf" element={<UnlockPdf />} />
            {/* Catch-all redirects to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
