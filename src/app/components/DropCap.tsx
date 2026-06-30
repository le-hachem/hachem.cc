import { motion } from "motion/react";

/**
 * An ornamental initial that inks in (fades + settles) when the paragraph
 * scrolls into view. Splits the first character off the text so it can be
 * animated independently of the body copy.
 */
export function DropCap({ text }: { text: string }) {
  return (
    <>
      <motion.span
        className="np-dropcap-letter"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {text.charAt(0)}
      </motion.span>
      {text.slice(1)}
    </>
  );
}
