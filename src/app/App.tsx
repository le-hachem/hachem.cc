import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { BookSection } from "./components/BookSection";
import { CompositionRack } from "./components/CompositionRack";
import { CompositionModal } from "./components/CompositionModal";
import { CompositionsLibrary } from "./components/CompositionsLibrary";
import { ConcertsSection } from "./components/ConcertsSection";
import { DispatchesSection } from "./components/DispatchesSection";
import { NotFound } from "./components/NotFound";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { CommissionsSection } from "./components/CommissionsSection";
import { ContactSection } from "./components/ContactSection";
import { NavHeader } from "./components/NavHeader";
import { MastheadDesktop } from "./components/MastheadDesktop";
import { MastheadMobile } from "./components/MastheadMobile";
import { TocRail } from "./components/TocRail";
import { FrontPage } from "./components/FrontPage";
import { StaffDivider } from "./components/StaffDivider";
import { Reveal } from "./components/Reveal";
import { EasterEggs } from "./components/EasterEggs";
import { getCompositions } from "./i18n/compositions";
import { hideDispatches } from "./i18n/dispatches";
import { useLanguage } from "./i18n/LanguageContext";
import backgroundSvg from "../assets/background.svg";

export default function App() {
  const { lang, t } = useLanguage();
  // Compositions are rebuilt in the active language. We track the selected
  // piece by id so the open modal follows language changes too.
  const compositions = useMemo(() => getCompositions(lang), [lang]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  // A path that resolves to no piece (and isn't the root) shows the 404 view.
  const [notFound, setNotFound] = useState(false);

  // Night (default, dark) or Day (light "newsprint") edition, remembered.
  const [edition, setEdition] = useState<"night" | "day">(() => {
    try {
      return localStorage.getItem("hh-edition-theme") === "day" ? "day" : "night";
    } catch {
      return "night";
    }
  });
  useEffect(() => {
    const day = edition === "day";
    document.documentElement.classList.toggle("daylight", day);
    // Flip the favicon to match the edition.
    document
      .getElementById("favicon-svg")
      ?.setAttribute("href", day ? "/favicon-day.svg" : "/favicon.svg");
    try {
      localStorage.setItem("hh-edition-theme", edition);
    } catch {
      /* ignore */
    }
  }, [edition]);
  // Theme change: an ink bar wipes across, the edition swaps while it covers
  // the page, then it wipes off revealing the new edition (.ink-sweep in CSS).
  const [sweepKey, setSweepKey] = useState(0);
  const [sweeping, setSweeping] = useState(false);
  const toggleEdition = () => {
    const next = edition === "day" ? "night" : "day";
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setEdition(next);
      return;
    }
    setSweepKey((k) => k + 1);
    setSweeping(true);
    window.setTimeout(() => setEdition(next), 340); // swap while covered
    window.setTimeout(() => setSweeping(false), 720); // panel gone
  };

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
    else setNotFound(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the URL in sync: /<id> while a piece is open, / otherwise. Left alone
  // on a 404 so the bad address stays visible until the reader heads home.
  useEffect(() => {
    if (typeof window === "undefined" || notFound) return;
    const target = selectedComposition ? `/${selectedComposition.id}` : "/";
    if (window.location.pathname !== target) {
      window.history.replaceState(null, "", target);
    }
  }, [selectedComposition, notFound]);

  if (notFound) {
    return (
      <NotFound
        onHome={() => {
          window.history.replaceState(null, "", "/");
          setNotFound(false);
        }}
      />
    );
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--c-121110)]">
      {/* Mobile / tablet nav (below xl) — the pocket edition's hamburger. */}
      <div className="xl:hidden">
        <NavHeader edition={edition} onToggleEdition={toggleEdition} />
      </div>

      {/* Desktop "digital broadsheet" chrome (xl+): the cipher becomes a fixed
          nameplate up top and the table of contents runs fixed down the left. */}
      <MastheadDesktop edition={edition} onToggleEdition={toggleEdition} />
      <TocRail />

      {/* Background SVG — scrolls with content */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07] z-0"
      >
        <img
          src={backgroundSvg}
          alt=""
          className={`h-full w-full object-cover ${edition === "night" ? "invert" : ""}`}
        />
      </div>

      {/* Content column — cleared past the fixed masthead + rail on desktop. */}
      <div className="xl:pl-[var(--rail-w)] xl:pt-[var(--masthead-h)]">
      {/* Masthead — mobile / tablet only; the cipher as the paper's nameplate,
          in place of the old full-screen photo hero. On desktop it lives fixed
          up top instead. */}
      <div className="relative z-10 xl:hidden">
        <MastheadMobile />
      </div>

      {/* Front page — above the fold */}
      <div className="relative z-10">
        <FrontPage />
      </div>

      {/* About */}
      <div id="about" className="relative z-10 border-t border-[var(--seam)] bg-[var(--c-151414)] scroll-mt-12 xl:scroll-mt-32">
        <AboutSection />
      </div>

      {/* Featured works */}
      <div id="works" className="relative z-10 border-t border-[var(--seam)] bg-[var(--c-1a1816)] scroll-mt-12 xl:scroll-mt-32">
        <CompositionRack
          compositions={compositions}
          onCompositionClick={(c) => setSelectedId(c.id)}
          onViewAllClick={() => setIsLibraryOpen(true)}
        />
      </div>

      {/* Concert diary / Agenda */}
      <div id="agenda" className="relative z-10 border-t border-[var(--seam)] bg-[var(--c-151414)] scroll-mt-12 xl:scroll-mt-32">
        <ConcertsSection />
      </div>

      {/* Dispatches — the news column (optional, via VITE_HIDE_DISPATCHES) */}
      {!hideDispatches && (
        <div id="dispatches" className="relative z-10 border-t border-[var(--seam)] bg-[var(--c-1a1816)] scroll-mt-12 xl:scroll-mt-32">
          <DispatchesSection />
        </div>
      )}

      {/* Lili Boulanger Restoration Project */}
      <div id="projects" className={`relative z-10 border-t border-[var(--seam)] scroll-mt-12 xl:scroll-mt-32 ${hideDispatches ? "bg-[var(--c-1a1816)]" : "bg-[var(--c-151414)]"}`}>
        <BookSection />
      </div>

      {/* Services */}
      <div id="services" className={`relative z-10 border-t border-[var(--seam)] scroll-mt-12 xl:scroll-mt-32 ${hideDispatches ? "bg-[var(--c-151414)]" : "bg-[var(--c-1a1816)]"}`}>
        <ServicesSection />
      </div>

      {/* Commissions */}
      <div id="commissions" className={`relative z-10 border-t border-[var(--seam)] scroll-mt-12 xl:scroll-mt-32 ${hideDispatches ? "bg-[var(--c-1a1816)]" : "bg-[var(--c-151414)]"}`}>
        <CommissionsSection />
      </div>

      {/* Contact */}
      <div id="contact" className={`relative z-10 border-t border-[var(--seam)] scroll-mt-12 xl:scroll-mt-32 ${hideDispatches ? "bg-[var(--c-151414)]" : "bg-[var(--c-1a1816)]"}`}>
        <ContactSection />
      </div>

      {/* Colophon — the paper signs off with a closing measure of music. */}
      <footer className="relative z-10 bg-[var(--c-121110)] px-4 pt-12 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <StaffDivider className="mb-10" />
          <div className="np-rule-strong" />
          <Reveal as="p" y={10} className="np-smallcaps np-head mt-5 text-xl sm:text-2xl tracking-[0.05em] text-[var(--c-e6e0d5)]">
            {t.masthead}
          </Reveal>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: "YouTube",   href: "https://www.youtube.com/@hachem.mp3" },
              { label: "Instagram", href: "https://www.instagram.com/hachem.mp3/" },
              { label: "Ko-fi",     href: "https://ko-fi.com/hachem_mp3" },
              { label: "Email",     href: "mailto:contact@hachem.cc" },
            ].map((l, i) => (
              <Reveal as="span" key={l.label} index={i} y={6} className="flex items-center gap-x-6">
                {i > 0 && <span className="text-[var(--c-2f2c28)]" aria-hidden>·</span>}
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="np-kicker np-link-grow text-[var(--c-8a8071)] hover:text-[var(--c-e6e0d5)] transition-colors"
                >
                  {l.label}
                </a>
              </Reveal>
            ))}
          </div>

          <div className="np-rule mt-6 mb-5" />
          <Reveal as="p" y={6} className="np-body italic text-sm text-[var(--c-7b7267)]">
            © 2026 Hachem <span className="mx-1.5" aria-hidden>·</span>
            {t.footer.fine}
          </Reveal>
        </div>
      </footer>
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

      {/* Broadsheet column guides — faint vertical rules ruled down the whole
          page, as if everything were set on the same columned sheet. On desktop
          they shift right to sit over the content column, not the rail. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[55] hidden justify-center px-4 sm:flex xl:pl-[var(--rail-w)]">
        <div
          className="h-full w-full max-w-6xl"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent 0, transparent calc(100% / 12 - 1px), var(--guide) calc(100% / 12 - 1px), var(--guide) calc(100% / 12))",
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

      {/* Quiet delights for the curious */}
      <EasterEggs />

      {/* Edition change — an ink bar wipes across while the theme swaps behind it */}
      {sweeping && (
        <div
          key={sweepKey}
          aria-hidden
          className="ink-sweep pointer-events-none fixed inset-0 z-[2000]"
        />
      )}
    </div>
    </MotionConfig>
  );
}
