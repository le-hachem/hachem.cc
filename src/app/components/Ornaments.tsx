import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { PRESS_EASE } from "./Reveal";

/**
 * Engraved print furniture — the small typographic devices a fine broadsheet
 * sets between and around its columns: a calligraphic fleuron, ruled section
 * ends, plate corner-marks on figures, and an index manicule.
 */

/** A symmetric calligraphic fleuron: centre diamond with four tendrils. */
export function Fleuron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 16" fill="none" className={className} aria-hidden>
      {/* Centre diamond */}
      <path d="M28 3 L32 8 L28 13 L24 8 Z" fill="currentColor" />
      {/* Tendrils, mirrored — each an S-curve ending in a seed dot */}
      <path d="M24 8 C 19 8, 15.5 5.4, 11.5 3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10.4" cy="3.2" r="1.5" fill="currentColor" />
      <path d="M24 8 C 19 8, 15.5 10.6, 11.5 12.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10.4" cy="12.8" r="1.5" fill="currentColor" />
      <path d="M32 8 C 37 8, 40.5 5.4, 44.5 3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="45.6" cy="3.2" r="1.5" fill="currentColor" />
      <path d="M32 8 C 37 8, 40.5 10.6, 44.5 12.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="45.6" cy="12.8" r="1.5" fill="currentColor" />
      {/* Terminal dots on the axis */}
      <circle cx="3.6" cy="8" r="1.2" fill="currentColor" />
      <circle cx="52.4" cy="8" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * End-of-section mark: hairlines draw outward from a fleuron that surfaces in
 * the middle — replaces the plain asterisk dinkus.
 */
export function SectionEnd({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={`flex items-center justify-center gap-5 ${className}`}
      aria-hidden
    >
      <motion.span
        className="h-px w-16 sm:w-28 bg-[var(--np-rule)]"
        style={{ transformOrigin: "right" }}
        initial={reduce ? undefined : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.25, ease: PRESS_EASE }}
      />
      <motion.span
        className="shrink-0"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: PRESS_EASE }}
      >
        <Fleuron className="w-14 text-[var(--c-9a927f)]" />
      </motion.span>
      <motion.span
        className="h-px w-16 sm:w-28 bg-[var(--np-rule)]"
        style={{ transformOrigin: "left" }}
        initial={reduce ? undefined : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.25, ease: PRESS_EASE }}
      />
    </div>
  );
}

/**
 * Plate corner-marks: four engraved corners just outside a figure's frame,
 * the way plates were registered on the stone. Parent must be `relative`.
 */
export function PlateCorners({ offset = 5 }: { offset?: number }) {
  const arm = "absolute h-3 w-3 border-[var(--c-7b7267)]";
  const o = `-${offset}px`;
  return (
    <div aria-hidden className="pointer-events-none absolute" style={{ inset: o }}>
      <span className={`${arm} left-0 top-0 border-l border-t`} />
      <span className={`${arm} right-0 top-0 border-r border-t`} />
      <span className={`${arm} bottom-0 left-0 border-b border-l`} />
      <span className={`${arm} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

/**
 * Printer's registration marks — the ⌖ crosshairs pressmen use to align the
 * plates, set faintly at the corners of the printable area (xl only).
 */
export function RegistrationMarks() {
  const mark = (pos: string) => (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`absolute h-3.5 w-3.5 text-[var(--c-5e564f)] opacity-45 ${pos}`}
    >
      <circle cx="10" cy="10" r="5.5" />
      <path d="M10 0 V20 M0 10 H20" />
    </svg>
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[40] hidden xl:block">
      {mark("left-[calc(var(--rail-w)+12px)] top-[calc(var(--masthead-h)+12px)]")}
      {mark("right-[12px] top-[calc(var(--masthead-h)+12px)]")}
      {mark("left-[calc(var(--rail-w)+12px)] bottom-[12px]")}
      {mark("right-[12px] bottom-[12px]")}
    </div>
  );
}

/**
 * The pressman's thumbprint — an inky whorl left on the colophon, the one
 * human smudge on an otherwise clean sheet.
 */
export function Thumbprint({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      {/* Outer ridges */}
      <path d="M20 45 C10.5 43.5 5.5 36 5.5 26 C5.5 14.5 11.5 5.5 20 5.5 C28.5 5.5 34.5 14.5 34.5 26 C34.5 32 33 37.5 30 41" />
      <path d="M20 41.5 C13 40 9 34 9 26 C9 16.5 13.5 9 20 9 C26.5 9 31 16.5 31 26 C31 31 30 35.5 27.5 38.5" />
      <path d="M19 38 C14.5 36.5 12.5 32 12.5 26 C12.5 18.5 15.5 12.5 20 12.5 C24.5 12.5 27.5 18.5 27.5 26 C27.5 30 26.8 33.5 25 36" />
      {/* Inner whorl, broken like a real ridge */}
      <path d="M17.5 33.5 C15.8 31.5 15.8 28 16 25 C16.3 20.5 17.5 16 20 16 C22.8 16 24.2 20 24.2 25 C24.2 28.4 23.6 31.4 22.2 33.2" />
      <path d="M19.5 29.5 C19.1 27.5 19.2 24.5 19.6 22.4 C19.9 20.9 20.5 19.8 21 20.4 C21.7 21.3 21.6 25.4 21 28.2" />
      {/* Ridge breaks */}
      <path d="M11 20 C12 18 13 16.4 14.4 15.2" opacity="0.55" />
      <path d="M28.6 34.6 C29.6 33 30.2 31.2 30.5 29.2" opacity="0.55" />
    </svg>
  );
}

/**
 * The sort — a single piece of metal type, the letter H, turning slowly in
 * space. The glyph is cast mirror-wise on its face, as real type is; the
 * groove on its flank is the nick a compositor reads by touch. Click it to
 * hear the letter's note (H = B natural, in the German manner).
 */
export function TypeSort({
  size = 46,
  className = "",
  onPlay,
}: {
  size?: number;
  className?: string;
  onPlay?: () => void;
}) {
  const half = size / 2;
  const face = (transform: string, extra = "", children?: ReactNode) => (
    <div className={`sort-face ${extra}`} style={{ transform }}>
      {children}
    </div>
  );
  const glyphCls =
    "np-head font-black select-none text-[var(--c-cbc2b0)]";
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label="A piece of metal type — the letter H. Click to hear its note."
      title="La casse du compositeur — H"
      className={`sort-scene cursor-pointer bg-transparent ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="sort-cube">
        {/* Face: the glyph, reversed as cast */}
        {face(`translateZ(${half}px)`, "", (
          <span className={glyphCls} style={{ fontSize: size * 0.62, transform: "scaleX(-1)" }}>
            H
          </span>
        ))}
        {/* Back: the foot of the sort */}
        {face(`rotateY(180deg) translateZ(${half}px)`)}
        {/* Flanks — one carries the nick */}
        {face(`rotateY(90deg) translateZ(${half}px)`, "sort-face--nick")}
        {face(`rotateY(-90deg) translateZ(${half}px)`)}
        {face(`rotateX(90deg) translateZ(${half}px)`)}
        {face(`rotateX(-90deg) translateZ(${half}px)`)}
      </div>
    </button>
  );
}

/**
 * A coffee ring — the mark of a mug set down on the diary page while the
 * dates were checked. Two broken rings and a couple of drips.
 */
export function CoffeeRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden>
      {/* The heavy inner ring, broken where the mug lifted */}
      <circle
        cx="60" cy="60" r="42"
        stroke="currentColor" strokeWidth="6.5" strokeLinecap="round"
        strokeDasharray="150 22 52 14 26 10" opacity="0.55"
      />
      {/* A thinner halo where the spill spread */}
      <circle
        cx="60" cy="60" r="49"
        stroke="currentColor" strokeWidth="1.6"
        strokeDasharray="120 34 70 26" opacity="0.35"
      />
      {/* Drips */}
      <circle cx="103" cy="74" r="2.6" fill="currentColor" opacity="0.3" />
      <circle cx="20" cy="43" r="1.8" fill="currentColor" opacity="0.25" />
      <circle cx="94" cy="96" r="1.4" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

/** A small index manicule — the printer's pointing hand. */
export function Manicule({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 14" className={className} aria-hidden>
      {/* Cuff */}
      <path d="M1 3 h3.2 v8 H1 Z" fill="currentColor" />
      {/* Palm */}
      <path
        d="M5.2 3.6 C6.4 2.6 8.6 2.2 10.6 2.6 L12.4 3 C13.6 3.3 14.4 4 14.6 5 L14.8 6.6 C14.9 8.4 14.2 9.8 12.6 10.4 C10.4 11.2 7.6 11.1 5.8 10.2 L5.2 9.8 Z"
        fill="currentColor"
      />
      {/* Pointing finger */}
      <path
        d="M12.5 5.1 L23.6 5.1 C24.5 5.1 25 5.7 25 6.4 C25 7.1 24.5 7.7 23.6 7.7 L12.5 7.7 Z"
        fill="currentColor"
      />
      {/* Thumb resting on top */}
      <path d="M6.8 3.4 C7.4 1.6 9.6 1.2 10.8 2.4 L11.2 3.2 C9.8 2.8 8.2 3 6.8 3.4 Z" fill="currentColor" />
    </svg>
  );
}
