import { useEffect, useState } from "react";
import { ProgressiveTextReveal } from "./components/ProgressiveTextReveal";
import { BookSection } from "./components/BookSection";
import { CompositionRack, compositions } from "./components/CompositionRack";
import { CompositionModal } from "./components/CompositionModal";
import { CompositionsLibrary } from "./components/CompositionsLibrary";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { CommissionsSection } from "./components/CommissionsSection";
import { ContactSection } from "./components/ContactSection";
import { NavHeader } from "./components/NavHeader";
import { StaffDivider } from "./components/StaffDivider";
import type { Composition } from "./components/CompositionRack";
import backgroundSvg from "../assets/background.svg";

export default function App() {
  const [selectedComposition, setSelectedComposition] = useState<Composition | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  // Deep link: `?piece=<id>` opens that composition's modal on page load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("piece");
    if (!id) return;
    const match = compositions.find(
      (c) => c.id.toLowerCase() === id.toLowerCase()
    );
    if (match) setSelectedComposition(match);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Sticky nav */}
      <NavHeader />

      {/* Background SVG — scrolls with content */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] z-0"
      >
        <img src={backgroundSvg} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Hero */}
      <div className="relative z-10">
        <ProgressiveTextReveal />
      </div>

      {/* About */}
      <div id="about" className="relative z-10 bg-white scroll-mt-12">
        <StaffDivider className="pt-10" />
        <AboutSection />
      </div>

      {/* Featured works */}
      <div id="works" className="relative z-10 bg-white scroll-mt-12">
        <CompositionRack
          onCompositionClick={setSelectedComposition}
          onViewAllClick={() => setIsLibraryOpen(true)}
        />
      </div>

      {/* Lili Boulanger Restoration Project */}
      <div id="projects" className="relative z-10 bg-neutral-50 scroll-mt-12">
        <StaffDivider className="pt-10" />
        <BookSection />
      </div>

      {/* Services */}
      <div id="services" className="relative z-10 bg-white scroll-mt-12">
        <StaffDivider className="pt-10" />
        <ServicesSection />
      </div>

      {/* Commissions */}
      <div id="commissions" className="relative z-10 bg-neutral-50 scroll-mt-12">
        <StaffDivider className="pt-10" />
        <CommissionsSection />
      </div>

      {/* Contact */}
      <div id="contact" className="relative z-10 bg-white scroll-mt-12">
        <StaffDivider className="pt-10" />
        <ContactSection />
      </div>

      {/* Full-screen modal */}
      {selectedComposition && (
        <CompositionModal
          composition={selectedComposition}
          onClose={() => setSelectedComposition(null)}
        />
      )}

      {/* Compositions Library */}
      <CompositionsLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        compositions={compositions}
        onCompositionClick={setSelectedComposition}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-200 bg-white px-4 py-10 text-center">
        <div className="flex items-center justify-center gap-6 mb-5">
          <a
            href="https://www.youtube.com/@hachem.mp3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-neutral-400 hover:text-black transition-colors"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            YouTube
          </a>
          <span className="text-neutral-200" aria-hidden>𝄐</span>
          <a
            href="https://www.instagram.com/hachem.mp3/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-neutral-400 hover:text-black transition-colors"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            Instagram
          </a>
          <span className="text-neutral-200" aria-hidden>𝄐</span>
          <a
            href="https://ko-fi.com/hachem_mp3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-neutral-400 hover:text-black transition-colors"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            Ko-fi
          </a>
          <span className="text-neutral-200" aria-hidden>𝄐</span>
          <a
            href="mailto:contact@hachem.cc"
            className="text-xs tracking-widest uppercase text-neutral-400 hover:text-black transition-colors"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            Email
          </a>
        </div>
        <p className="font-serif text-sm text-neutral-300">
          © 2026 Hachem H. <span className="mx-1.5" aria-hidden>·</span>
          <span className="italic"> 𝄂    fine.</span>
        </p>
      </footer>
    </div>
  );
}
