import { motion, useReducedMotion } from "motion/react";
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
