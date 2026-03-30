import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function ProgressiveTextReveal() {
  const text = "Hi! I am Hachem";
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  // Block scrolling until typing is complete
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Pop in letters one by one — fast
  useEffect(() => {
    if (visibleCount >= text.length) {
      const timeout = setTimeout(() => {
        setDone(true);
        document.body.style.overflow = "";
      }, 250);
      return () => clearTimeout(timeout);
    }

    const delay = 45 + Math.random() * 30;
    const timeout = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, delay);
    return () => clearTimeout(timeout);
  }, [visibleCount, text.length]);

  return (
    <div className="relative bg-transparent">
      <div className="flex h-screen items-center justify-center">
        <div className="relative z-10 mx-2 sm:mx-4 cursor-default border-4 border-black bg-white px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 shadow-2xl">
          <div className="absolute left-2 right-2 top-2 h-1 border-t-2 border-b-2 border-black" />
          <div className="absolute bottom-2 left-2 right-2 h-1 border-t-2 border-b-2 border-black" />

          <div
            className="whitespace-nowrap text-2xl font-medium tracking-wide sm:text-4xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "'23 seconds to midnight', ui-serif, Georgia, serif",
            }}
          >
            {text.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{ visibility: i < visibleCount ? "visible" : "hidden" }}
              >
                {i < visibleCount ? (
                  <motion.span
                    className="inline-block"
                    initial={{ scale: 3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 700,
                      damping: 30,
                      mass: 0.5,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ) : (
                  <span>{char === " " ? "\u00A0" : char}</span>
                )}
              </span>
            ))}
          </div>

          <div className="absolute left-4 top-4 h-6 w-6 border-l-4 border-t-4 border-black" />
          <div className="absolute right-4 top-4 h-6 w-6 border-r-4 border-t-4 border-black" />
          <div className="absolute bottom-4 left-4 h-6 w-6 border-b-4 border-l-4 border-black" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-b-4 border-r-4 border-black" />
        </div>
      </div>
    </div>
  );
}
