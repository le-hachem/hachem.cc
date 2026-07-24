import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode, type RefObject } from "react";

/**
 * Scroll-scrubbed motion, built on the paper's own metaphor: every section is a
 * fresh sheet laid over the one before. Where `Reveal` plays an entrance once,
 * these primitives tie motion continuously to scroll position — the cinematic,
 * "Apple product page" register — while still bowing out entirely for readers
 * who ask for reduced motion.
 */

/** House ease, shared with the press animations in Reveal. */
export const PRESS_EASE = [0.6, 0, 0.2, 1] as const;

/**
 * A plain section shell. This once carried a scroll-scrubbed "recede" (the
 * sheet shrinking toward the centre of the page as it passed), but that has
 * been removed — sections now simply sit still. Kept as a thin wrapper so the
 * section shells in App.tsx need no change; `intensity` and `exit` are accepted
 * for compatibility but ignored.
 */
export function Sheet({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  intensity?: number;
  exit?: boolean;
}) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}

/**
 * A single depth layer: drifts vertically (and optionally fades) across its own
 * pass through the viewport, at a rate set by `from`/`to`. Compose several at
 * different rates to build parallax depth. Plain passthrough under reduced
 * motion.
 */
export function Parallax({
  children,
  className = "",
  from = 0,
  to = -60,
  fade = false,
  /** Where in the element's viewport pass the drift is measured. */
  offset = ["start end", "end start"] as const,
}: {
  children: ReactNode;
  className?: string;
  /** Vertical offset (px) at the start of the pass. */
  from?: number;
  /** Vertical offset (px) at the end of the pass. */
  to?: number;
  /** Fade out toward the end of the pass. */
  fade?: boolean;
  offset?: readonly [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // motion's typings want a tuple of edge strings; ours is validated above.
    offset: offset as unknown as ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  const opacity = useTransform(scrollYProgress, [0.55, 1], [1, 0]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, ...(fade ? { opacity } : {}), willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Small helper: a spring-smoothed 0→1 progress for an element's pass through
 * the viewport, for callers that want to drive their own transforms (e.g. the
 * developing portrait in the restoration section).
 */
export function useScrubProgress(
  ref: RefObject<HTMLElement>,
  offset: readonly [string, string] = ["start 0.8", "end 0.35"],
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as unknown as ["start end", "end start"],
  });
  return useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.6 });
}
