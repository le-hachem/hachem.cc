import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { AnimatedCipher } from "./AnimatedCipher";
import { playCipher } from "./EasterEggs";
import { useLanguage } from "../i18n/LanguageContext";

/** Roman numeral for the running volume number. */
function roman(n: number): string {
  const map: [string, number][] = [["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
  let out = "";
  for (const [sym, val] of map) while (n >= val) { out += sym; n -= val; }
  return out || "I";
}

export function ProgressiveTextReveal() {
  const { t, lang } = useLanguage();

  // Live dateline, set in the reader's language — the way a paper carries the
  // day's date across the top of the front page.
  const dateline = new Date()
    .toLocaleDateString(
      lang === "fr" ? "fr-FR" : lang === "de" ? "de-DE" : "en-GB",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    )
    .replace(/^\w/, (c) => c.toUpperCase());
  const [cipherDone, setCipherDone]   = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showScroll, setShowScroll]   = useState(false);
  const [showNotes, setShowNotes]     = useState(false);
  const notesTimer = useRef<number | null>(null);

  // The edition number climbs each time you visit — a fresh printing every
  // time you come back — and you can also advance it by clicking the folio.
  const [edition, setEdition] = useState(1);
  useEffect(() => {
    try {
      const n = (parseInt(localStorage.getItem("hh-edition") || "0", 10) || 0) + 1;
      localStorage.setItem("hh-edition", String(n));
      setEdition(n);
    } catch {
      /* localStorage unavailable */
    }
  }, []);
  const bumpEdition = () =>
    setEdition((e) => {
      const n = e + 1;
      try {
        localStorage.setItem("hh-edition", String(n));
      } catch {
        /* ignore */
      }
      return n;
    });
  const vol = Math.floor((edition - 1) / 12) + 1;
  const no = ((edition - 1) % 12) + 1;

  // Parallax: the hero recedes and fades as it scrolls away
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 0.985]);

  // Reveal the subtitle then the scroll cue — but never block scrolling, so
  // the page feels live immediately instead of frozen during the intro.
  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 800);
    const t2 = setTimeout(() => setShowScroll(true), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden bg-[var(--c-121110)]">
      {/*
       * Isolated stage. `isolation: isolate` keeps the cipher's difference
       * blend contained here, so it inverts the photograph behind it (and
       * nothing else on the page). The whole stage parallaxes away on scroll.
       */}
      <motion.div
        className="relative h-full w-full overflow-hidden"
        style={{
          isolation: "isolate",
          ...(reduceMotion
            ? {}
            : { y: heroY, opacity: heroOpacity, scale: heroScale }),
        }}
      >
        {/* Cathedral organ photograph */}
        <img
          src="/hero-cathedral.jpg"
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover object-center"
        />

        {/* Vignette + a long bottom dissolve that resolves to the bio
            section's exact tone (#151414), so the photo melts into the page
            below with no visible seam. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(125% 95% at 50% 40%, rgba(18,17,16,0) 42%, rgba(18,17,16,0.32) 80%, rgba(18,17,16,0.82) 100%), linear-gradient(to bottom, rgba(18,17,16,0.25) 0%, rgba(18,17,16,0) 30%, rgba(18,17,16,0) 52%, rgba(18,17,16,0.7) 80%, var(--c-121110) 96%)",
          }}
        />

        {/* Readability plate: a soft dark band across the masthead. The cipher
            blends in `difference`, so a calmer, darker backdrop here makes the
            notation invert to an even cream instead of muddy mid-tones — and it
            quiets the halftone dots competing with the thin staff lines. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 6%, rgba(8,7,6,0.62) 26%, rgba(8,7,6,0.66) 50%, rgba(8,7,6,0.62) 74%, transparent 94%)",
          }}
        />

        {/* Front-page masthead */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[95vw] sm:w-[88vw] md:w-[80vw] max-w-5xl"
            style={{ textShadow: "0 1px 18px rgba(0,0,0,0.85)" }}
          >
            {/* Heavy masthead rule — fixed cream (sits over the dark photo). */}
            <div style={{ borderTop: "2px solid rgba(230,224,213,0.85)" }} />

            {/* Nameplate — the engraved cipher. Click to hear the motif;
                right-click to read its notes. */}
            <div
              className="relative flex cursor-pointer justify-center py-3 sm:py-4"
              onClick={playCipher}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowNotes(true);
                if (notesTimer.current) window.clearTimeout(notesTimer.current);
                notesTimer.current = window.setTimeout(
                  () => setShowNotes(false),
                  2800
                );
              }}
              role="button"
              tabIndex={0}
              aria-label="Play the cipher"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  playCipher();
                }
              }}
            >
              <AnimatedCipher
                invert
                className="w-full select-none"
                onDone={() => setCipherDone(true)}
              />
              <motion.span
                aria-hidden
                initial={false}
                animate={{ opacity: showNotes ? 1 : 0, y: showNotes ? 0 : 4 }}
                transition={{ duration: 0.25 }}
                className="np-kicker pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#0c0a08]/85 px-3 py-1 text-[10px] text-[#e6e0d5]"
              >
                H · A · C · H · E · B♮ · G · D
              </motion.span>
            </div>

            {/* Folio line: edition · running head · dateline */}
            <div style={{ borderTop: "1px solid rgba(230,224,213,0.42)" }} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showSubtitle || cipherDone ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              className="np-kicker flex flex-col items-center gap-1 py-2 text-center text-[#cbc2b0] sm:grid sm:grid-cols-3 sm:items-center sm:gap-3"
            >
              <span
                role="button"
                tabIndex={0}
                onClick={bumpEdition}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    bumpEdition();
                  }
                }}
                title="Next edition"
                className="hidden cursor-pointer justify-self-start whitespace-nowrap transition-colors hover:text-[#e6e0d5] sm:inline"
              >
                Vol.&nbsp;{roman(vol)} · No.&nbsp;{no}
              </span>
              <span className="np-smallcaps hidden justify-self-center whitespace-nowrap tracking-[0.14em] text-[#e6e0d5] sm:block">
                {t.masthead}
              </span>
              <span className="justify-self-end sm:whitespace-nowrap sm:text-right">{dateline}</span>
            </motion.div>
            <div style={{ borderTop: "2px solid rgba(230,224,213,0.85)" }} />

            {/* Motto / standfirst */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: showSubtitle || cipherDone ? 1 : 0,
                y: showSubtitle || cipherDone ? 0 : 6,
              }}
              transition={{ duration: 0.7 }}
              className="np-kicker mt-4 text-center text-[#dad1bf]"
            >
              {t.hero.subtitle}
            </motion.p>
          </div>
        </div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span
          className="text-[9px] tracking-[0.35em] uppercase text-[#b2ab9c]"
          style={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            textShadow: "0 1px 10px rgba(0,0,0,0.85)",
          }}
        >
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#b2ab9c]">
            <path d="M1 3.5L6 8.5L11 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
