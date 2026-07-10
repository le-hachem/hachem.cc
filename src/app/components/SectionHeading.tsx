import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Broadsheet section header, written like a news story: a heavy+thin rule, a
 * kicker row ("No. 03 — Restoration" on the left, the running masthead on the
 * right), a left-aligned headline, an italic standfirst (deck) and a byline —
 * so each section reads as its own article in the paper.
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
      <motion.div
        className="np-rule-double"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.6, 0, 0.2, 1] }}
      />
      <div className="flex items-center justify-between gap-3 py-2">
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
      </div>
      <motion.div
        className="np-rule"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.6, 0, 0.2, 1] }}
      />

      <h2 className="np-head mt-5 sm:mt-6 text-4xl sm:text-6xl font-black tracking-tight leading-[1.02] text-[var(--c-e6e0d5)] [text-wrap:balance] [overflow-wrap:break-word]">
        {title}
      </h2>

      {deck && (
        <p className="np-body mt-4 max-w-3xl text-lg sm:text-xl italic text-[var(--c-b5ab98)]">
          {deck}
        </p>
      )}

      {byline && (
        <p className="np-kicker mt-4 text-[var(--c-8a8071)]">{byline}</p>
      )}
    </div>
  );
}
