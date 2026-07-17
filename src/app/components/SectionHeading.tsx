import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { InkReveal, Reveal, RuleReveal, PRESS_EASE } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Broadsheet section header, written like a news story: a heavy+thin rule, a
 * kicker row ("No. 03 — Restoration" on the left, the running masthead on the
 * right), a left-aligned headline, an italic standfirst (deck) and a byline —
 * so each section reads as its own article in the paper. The whole head sets
 * itself in press order: rules first, then the kicker, the headline wiped on
 * left-to-right, and the standfirst settling last.
 */
export function SectionHeading({
  index,
  title,
  dept,
  deck,
  byline,
  className = "",
}: {
  index: string;
  title: ReactNode;
  dept?: string;
  deck?: string;
  byline?: string;
  className?: string;
}) {
  const { t } = useLanguage();
  // The ghost numeral rides a slower plane than the type: as the heading
  // scrolls through the viewport it drifts a few dozen pixels against the
  // scroll, so the watermark reads as a layer beneath the page.
  const headRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: headRef,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [44, -44]);
  return (
    <div ref={headRef} className={`relative mb-8 sm:mb-14 ${className}`}>
      {/* Ghost folio numeral — the section's number engraved faintly into the
          stock behind the headline, like a plate number on an old print. */}
      <motion.span
        aria-hidden
        className="np-head pointer-events-none absolute -top-4 right-0 select-none text-[6.5rem] font-black leading-none tracking-tight text-[var(--np-ink)] sm:top-[-1.5rem] sm:text-[11rem]"
        style={reduce ? undefined : { y: ghostY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.055 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, delay: 0.2, ease: PRESS_EASE }}
      >
        {index}
      </motion.span>

      <RuleReveal className="np-rule-double" />
      <motion.div
        className="flex items-center justify-between gap-3 py-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.18, ease: PRESS_EASE }}
      >
        <span className="np-kicker">
          <span className="text-[var(--c-8a8071)]">No.&nbsp;{index}</span>
          {dept && (
            <>
              <span className="mx-2 text-[var(--c-3a352f)]" aria-hidden>—</span>
              <span className="np-smallcaps text-[var(--c-cbc2b0)]">{dept}</span>
            </>
          )}
        </span>
        <span className="np-kicker np-smallcaps hidden text-[var(--c-7b7267)] sm:block">
          {t.masthead}
        </span>
      </motion.div>
      <RuleReveal className="np-rule" delay={0.12} duration={0.6} />

      <InkReveal delay={0.15}>
        <h2 className="np-head np-letterpress mt-5 sm:mt-6 text-4xl sm:text-6xl font-black tracking-tight leading-[1.02] text-[var(--c-e6e0d5)] [text-wrap:balance] [overflow-wrap:break-word]">
          {title}
        </h2>
      </InkReveal>

      {deck && (
        <Reveal as="p" delay={0.3} y={10} className="np-body mt-4 max-w-3xl text-lg sm:text-xl italic text-[var(--c-b5ab98)]">
          {deck}
        </Reveal>
      )}

      {byline && (
        <Reveal as="p" delay={0.42} y={8} className="np-kicker mt-4 text-[var(--c-8a8071)]">
          {byline}
        </Reveal>
      )}
    </div>
  );
}
