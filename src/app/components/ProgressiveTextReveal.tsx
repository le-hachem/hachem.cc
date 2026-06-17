import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { AnimatedCipher } from "./AnimatedCipher";
import { AmbientNotes } from "./AmbientNotes";
import { useLanguage } from "../i18n/LanguageContext";

export function ProgressiveTextReveal() {
  const { t } = useLanguage();
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
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  // Block scrolling until the intro is mostly complete
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setShowSubtitle(true), 1500);
    const t2 = setTimeout(() => {
      document.body.style.overflow = "";
    }, 1700);
    const t3 = setTimeout(() => setShowScroll(true), 2300);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative bg-transparent">
      {/* Faint drifting notes behind the cipher */}
      <AmbientNotes />

      <div className="flex h-screen items-center justify-center">
        <motion.div
          className="relative z-10 text-center px-8"
          style={
            reduceMotion
              ? undefined
              : { y: heroY, opacity: heroOpacity, scale: heroScale }
          }
        >

          {/* Top rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 w-12 h-px bg-black origin-center"
          />

          {/* Musical cipher — writes itself in, stroke by stroke */}
          <div className="flex justify-center">
            <AnimatedCipher
              className="w-[95vw] sm:w-[85vw] md:w-[75vw] max-w-5xl select-none"
              onDone={() => setCipherDone(true)}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: showSubtitle || cipherDone ? 1 : 0,
              y: showSubtitle || cipherDone ? 0 : 6,
            }}
            transition={{ duration: 0.7 }}
            className="-mt-2 text-xs sm:text-sm tracking-[0.45em] uppercase text-neutral-500"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Bottom rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showSubtitle || cipherDone ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 w-12 h-px bg-black origin-center"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span
          className="text-[9px] tracking-[0.35em] uppercase text-neutral-400"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
        >
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-neutral-400">
            <path d="M1 3.5L6 8.5L11 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
