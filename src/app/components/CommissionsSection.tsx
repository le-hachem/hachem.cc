import { motion, useReducedMotion } from "motion/react";
import { Mail, Hourglass } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { DropCap } from "./DropCap";
import { Reveal, RuleReveal } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { hideDispatches } from "../i18n/dispatches";

/** Single source of truth for commission availability (set in .env). */
export const commissionsOpen =
  import.meta.env.VITE_COMMISSIONS_OPEN === "true";

/** The office's rubber stamp: it comes down onto the page as it scrolls into
 *  view — oversized and airborne, then pressed flat with a spring. */
function StatusSeal() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="inline-flex items-center gap-3 border border-[var(--c-eee8dd)] px-5 py-2.5"
      style={{ outline: "1px solid var(--c-eee8dd)", outlineOffset: "2.5px" }}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, scale: 1.5, rotate: -7 }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, rotate: -1.5 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 320, damping: 19, mass: 0.9 }}
    >
      {commissionsOpen ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--c-eee8dd)] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--c-eee8dd)]" />
          </span>
          <span
            className="text-xs tracking-[0.3em] uppercase text-[var(--c-eee8dd)]"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {t.commissions.sealOpen}
          </span>
        </>
      ) : (
        <>
          <Hourglass className="h-3 w-3 text-[var(--c-7b7267)]" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-[var(--c-7b7267)]"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {t.commissions.sealClosed}
          </span>
        </>
      )}
    </motion.div>
  );
}

export function CommissionsSection() {
  const { t } = useLanguage();
  const steps = t.commissions.steps;
  return (
    <section className={`relative px-4 py-14 sm:py-28 ${hideDispatches ? "bg-[var(--c-1a1816)]" : "bg-[var(--c-151414)]"}`}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          index={hideDispatches ? "06" : "07"}
          dept={t.commissions.dept}
          title={t.commissions.headline}
          deck={t.commissions.deck}
          byline={t.commissions.byline}
          className="!mb-6 sm:!mb-8"
        />
        <div className="mb-8 sm:mb-16 text-center">
          <StatusSeal />
        </div>

        {/* State-dependent lede */}
        <Reveal className="np-body np-justify mx-auto max-w-3xl text-[14px] leading-[1.62] text-[var(--c-cbc2b0)]">
          {commissionsOpen ? (
            <p className="np-opener"><DropCap text={t.commissions.ledeOpen} /></p>
          ) : (
            <p className="np-opener"><DropCap text={t.commissions.ledeClosed} /></p>
          )}
        </Reveal>

        {/* Process — numbered notices */}
        <RuleReveal className="mt-10 sm:mt-16 border-t-2 border-[var(--np-rule-strong)]" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-10">
          {steps.map((s, i) => (
            <Reveal
              as="article"
              key={s.title}
              index={i}
              amount={0.15}
              className="border-b border-[var(--np-rule)] py-6 sm:py-7"
            >
              <p className="np-head np-tabular text-3xl font-black leading-none text-[var(--c-5e564f)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="np-head mt-3 text-xl font-bold text-[var(--c-e6e0d5)]">
                {s.title}
              </h3>
              <p className="np-body np-justify mt-3 text-[15px] leading-[1.6] text-[var(--c-bcb3a3)]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="mt-10 sm:mt-12 text-center" y={10}>
          {commissionsOpen ? (
            <a
              href="mailto:contact@hachem.cc?subject=Commission%20inquiry"
              className="inline-flex items-center gap-2 border border-[var(--c-eee8dd)] bg-[var(--c-eee8dd)] text-[var(--c-161413)] px-5 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-[var(--c-dfd6c7)] active:bg-[var(--c-c2b9ab)]"
              style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
            >
              <Mail className="h-3.5 w-3.5" />
              {t.commissions.ctaOpen}
            </a>
          ) : (
            <a
              href="mailto:contact@hachem.cc?subject=Future%20commission%20inquiry"
              className="np-btn inline-flex items-center gap-2 border border-[var(--c-5e564f)] bg-[var(--c-161413)] text-[var(--c-a1998a)] px-5 py-2.5 text-xs tracking-widest uppercase"
              style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
            >
              <Mail className="h-3.5 w-3.5" />
              {t.commissions.ctaClosed}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
