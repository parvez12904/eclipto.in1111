import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { HeroSection } from './components/HeroSection';
import { ReelsSection } from './components/ReelsSection';
import { WorkSection } from './components/WorkSection';
import { VideoShowcaseSection } from './components/VideoShowcaseSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { ProcessSection } from './components/ProcessSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPortal } from './admin/AdminPortal';
import { X } from 'lucide-react';

export function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Synchronize route changes on browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminView(window.location.pathname.startsWith('/admin') || window.location.hash === '#admin');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWebsite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section dynamically during scrolling
  useEffect(() => {
    const sections = ['hero', 'reels', 'work', 'showreel', 'about', 'services', 'pricing', 'process', 'insights', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminView) {
    return <AdminPortal onBackToWebsite={navigateToWebsite} />;
  }

  return (
    <div className="min-h-screen bg-[#080104] text-white selection:bg-[#E6004C] selection:text-white">
      {/* 1. Top Global Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* 2. Responsive Mobile Overlay Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* 3. Hero Section (100svh, 3D Background Video, Particles, 12-col layout) */}
      <HeroSection
        onNavigate={scrollToSection}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
      />

      {/* 4. Instagram / Latest Reels Showcase (2nd Section of Homepage) */}
      <ReelsSection />

      {/* 5. Selected Work & Client Portfolio */}
      <WorkSection />

      {/* 6. Cinematic Brand Film & Motion Showcase */}
      <VideoShowcaseSection onNavigate={scrollToSection} />

      {/* 7. About & Manifesto */}
      <AboutSection />

      {/* 7. Capabilities & Services */}
      <ServicesSection />

      {/* 8. Transparent Website Development Pricing Packages */}
      <PricingSection onNavigate={scrollToSection} />

      {/* 9. Execution Process */}
      <ProcessSection />

      {/* 10. Agency Insights */}
      <InsightsSection />

      {/* 11. Contact & Inquiries (With Parvez Khan official contact details) */}
      <ContactSection />

      {/* 12. Global Footer */}
      <Footer onNavigate={scrollToSection} onOpenAdmin={navigateToAdmin} />

      {/* 13. Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Agency Showreel Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl rounded-3xl glass-panel border border-white/20 bg-[#080104] p-4 sm:p-6 shadow-[0_25px_80px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:border-[#E6004C] hover:text-[#FF1053] transition-colors"
              aria-label="Close showreel"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10">
              <video
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
                src="https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/cloudinarry%20to%20cloudflare/202606021731-e_hqa6sn.mp4"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-white/60 px-2">
              <span className="text-[#FF1053] font-bold">ECLIPTO 2026 CINEMATIC SHOWREEL</span>
              <span>4K RESOLUTION • 60 FPS ULTRA MOTION</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
