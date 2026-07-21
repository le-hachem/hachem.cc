import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Ticket, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal, PRESS_EASE } from "./Reveal";
import { CoffeeRing } from "./Ornaments";
import { MaintenanceNotice } from "./MaintenanceNotice";
import { useLanguage } from "../i18n/LanguageContext";
import { getConcerts, showPastConcerts, type Concert } from "../i18n/concerts";

const localeFor = (lang: string) =>
  lang === "fr" ? "fr-FR" : lang === "de" ? "de-DE" : "en-GB";

/** Give the main item prominence while keeping the rest of a programme compact. */
function Programme({
  title,
  children,
}: {
  title?: string;
  children: string;
}) {
  const works = children
    .split(/\s*;\s*/)
    .map((work) => work.trim())
    .filter(Boolean);
  const headline = title ?? works[0];
  const repertoire = title ? works : works.slice(1);

  return (
    <>
      <h3 className="np-head text-xl font-bold leading-snug text-[var(--c-e6e0d5)]">
        {headline}
      </h3>
      {repertoire.length > 0 && (
        <p className="np-body mt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-[14px] leading-snug text-[var(--c-bcb3a3)]">
          {repertoire.map((work, index) => (
            <span key={`${index}-${work}`} className="inline-flex items-center gap-2.5">
              {index > 0 && (
                <span className="h-px w-3 bg-[var(--c-5e564f)]" aria-hidden />
              )}
              {work}
            </span>
          ))}
        </p>
      )}
    </>
  );
}

/** A single diary entry, laid out as a ruled broadsheet listing row. */
function ConcertRow({
  c,
  lang,
  upcoming,
  index = 0,
}: {
  c: Concert;
  lang: string;
  upcoming: boolean;
  index?: number;
}) {
  const { t } = useLanguage();
  const d = new Date(c.date + "T12:00:00");
  const locale = localeFor(lang);
  const day = d.toLocaleDateString(locale, { day: "numeric" });
  const monthShort = d
    .toLocaleDateString(locale, { month: "short" })
    .replace(".", "");
  const monthLong = d.toLocaleDateString(locale, { month: "long" });
  const year = d.getFullYear();

  return (
    <Reveal as="article" index={index} amount={0.1} className="np-row grid grid-cols-[4.5rem_1fr] items-baseline gap-x-5 gap-y-1.5 py-5 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-7">
      {/* Date */}
      <time
        dateTime={c.date}
        className="np-tabular leading-none text-[var(--c-cbc2b0)]"
      >
        {c.monthOnly ? (
          <span className="np-head block text-lg font-bold text-[var(--c-e6e0d5)]">
            {monthLong}
            <span className="block text-[var(--c-8a8071)]">{year}</span>
          </span>
        ) : (
          <span className="flex items-baseline gap-1.5">
            <span className="np-head text-3xl font-black text-[var(--c-e6e0d5)]">
              {day}
            </span>
            <span className="flex flex-col text-[11px] uppercase tracking-wide text-[var(--c-8a8071)]">
              <span>{monthShort}</span>
              <span>{year}</span>
            </span>
          </span>
        )}
      </time>

      {/* Programme + place */}
      <div className="min-w-0">
        <Programme title={c.title}>{c.program}</Programme>
        <p className="np-kicker mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--c-9a927f)]">
          {c.venue && (
            <>
              <span className="np-smallcaps text-[var(--c-b5ab98)]">
                {c.venue}
              </span>
              <span className="text-[var(--c-3a352f)]" aria-hidden>
                ·
              </span>
            </>
          )}
          <span>{c.city}</span>
          <span className="text-[var(--c-3a352f)]" aria-hidden>
            ·
          </span>
          <span>{t.agenda.roles[c.role]}</span>
        </p>
        {c.note && (
          <p className="np-kicker mt-2 inline-block border border-[var(--np-rule)] px-2 py-0.5 text-[10px] text-[var(--c-cbc2b0)]">
            {c.note}
          </p>
        )}
      </div>

      {/* Tickets — only meaningful for a date still to come */}
      <div className="col-start-2 sm:col-start-3 sm:self-center sm:text-right">
        {upcoming && c.ticketUrl && (
          <a
            href={c.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="np-btn np-kicker inline-flex items-center gap-1.5 border border-[var(--c-5e564f)] px-3 py-2 text-[var(--c-cbc2b0)]"
          >
            <Ticket className="h-3.5 w-3.5" />
            {t.agenda.tickets}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </Reveal>
  );
}

/** A ruled sub-heading ("Upcoming" / "Past") between the entry groups. */
function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 mb-1 flex items-center gap-4 first:mt-0">
      <motion.span
        className="np-kicker np-smallcaps whitespace-nowrap text-[var(--c-8a8071)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: PRESS_EASE }}
      >
        {children}
      </motion.span>
      <motion.span
        className="h-px flex-1 bg-[var(--np-rule)] origin-left"
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: PRESS_EASE }}
      />
    </div>
  );
}

export function ConcertsSection() {
  const { t, lang } = useLanguage();
  const concerts = getConcerts(lang);

  // Split by today, so events move from "Upcoming" to "Past" on their own.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = (c: Concert) => new Date(c.date + "T23:59:59") < today;

  const upcoming = concerts
    .filter((c) => !isPast(c))
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = concerts
    .filter(isPast)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="relative overflow-hidden bg-[var(--c-151414)] px-4 py-14 sm:py-28">
      {/* A mug was set down on the diary while the dates were checked. */}
      <CoffeeRing className="pointer-events-none absolute -right-8 bottom-24 hidden w-36 rotate-[14deg] text-[var(--c-7b7267)] opacity-[0.13] sm:block lg:right-[6%]" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="03"
          dept={t.agenda.dept}
          title={t.agenda.headline}
          deck={t.agenda.deck}
          byline={t.agenda.byline}
        />

        <GroupLabel>{t.agenda.upcoming}</GroupLabel>
        {upcoming.length > 0 ? (
          upcoming.map((c, i) => (
            <ConcertRow key={c.id} c={c} lang={lang} upcoming index={i} />
          ))
        ) : (
          <Reveal as="p" className="np-body border-t border-[var(--np-rule)] py-6 text-[15px] italic leading-[1.6] text-[var(--c-8a8071)]">
            {t.agenda.none}
          </Reveal>
        )}

        {past.length > 0 && (
          <>
            <GroupLabel>{t.agenda.past}</GroupLabel>
            {showPastConcerts ? (
              past.map((c, i) => (
                <ConcertRow
                  key={c.id}
                  c={c}
                  lang={lang}
                  upcoming={false}
                  index={i}
                />
              ))
            ) : (
              <MaintenanceNotice
                kicker={t.agenda.pastHiddenKicker}
                line1={t.agenda.pastHiddenLine1}
                line2={t.agenda.pastHiddenLine2}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
