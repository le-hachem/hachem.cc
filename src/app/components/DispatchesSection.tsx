import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";
import { getDispatches, type Dispatch } from "../i18n/dispatches";

const localeFor = (lang: string) =>
  lang === "fr" ? "fr-FR" : lang === "de" ? "de-DE" : "en-GB";

function formatDate(d: Dispatch, lang: string) {
  const date = new Date(d.date + "T12:00:00");
  const locale = localeFor(lang);
  return d.monthOnly
    ? date.toLocaleDateString(locale, { month: "long", year: "numeric" })
    : date.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

/** A single dated bulletin, set like a newspaper brief. */
function Brief({
  d,
  lang,
  readMore,
}: {
  d: Dispatch;
  lang: string;
  readMore: string;
}) {
  return (
    <article className="border-t border-[var(--np-rule)] py-7 first:border-t-0 sm:py-8">
      <p className="np-kicker np-smallcaps text-[var(--c-8a8071)]">
        <time dateTime={d.date}>{formatDate(d, lang)}</time>
      </p>
      <h3 className="np-head mt-2 text-2xl font-bold leading-tight text-[var(--c-e6e0d5)] sm:text-3xl [text-wrap:balance]">
        {d.headline}
      </h3>
      <p className="np-body np-justify mt-3 text-[15px] leading-[1.62] text-[var(--c-bcb3a3)]">
        {d.body}
      </p>
      {d.href && (
        <a
          href={d.href}
          target="_blank"
          rel="noopener noreferrer"
          className="np-kicker mt-3 inline-flex items-center gap-1.5 text-[var(--c-9a927f)] transition-colors hover:text-[var(--c-e6e0d5)]"
        >
          {d.linkLabel ?? readMore}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      )}
    </article>
  );
}

export function DispatchesSection() {
  const { t, lang } = useLanguage();
  const dispatches = getDispatches(lang);

  return (
    <section className="relative bg-[var(--c-1a1816)] px-4 py-14 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="04"
          dept={t.dispatches.dept}
          title={t.dispatches.headline}
          deck={t.dispatches.deck}
          byline={t.dispatches.byline}
        />

        {dispatches.length > 0 ? (
          <div className="border-b border-[var(--np-rule)]">
            {dispatches.map((d) => (
              <Brief
                key={d.id}
                d={d}
                lang={lang}
                readMore={t.dispatches.readMore}
              />
            ))}
          </div>
        ) : (
          <p className="np-body border-t border-[var(--np-rule)] py-6 text-[15px] italic text-[var(--c-8a8071)]">
            {t.dispatches.none}
          </p>
        )}
      </div>
    </section>
  );
}
