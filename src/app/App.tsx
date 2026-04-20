import { useEffect, useState } from "react";
import { ProgressiveTextReveal } from "./components/ProgressiveTextReveal";
import { BookSection } from "./components/BookSection";
import { CompositionRack, compositions } from "./components/CompositionRack";
import { CompositionModal } from "./components/CompositionModal";
import { CompositionsLibrary } from "./components/CompositionsLibrary";
import { RippedEdge } from "./components/RippedEdge";
import type { Composition } from "./components/CompositionRack";
import backgroundSvg from "../assets/background.svg";

export default function App() {
  const [selectedComposition, setSelectedComposition] = useState<Composition | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  // Deep link: `?piece=<id>` opens that composition's modal on page load,
  // regardless of whether the public rack is currently hidden. Matching is
  // case-insensitive so share links survive casing tweaks.
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
      {/* Background SVG — one image stretched across the whole scrollable
          page so it scrolls with content and never shows a tiling seam.
          The SVG is a single illustration (viewBox ~1885×1242), so we use
          `object-cover` to preserve its look rather than tile it. */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07] z-0"
      >
        <img
          src={backgroundSvg}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Print texture overlay — layered grain + halftone + extras */}
      <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden>
        <svg className="absolute" width="0" height="0">
          <defs>
            <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves="6"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                type="saturate"
                values="0"
                in="noise"
                result="mono"
              />
            </filter>

            <filter id="halftone-dots" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.8"
                numOctaves="1"
                seed="5"
                stitchTiles="stitch"
                result="noise"
              />
              <feComponentTransfer in="noise" result="dots">
                <feFuncR type="discrete" tableValues="0 0 0 1 1" />
                <feFuncG type="discrete" tableValues="0 0 0 1 1" />
                <feFuncB type="discrete" tableValues="0 0 0 1 1" />
              </feComponentTransfer>
              <feColorMatrix type="saturate" values="0" in="dots" result="bw" />
              <feGaussianBlur in="bw" stdDeviation="0.3" result="soft" />
            </filter>

            <filter id="ink-bleed" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.03"
                numOctaves="3"
                seed="8"
                stitchTiles="stitch"
                result="warp"
              />
              <feColorMatrix
                type="saturate"
                values="0"
                in="warp"
                result="mono"
              />
            </filter>

            <filter id="crosshatch" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.4 1.2"
                numOctaves="2"
                seed="12"
                stitchTiles="stitch"
                result="lines"
              />
              <feColorMatrix
                type="saturate"
                values="0"
                in="lines"
                result="mono"
              />
            </filter>

            <filter id="speckle" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="3.5"
                numOctaves="1"
                seed="42"
                stitchTiles="stitch"
                result="noise"
              />
              <feComponentTransfer in="noise" result="specks">
                <feFuncR type="discrete" tableValues="0 0 0 0 0 0 1" />
                <feFuncG type="discrete" tableValues="0 0 0 0 0 0 1" />
                <feFuncB type="discrete" tableValues="0 0 0 0 0 0 1" />
              </feComponentTransfer>
              <feColorMatrix type="saturate" values="0" in="specks" result="bw" />
            </filter>
          </defs>
        </svg>

        {/* Paper grain — reduced to avoid gray wash */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-[0.07]"
          style={{ filter: "url(#paper-grain)" }}
        />

        {/* Halftone dots */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-[0.08]"
          style={{ filter: "url(#halftone-dots)" }}
        />

        {/* Ink bleed */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-[0.05]"
          style={{ filter: "url(#ink-bleed)" }}
        />

        {/* Crosshatch / linen weave */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-[0.04]"
          style={{ filter: "url(#crosshatch)" }}
        />

        {/* Speckle / dust */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-[0.05]"
          style={{ filter: "url(#speckle)" }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.06) 100%)",
          }}
        />

        {/* Aged paper tint */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-[0.03]"
          style={{ background: "rgba(180, 160, 120, 1)" }}
        />
      </div>

      {/* Hero — no ripped edges, SVG shows through transparent bg */}
      <div className="relative z-10">
        <ProgressiveTextReveal />
      </div>

      {/* Gap showing the fixed SVG background */}
      <div className="relative z-0 h-10 md:h-14" />

      {/* Torn top of compositions section (white bg) */}
      <RippedEdge seed={7} direction="up" color="white" className="relative z-10 -mt-1" />

      {/* Featured works */}
      <div className="relative z-10">
        <CompositionRack
          onCompositionClick={setSelectedComposition}
          onViewAllClick={() => setIsLibraryOpen(true)}
        />
      </div>

      {/* Torn bottom of compositions (white bg) */}
      <RippedEdge seed={2} direction="down" color="white" className="relative z-10 -mb-1" />

      {/* Gap showing the fixed SVG background */}
      <div className="relative z-0 h-10 md:h-14" />

      {/* Torn top of book section (neutral-100 = #f5f5f5) */}
      <RippedEdge seed={8} direction="up" color="#f5f5f5" className="relative z-10 -mt-1" />

      {/* Book / letter — Lili Boulanger */}
      <div className="relative z-10">
        <BookSection />
      </div>

      {/* Torn bottom of book section (neutral-100 = #f5f5f5) */}
      <RippedEdge seed={3} direction="down" color="#f5f5f5" className="relative z-10 -mb-1" />

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
      <footer className="relative z-10 border-t-8 border-double border-white bg-black px-4 py-8 text-center text-white">
        <p className="font-serif text-lg">© 2026 Hachem H.</p>
      </footer>
    </div>
  );
}
