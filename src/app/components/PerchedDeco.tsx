import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Idle = "bob" | "flutter" | "sway" | "none";

const idleAnimations: Record<Exclude<Idle, "none">, {
  animate: Record<string, number[]>;
  transition: { duration: number; repeat: number; ease: string; repeatDelay?: number };
}> = {
  bob: {
    animate: { y: [0, -1.5, 0] },
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
  flutter: {
    animate: { y: [0, -3, 0, -2, 0], rotate: [0, -4, 0, 3, 0] },
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 },
  },
  sway: {
    animate: { rotate: [0, 1.6, 0, -1.6, 0] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

/**
 * Positions a whimsical silhouette (cat, bird, butterfly…) so it perches on a
 * card edge, fading in on scroll with a gentle idle animation afterwards.
 *
 * Parent must be `relative`; pass positioning via `className`
 * (e.g. "absolute -top-7 right-6 w-10 h-8").
 */
export function PerchedDeco({
  children,
  className = "",
  idle = "bob",
  delay = 0.4,
}: {
  children: ReactNode;
  className?: string;
  idle?: Idle;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const idleProps =
    idle === "none" || reduceMotion ? {} : idleAnimations[idle];

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-40px" }}
      className={`pointer-events-none text-[#c2b9ab] ${className}`}
    >
      <motion.div
        className="w-full h-full"
        animate={"animate" in idleProps ? idleProps.animate : undefined}
        transition={"transition" in idleProps ? idleProps.transition : undefined}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
