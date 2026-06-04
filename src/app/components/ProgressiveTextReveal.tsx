import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function ProgressiveTextReveal() {
  const [showCipher, setShowCipher]     = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showScroll, setShowScroll]     = useState(false);

  // Block scrolling until intro is complete
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setShowCipher(true),   200);
    const t2 = setTimeout(() => setShowSubtitle(true), 900);
    const t3 = setTimeout(() => {
      document.body.style.overflow = "";
    }, 1100);
    const t4 = setTimeout(() => setShowScroll(true),   1500);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative bg-transparent">
      <div className="flex h-screen items-center justify-center">
        <div className="relative z-10 text-center px-8">

          {/* Top rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 w-12 h-px bg-black origin-center"
          />

          {/* Musical cipher replacing the name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showCipher ? 1 : 0, y: showCipher ? 0 : 10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <img
              src="/hachem-cipher.svg"
              alt="Hachem H."
              className="w-[95vw] sm:w-[85vw] md:w-[75vw] max-w-5xl"
              draggable={false}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 6 }}
            transition={{ duration: 0.7 }}
            className="-mt-2 text-xs sm:text-sm tracking-[0.45em] uppercase text-neutral-500"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            Composer · Pianist · Conductor
          </motion.p>

          {/* Bottom rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showSubtitle ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 w-12 h-px bg-black origin-center"
          />
        </div>
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
          Scroll
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
