import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** The house ease — same curve the section rules already draw with. */
export const PRESS_EASE = [0.6, 0, 0.2, 1] as const;

const TAGS = {
  div: motion.div,
  p: motion.p,
  li: motion.li,
  article: motion.article,
  figure: motion.figure,
  span: motion.span,
  footer: motion.footer,
} as const;

type RevealTag = keyof typeof TAGS;

/**
 * The paper's standard entrance: a block of copy settles onto the page —
 * a short rise while the ink fades in. `index` staggers siblings the way
 * successive lines come off the press. Falls back to a plain fade when the
 * reader prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  index = 0,
  y = 14,
  amount = 0.25,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  /** Base delay in seconds. */
  delay?: number;
  /** Position among siblings; adds a small per-item stagger (capped). */
  index?: number;
  /** Rise distance in px. */
  y?: number;
  /** How much of the element must be visible before it reveals. */
  amount?: number;
} & Record<string, unknown>) {
  const reduce = useReducedMotion();
  const Tag = TAGS[as];
  const totalDelay = delay + Math.min(index * 0.07, 0.42);
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.65, delay: totalDelay, ease: PRESS_EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline entrance: the line is wiped on left-to-right, as if coming off the
 * press. Negative vertical outsets keep ascenders/descenders unclipped while
 * the wipe runs. Reduced motion gets a plain fade.
 */
export function InkReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { clipPath: "inset(-15% 100% -15% 0)", opacity: 0.001 }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { clipPath: "inset(-15% 0% -15% 0)", opacity: 1 }
      }
      viewport={{ once: true, amount: 0.4, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.9, delay, ease: PRESS_EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A rule that draws itself across the measure, origin left — extracted so
 * every ruled line in the paper draws with the same gesture.
 */
export function RuleReveal({
  className,
  delay = 0,
  duration = 0.7,
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: PRESS_EASE }}
    />
  );
}
