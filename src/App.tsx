import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const Admin = lazy(() => import("./pages/Admin"));

const GlassInstallation = lazy(() => import("./pages/service-pages/GlassInstallation"));
const MattressCleaning = lazy(() => import("./pages/service-pages/MattressCleaning"));
const AcDuctCleaning = lazy(() => import("./pages/service-pages/AcDuctCleaning"));
const AcDuctInstallation = lazy(() => import("./pages/service-pages/AcDuctInstallation"));
const AcDuctMaintenance = lazy(() => import("./pages/service-pages/AcDuctMaintenance"));
const HvacServices = lazy(() => import("./pages/service-pages/HvacServices"));

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <p className="text-muted-foreground">Loading…</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollToTopButton />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/glass-installation" element={<GlassInstallation />} />
              <Route path="/mattress-cleaning" element={<MattressCleaning />} />
              <Route path="/ac-duct-cleaning" element={<AcDuctCleaning />} />
              <Route path="/ac-duct-installation" element={<AcDuctInstallation />} />
              <Route path="/ac-duct-maintenance" element={<AcDuctMaintenance />} />
              <Route path="/hvac-services" element={<HvacServices />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
