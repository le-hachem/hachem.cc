import { DropCap } from "./DropCap";
import { useLanguage } from "../i18n/LanguageContext";

function go(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Dot = () => (
  <span className="text-[var(--c-3a352f)]" aria-hidden>
    ·
  </span>
);

/**
 * The front page "above the fold": a cutline for the masthead photograph, a
 * stop-press edition strip, the lead story (the Profile, teased and jumped),
 * and a boxed "In This Issue" index — printed before the sections proper.
 */
export function FrontPage() {
  const { t, lang } = useLanguage();
  const f = t.front;

  const dateline = new Date()
    .toLocaleDateString(
      lang === "fr" ? "fr-FR" : lang === "de" ? "de-DE" : "en-GB",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    )
    .replace(/^\w/, (c) => c.toUpperCase());

  const index = [
    { no: "01", dept: t.about.dept, href: "#about" },
    { no: "02", dept: t.rack.dept, href: "#works" },
    { no: "03", dept: t.book.dept, href: "#projects" },
    { no: "04", dept: t.services.dept, href: "#services" },
    { no: "05", dept: t.commissions.dept, href: "#commissions" },
    { no: "06", dept: t.contact.dept, href: "#contact" },
  ];

  return (
    <section className="relative bg-[var(--c-121110)] px-4 pt-8 pb-16 sm:pt-10">
      <div className="max-w-6xl mx-auto">
        {/* Cutline for the lead photograph above */}
        <div className="np-rule" />
        <p className="np-kicker flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[var(--c-8a8071)]">
          <span className="np-smallcaps text-[var(--c-cbc2b0)]">{f.leadPhoto}</span>
          <Dot />
          <span className="np-body text-[13px] italic text-[var(--c-a59b89)]">{f.cutline}</span>
          <Dot />
          <span className="hero-credit" />
        </p>

        {/* Stop-press / edition strip */}
        <div className="np-rule-strong" />
        <p className="np-kicker flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-[var(--c-8a8071)]">
          <span className="np-smallcaps text-[var(--c-cbc2b0)]">{f.edition}</span>
          <Dot />
          <span>{dateline}</span>
          <Dot />
          <span>{f.place}</span>
          <Dot />
          <span>{f.price}</span>
          <Dot />
          <span className="np-smallcaps hidden text-[var(--c-7b7267)] sm:inline">{t.masthead}</span>
        </p>
        <div className="np-rule-strong" />

        {/* Above the fold: lead story + index box */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_17rem] lg:gap-12">
          <article className="lg:border-r lg:border-[var(--np-rule)] lg:pr-12">
            <p className="np-kicker text-[var(--c-cbc2b0)]">{f.theLead}</p>
            <h1 className="np-head mt-3 text-5xl font-black leading-[0.94] tracking-tight text-[var(--c-f0ead8)] sm:text-7xl [text-wrap:balance] [overflow-wrap:break-word]">
              {t.about.headline}
            </h1>
            <p className="np-body mt-4 text-xl italic text-[var(--c-b5ab98)]">{t.about.deck}</p>
            <p className="np-kicker mt-4 text-[var(--c-8a8071)]">{t.about.byline}</p>

            <div className="np-rule mt-5 mb-5" />

            <p className="np-body np-justify text-[13.5px] leading-[1.6] text-[var(--c-bcb3a3)]"><DropCap text={t.about.bio1} /></p>

            <button
              onClick={() => go("#about")}
              className="np-kicker mt-4 text-[var(--c-cbc2b0)] transition-colors hover:text-[var(--c-e6e0d5)]"
            >
              {f.continued}
            </button>
          </article>

          <aside className="h-fit border border-[var(--np-rule)] p-5">
            <p className="np-kicker np-smallcaps border-b border-[var(--np-rule)] pb-3 text-center text-[var(--c-cbc2b0)]">
              {f.inThisIssue}
            </p>
            <ul className="mt-1">
              {index.map((it) => (
                <li key={it.no}>
                  <button
                    onClick={() => go(it.href)}
                    className="group flex w-full items-baseline justify-between gap-3 border-b border-[var(--np-rule)] py-2.5 text-left last:border-b-0"
                  >
                    <span className="np-kicker text-[var(--c-9a927f)] transition-colors group-hover:text-[var(--c-e6e0d5)]">
                      {it.dept}
                    </span>
                    <span className="np-kicker np-tabular text-[var(--c-5e564f)]">No.&nbsp;{it.no}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="np-rule mt-4 mb-3" />
            <p className="np-body text-[12px] italic text-[var(--c-7b7267)]">{f.motto}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
