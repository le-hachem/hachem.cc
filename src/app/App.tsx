import { useEffect, useMemo, useState } from "react";
import { ProgressiveTextReveal } from "./components/ProgressiveTextReveal";
import { BookSection } from "./components/BookSection";
import { CompositionRack } from "./components/CompositionRack";
import { CompositionModal } from "./components/CompositionModal";
import { CompositionsLibrary } from "./components/CompositionsLibrary";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { CommissionsSection } from "./components/CommissionsSection";
import { ContactSection } from "./components/ContactSection";
import { NavHeader } from "./components/NavHeader";
import { FrontPage } from "./components/FrontPage";
import { CandleCursor } from "./components/CandleCursor";
import { MASTHEAD } from "./components/SectionHeading";
import { getCompositions } from "./i18n/compositions";
import { useLanguage } from "./i18n/LanguageContext";
import backgroundSvg from "../assets/background.svg";

export default function App() {
  const { lang, t } = useLanguage();
  // Compositions are rebuilt in the active language. We track the selected
  // piece by id so the open modal follows language changes too.
  const compositions = useMemo(() => getCompositions(lang), [lang]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const selectedComposition =
    compositions.find((c) => c.id === selectedId) ?? null;

  // Deep link: `hachem.cc/<id>` or `?piece=<id>` opens that composition's
  // modal on page load. Works even when the rack is hidden by
  // VITE_HIDE_COMPOSITIONS, since it bypasses the listing entirely.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromQuery = new URLSearchParams(window.location.search).get("piece");
    const fromPath = decodeURIComponent(window.location.pathname)
      .replace(/^\/+|\/+$/g, "");
    const id = (fromQuery ?? fromPath).toLowerCase();
    if (!id) return;
    const match = compositions.find((c) => c.id.toLowerCase() === id);
    if (match) setSelectedId(match.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the URL in sync: /<id> while a piece is open, / otherwise
  useEffect(() => {
    if (typeof window === "undefined") return;
    const target = selectedComposition ? `/${selectedComposition.id}` : "/";
    if (window.location.pathname !== target) {
      window.history.replaceState(null, "", target);
    }
  }, [selectedComposition]);

  return (
    <div className="relative min-h-screen bg-[#121110]">
      {/* Sticky nav */}
      <NavHeader />

      {/* Background SVG — scrolls with content */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07] z-0"
      >
        <img src={backgroundSvg} alt="" className="h-full w-full object-cover invert" />
      </div>

      {/* Hero */}
      <div className="relative z-10">
        <ProgressiveTextReveal />
      </div>

      {/* Front page — above the fold */}
      <div className="relative z-10">
        <FrontPage />
      </div>

      {/* About */}
      <div id="about" className="relative z-10 border-t border-[rgba(230,224,213,0.13)] bg-[#151414] scroll-mt-12">
        <AboutSection />
      </div>

      {/* Featured works */}
      <div id="works" className="relative z-10 border-t border-[rgba(230,224,213,0.13)] bg-[#1a1816] scroll-mt-12">
        <CompositionRack
          compositions={compositions}
          onCompositionClick={(c) => setSelectedId(c.id)}
          onViewAllClick={() => setIsLibraryOpen(true)}
        />
      </div>

      {/* Lili Boulanger Restoration Project */}
      <div id="projects" className="relative z-10 border-t border-[rgba(230,224,213,0.13)] bg-[#151414] scroll-mt-12">
        <BookSection />
      </div>

      {/* Services */}
      <div id="services" className="relative z-10 border-t border-[rgba(230,224,213,0.13)] bg-[#1a1816] scroll-mt-12">
        <ServicesSection />
      </div>

      {/* Commissions */}
      <div id="commissions" className="relative z-10 border-t border-[rgba(230,224,213,0.13)] bg-[#151414] scroll-mt-12">
        <CommissionsSection />
      </div>

      {/* Contact */}
      <div id="contact" className="relative z-10 border-t border-[rgba(230,224,213,0.13)] bg-[#1a1816] scroll-mt-12">
        <ContactSection />
      </div>

      {/* Full-screen modal */}
      {selectedComposition && (
        <CompositionModal
          composition={selectedComposition}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* Compositions Library */}
      <CompositionsLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        compositions={compositions}
        onCompositionClick={(c) => setSelectedId(c.id)}
      />

      {/* Colophon */}
      <footer className="relative z-10 bg-[#121110] px-4 pt-12 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="np-rule-strong" />
          <p className="np-smallcaps np-head mt-5 text-xl sm:text-2xl tracking-[0.05em] text-[#e6e0d5]">
            {MASTHEAD}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: "YouTube",   href: "https://www.youtube.com/@hachem.mp3" },
              { label: "Instagram", href: "https://www.instagram.com/hachem.mp3/" },
              { label: "Ko-fi",     href: "https://ko-fi.com/hachem_mp3" },
              { label: "Email",     href: "mailto:contact@hachem.cc" },
            ].map((l, i) => (
              <span key={l.label} className="flex items-center gap-x-6">
                {i > 0 && <span className="text-[#2f2c28]" aria-hidden>·</span>}
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="np-kicker text-[#8a8071] hover:text-[#e6e0d5] transition-colors"
                >
                  {l.label}
                </a>
              </span>
            ))}
          </div>

          <div className="np-rule mt-6 mb-5" />
          <p className="np-body italic text-sm text-[#7b7267]">
            Set in Fraunces, Playfair Display &amp; Old Standard&nbsp;TT.
            <span className="mx-1.5" aria-hidden>·</span>
            © 2026 Hachem H. <span className="mx-1.5" aria-hidden>·</span>
            {t.footer.fine}
          </p>
        </div>
      </footer>

      {/* Broadsheet column guides — faint vertical rules ruled down the whole
          page, as if everything were set on the same columned sheet. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[55] flex justify-center px-4">
        <div
          className="h-full w-full max-w-6xl"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent 0, transparent calc(100% / 12 - 1px), rgba(230,224,213,0.05) calc(100% / 12 - 1px), rgba(230,224,213,0.05) calc(100% / 12))",
          }}
        />
      </div>

      {/* Film grain — a static texture layer over the whole page (below nav and
          modals). Mid-grey noise under an overlay blend adds tooth to the flat
          dark sections without tinting them. */}
      <div
        aria-hidden
        className="np-grain-anim pointer-events-none fixed inset-0 z-[60]"
        style={{
          backgroundImage: "url('/noise.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
          mixBlendMode: "overlay",
          opacity: 0.32,
        }}
      />

      {/* Candlelight that follows the pointer */}
      <CandleCursor />
    </div>
  );
}
