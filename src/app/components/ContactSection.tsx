import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "./SectionHeading";
import { DropCap } from "./DropCap";
import { Reveal, PRESS_EASE } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { hideDispatches } from "../i18n/dispatches";

const LINK =
  "underline decoration-[var(--c-5e564f)] underline-offset-2 text-[var(--c-e6e0d5)] transition-colors hover:decoration-[var(--c-e6e0d5)]";

export function ContactSection() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  return (
    <section className={`relative px-4 py-14 sm:py-28 ${hideDispatches ? "bg-[var(--c-151414)]" : "bg-[var(--c-1a1816)]"}`}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          index={hideDispatches ? "07" : "08"}
          dept={t.contact.dept}
          title={t.contact.headline}
          deck={t.contact.deck}
          byline={t.contact.byline}
        />

        <article className="mx-auto max-w-3xl">
          <Reveal amount={0.1} className="np-body np-columns np-justify text-[14px] leading-[1.62] text-[var(--c-cbc2b0)] [&>p]:mb-3.5">
            <p><DropCap text={t.contact.p1} /></p>
            <p>
              {t.contact.p2}
            </p>
            <p>
              {t.contact.p3}{" "}
              <a href="mailto:contact@hachem.cc" className={LINK}>
                contact@hachem.cc
              </a>
            </p>
            <p className="np-endmark">
              {t.contact.p4}{" "}
              <a
                href="https://ko-fi.com/hachem_mp3"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                {t.contact.kofi}
              </a>
            </p>
          </Reveal>

          {/* The sign-off is put to the letter last, the way a hand signs
              after the text is read back. */}
          <motion.p
            className="np-head mt-7 text-2xl italic text-[var(--c-cbc2b0)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.7, delay: 0.35, ease: PRESS_EASE }}
          >
            — Hachem
          </motion.p>
        </article>
      </div>
    </section>
  );
}
