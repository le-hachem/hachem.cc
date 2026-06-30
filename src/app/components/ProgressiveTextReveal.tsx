import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { AnimatedCipher } from "./AnimatedCipher";
import { MASTHEAD } from "./SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";

export function ProgressiveTextReveal() {
  const { t, lang } = useLanguage();

  // Live dateline, set in the reader's language — the way a paper carries the
  // day's date across the top of the front page.
  const dateline = new Date()
    .toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/^\w/, (c) => c.toUpperCase());
  const [cipherDone, setCipherDone]   = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showScroll, setShowScroll]   = useState(false);

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
    <div ref={heroRef} className="relative h-screen overflow-hidden bg-[#121110]">
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
              "radial-gradient(125% 95% at 50% 40%, rgba(18,17,16,0) 42%, rgba(18,17,16,0.32) 80%, rgba(18,17,16,0.82) 100%), linear-gradient(to bottom, rgba(18,17,16,0.25) 0%, rgba(18,17,16,0) 30%, rgba(18,17,16,0) 52%, rgba(18,17,16,0.7) 80%, #121110 96%)",
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
            {/* Heavy masthead rule */}
            <div className="np-rule-strong" />

            {/* Nameplate — the engraved cipher */}
            <div className="flex justify-center py-3 sm:py-4">
              <AnimatedCipher
                invert
                className="w-full select-none"
                onDone={() => setCipherDone(true)}
              />
            </div>

            {/* Folio line: edition · running head · dateline */}
            <div className="np-rule" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showSubtitle || cipherDone ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              className="np-kicker grid grid-cols-3 items-center gap-3 py-2 text-[#cbc2b0]"
            >
              <span className="justify-self-start whitespace-nowrap">Vol.&nbsp;I · No.&nbsp;1</span>
              <span className="np-smallcaps hidden justify-self-center whitespace-nowrap text-center tracking-[0.14em] text-[#e6e0d5] sm:block">
                {MASTHEAD}
              </span>
              <span className="justify-self-end whitespace-nowrap text-right">{dateline}</span>
            </motion.div>
            <div className="np-rule-strong" />

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
