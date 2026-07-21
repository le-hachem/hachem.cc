import { useEffect, useMemo, useState } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
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
import { RippedEdge } from "./components/RippedEdge";
import { RegistrationMarks } from "./components/Ornaments";
import { EasterEggs } from "./components/EasterEggs";
import { getCompositions } from "./i18n/compositions";
import { hideDispatches } from "./i18n/dispatches";
import { useLanguage } from "./i18n/LanguageContext";
import { THEMES, applyTheme, readStoredTheme } from "./theme";
import backgroundSvg from "../assets/background.svg";

export default function App() {
  const { lang } = useLanguage();
  // Compositions are rebuilt in the active language. We track the selected
  // piece by id so the open modal follows language changes too.
  const compositions = useMemo(() => getCompositions(lang), [lang]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  // A path that resolves to no piece (and isn't the root) shows the 404 view.
  const [notFound, setNotFound] = useState(false);

  // Editions of the paper — each a full palette over the same token system.
  // `night` and `day` are the house pair (the sun/moon toggle flips between
  // them); the rest are alternate printings pickable from the console:
  //   window.hh.setTheme("midnight")   — see window.hh.themes for the list.
  // Light themes also carry the `daylight` class so every light-mode
  // behavioural rule (hover tints, letterpress, fold shading…) follows.
  const themeState = useState<string>(readStoredTheme);
  const theme = themeState[0];
  const setTheme = themeState[1];
  const isLight = THEMES[theme].light;
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // The console API — pick any printing without waiting for a UI.
  useEffect(() => {
    (window as unknown as { hh?: object }).hh = {
      themes: Object.keys(THEMES),
      theme,
      setTheme: (name: string) => {
        if (name in THEMES) setTheme(name);
        else console.warn(`Unknown theme "${name}". Try: ${Object.keys(THEMES).join(", ")}`);
      },
    };
  }, [theme, setTheme]);
  useEffect(() => {
    try {
      console.info(
        "%c🎨 Other printings of this paper — window.hh.setTheme(name): " +
          Object.keys(THEMES).join(" · "),
        "font: italic 12px Georgia, serif; color: #8a8071"
      );
    } catch {
      /* ignore */
    }
  }, []);

  // Theme change: an ink bar wipes across, the edition swaps while it covers
  // the page, then it wipes off revealing the new edition (.ink-sweep in CSS).
  const [sweepKey, setSweepKey] = useState(0);
  const [sweeping, setSweeping] = useState(false);
  const toggleEdition = () => {
    const next = isLight ? "night" : "day";
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTheme(next);
      return;
    }
    setSweepKey((k) => k + 1);
    setSweeping(true);
    window.setTimeout(() => setTheme(next), 340); // swap while covered
    window.setTimeout(() => setSweeping(false), 720); // panel gone
  };

  // The engraved-score background drifts slower than the page — the sheet
  // beneath the sheets. A little vertical bleed keeps its edges covered.
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -140]);

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
        <NavHeader edition={isLight ? "day" : "night"} onToggleEdition={toggleEdition} />
      </div>

      {/* Desktop "digital broadsheet" chrome (xl+): the cipher becomes a fixed
          nameplate up top and the table of contents runs fixed down the left. */}
      <MastheadDesktop edition={isLight ? "day" : "night"} onToggleEdition={toggleEdition} />
      <TocRail />

      {/* Background SVG — a parallax layer beneath the page, drifting slower
          than the content so the paper reads as sitting above it. */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-[-2%] h-[104%] overflow-hidden pointer-events-none opacity-[0.07] z-0"
        style={reduceMotion ? undefined : { y: bgY }}
      >
        <img
          src={backgroundSvg}
          alt=""
          className={`h-full w-full object-cover ${isLight ? "" : "invert"}`}
        />
      </motion.div>

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
      <div id="about" className="np-sheet relative z-10 border-t border-[var(--seam)] bg-[var(--c-151414)] scroll-mt-12 xl:scroll-mt-32">
        <AboutSection />
      </div>

      {/* Featured works */}
      <div id="works" className="np-sheet relative z-10 border-t border-[var(--seam)] bg-[var(--c-1a1816)] scroll-mt-12 xl:scroll-mt-32">
        <CompositionRack
          compositions={compositions}
          onCompositionClick={(c) => setSelectedId(c.id)}
          onViewAllClick={() => setIsLibraryOpen(true)}
        />
      </div>

      {/* Concert diary / Agenda */}
      <div id="agenda" className="np-sheet relative z-10 border-t border-[var(--seam)] bg-[var(--c-151414)] scroll-mt-12 xl:scroll-mt-32">
        <ConcertsSection />
      </div>

      {/* Dispatches — the news column (optional, via VITE_HIDE_DISPATCHES) */}
      {!hideDispatches && (
        <div id="dispatches" className="np-sheet relative z-10 border-t border-[var(--seam)] bg-[var(--c-1a1816)] scroll-mt-12 xl:scroll-mt-32">
          <DispatchesSection />
        </div>
      )}

      {/* Lili Boulanger Restoration Project */}
      <div id="projects" className={`np-sheet relative z-10 border-t border-[var(--seam)] scroll-mt-12 xl:scroll-mt-32 ${hideDispatches ? "bg-[var(--c-1a1816)]" : "bg-[var(--c-151414)]"}`}>
        <BookSection />
      </div>

      {/* Services */}
      <div id="services" className={`np-sheet relative z-10 border-t border-[var(--seam)] scroll-mt-12 xl:scroll-mt-32 ${hideDispatches ? "bg-[var(--c-151414)]" : "bg-[var(--c-1a1816)]"}`}>
        <ServicesSection />
      </div>

      {/* Commissions */}
      <div id="commissions" className={`np-sheet relative z-10 border-t border-[var(--seam)] scroll-mt-12 xl:scroll-mt-32 ${hideDispatches ? "bg-[var(--c-1a1816)]" : "bg-[var(--c-151414)]"}`}>
        <CommissionsSection />
      </div>

      {/* Contact */}
      <div id="contact" className={`np-sheet relative z-10 border-t border-[var(--seam)] scroll-mt-12 xl:scroll-mt-32 ${hideDispatches ? "bg-[var(--c-151414)]" : "bg-[var(--c-1a1816)]"}`}>
        <ContactSection />
      </div>

      {/* End of the paper — the last sheet simply tears off, the dark stone
          showing beneath the ragged edge. */}
      <RippedEdge
        direction="down"
        color={hideDispatches ? "var(--c-151414)" : "var(--c-1a1816)"}
        className="relative z-10"
      />
      <div aria-hidden className="h-16" />
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

      {/* Laid stock — the papermaker's wire and chain lines pressed into the
          sheet, laid over everything at a whisper so the flat tones read as
          paper rather than pixels. */}
      <div aria-hidden className="np-laid pointer-events-none fixed inset-0 z-[56]" />

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

      {/* Pressmen's registration crosshairs at the printable corners. */}
      <RegistrationMarks />

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
