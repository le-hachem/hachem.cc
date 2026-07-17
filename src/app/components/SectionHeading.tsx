import { motion } from "motion/react";
import type { ReactNode } from "react";
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
  return (
    <div className={`mb-8 sm:mb-14 ${className}`}>
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
        <h2 className="np-head mt-5 sm:mt-6 text-4xl sm:text-6xl font-black tracking-tight leading-[1.02] text-[var(--c-e6e0d5)] [text-wrap:balance] [overflow-wrap:break-word]">
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
