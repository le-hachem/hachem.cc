import { motion, useReducedMotion } from "motion/react";

/** Single eighth note glyph */
function NoteGlyph({ flag = true }: { flag?: boolean }) {
  return (
    <svg viewBox="0 0 24 36" fill="currentColor" className="w-full h-full">
      <ellipse cx="8" cy="30" rx="5.5" ry="4" transform="rotate(-18 8 30)" />
      <rect x="12.6" y="6" width="1.6" height="24" rx="0.8" />
      {flag && (
        <path
          d="M14.2 6 Q20 9 20 15 Q20 18 18 20 Q20 15 14.2 11Z"
          opacity="0.9"
        />
      )}
    </svg>
  );
}

/** Pair of beamed eighth notes */
function BeamedNotes() {
  return (
    <svg viewBox="0 0 36 32" fill="currentColor" className="w-full h-full">
      <ellipse cx="7" cy="26" rx="5" ry="3.6" transform="rotate(-18 7 26)" />
      <ellipse cx="27" cy="23" rx="5" ry="3.6" transform="rotate(-18 27 23)" />
      <rect x="11.2" y="5" width="1.5" height="21" rx="0.75" />
      <rect x="31.2" y="2" width="1.5" height="21" rx="0.75" />
      <path d="M11.2 5 L32.7 2 L32.7 6.5 L11.2 9.5Z" />
    </svg>
  );
}

interface FloatingNote {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  variant: "note" | "noteNoFlag" | "beamed";
}

const NOTES: FloatingNote[] = [
  { left: "8%",  top: "18%", size: 22, duration: 11, delay: 0,   drift: -10, variant: "note" },
  { left: "16%", top: "64%", size: 16, duration: 13, delay: 2.5, drift: 8,   variant: "beamed" },
  { left: "28%", top: "30%", size: 14, duration: 15, delay: 1,   drift: -6,  variant: "noteNoFlag" },
  { left: "72%", top: "22%", size: 18, duration: 12, delay: 3,   drift: 9,   variant: "beamed" },
  { left: "84%", top: "58%", size: 22, duration: 14, delay: 0.8, drift: -12, variant: "note" },
  { left: "91%", top: "32%", size: 14, duration: 16, delay: 4,   drift: 6,   variant: "noteNoFlag" },
  { left: "60%", top: "74%", size: 16, duration: 13, delay: 1.8, drift: -8,  variant: "note" },
  { left: "40%", top: "80%", size: 13, duration: 17, delay: 5,   drift: 10,  variant: "beamed" },
];

/**
 * Very faint musical notes drifting slowly in the hero background.
 * Decorative only; disabled when the user prefers reduced motion.
 */
export function AmbientNotes() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none text-neutral-900"
    >
      {NOTES.map((n, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: n.left, top: n.top, width: n.size, height: n.size * 1.4 }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.07, 0.07, 0],
            y: [12, -26],
            x: [0, n.drift],
            rotate: [0, n.drift > 0 ? 6 : -6],
          }}
          transition={{
            duration: n.duration,
            delay: n.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
            times: [0, 0.25, 0.75, 1],
          }}
        >
          {n.variant === "beamed" ? (
            <BeamedNotes />
          ) : (
            <NoteGlyph flag={n.variant === "note"} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
