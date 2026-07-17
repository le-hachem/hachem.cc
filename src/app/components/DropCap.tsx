import { motion, useReducedMotion } from "motion/react";

/**
 * An ornamental initial: the first character is split off the text and set as
 * a drop cap, the way a newspaper opens a column. The letter inks in as it
 * scrolls into view — a soft blot that dries into a sharp glyph.
 */
export function DropCap({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <>
      <motion.span
        className="np-dropcap-letter"
        initial={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, filter: "blur(5px)", scale: 1.12 }
        }
        whileInView={
          reduce
            ? { opacity: 1 }
            : { opacity: 1, filter: "blur(0px)", scale: 1 }
        }
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.8, ease: [0.6, 0, 0.2, 1] }}
      >
        {text.charAt(0)}
      </motion.span>
      {text.slice(1)}
    </>
  );
}
