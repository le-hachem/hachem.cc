import { DropCap } from "./DropCap";
import { InkReveal, Reveal, RuleReveal } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { hideDispatches } from "../i18n/dispatches";

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
 * The whole page sets itself on arrival: rules draw, the strip appears, the
 * headline is wiped on, and the index rows cascade in like agate lines.
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
    { dept: t.about.dept, href: "#about" },
    { dept: t.rack.dept, href: "#works" },
    { dept: t.agenda.dept, href: "#agenda" },
    ...(hideDispatches ? [] : [{ dept: t.dispatches.dept, href: "#dispatches" }]),
    { dept: t.book.dept, href: "#projects" },
    { dept: t.services.dept, href: "#services" },
    { dept: t.commissions.dept, href: "#commissions" },
    { dept: t.contact.dept, href: "#contact" },
  ].map((it, i) => ({ ...it, no: String(i + 1).padStart(2, "0") }));

  return (
    <section className="relative bg-[var(--c-121110)] px-4 pt-8 pb-12 sm:pt-10 sm:pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Stop-press / edition strip — the cipher masthead now leads above,
            so the page opens straight onto the edition line. */}
        <RuleReveal className="np-rule-strong" />
        <Reveal as="p" delay={0.15} y={6} className="np-kicker flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-[var(--c-8a8071)]">
          <span className="np-smallcaps text-[var(--c-cbc2b0)]">{f.edition}</span>
          <Dot />
          <span>{dateline}</span>
          <Dot />
          <span>{f.place}</span>
          <Dot />
          <span>{f.price}</span>
          <Dot />
          <span className="np-smallcaps hidden text-[var(--c-7b7267)] sm:inline">{t.masthead}</span>
        </Reveal>
        <RuleReveal className="np-rule-strong" delay={0.1} />

        {/* Above the fold: lead story + index box */}
        <div className="mt-6 sm:mt-8 grid gap-8 lg:grid-cols-[1fr_17rem] lg:gap-12 xl:grid-cols-1">
          <article className="lg:border-r lg:border-[var(--np-rule)] lg:pr-12 xl:border-r-0 xl:pr-0">
            <Reveal as="p" delay={0.25} y={6} className="np-kicker text-[var(--c-cbc2b0)]">{f.theLead}</Reveal>
            <InkReveal delay={0.3}>
              <h1 className="np-head mt-3 text-5xl font-black leading-[0.94] tracking-tight text-[var(--c-f0ead8)] sm:text-7xl [text-wrap:balance] [overflow-wrap:break-word]">
                {t.about.headline}
              </h1>
            </InkReveal>
            <Reveal as="p" delay={0.5} y={10} className="np-body mt-4 text-xl italic text-[var(--c-b5ab98)] xl:max-w-3xl">{t.about.deck}</Reveal>
            <Reveal as="p" delay={0.6} y={8} className="np-kicker mt-4 text-[var(--c-8a8071)]">{t.about.byline}</Reveal>

            <RuleReveal className="np-rule mt-5 mb-5 xl:max-w-3xl" delay={0.55} />

            <Reveal delay={0.65} y={12}>
              <p className="np-body np-justify text-[13.5px] leading-[1.6] text-[var(--c-bcb3a3)] xl:max-w-3xl"><DropCap text={t.about.bio1} /></p>

              <button
                onClick={() => go("#about")}
                className="np-kicker np-link-grow mt-4 text-[var(--c-cbc2b0)] transition-colors hover:text-[var(--c-e6e0d5)]"
              >
                {f.continued}
              </button>
            </Reveal>
          </article>

          <Reveal as="div" delay={0.45} y={16} className="h-fit border border-[var(--np-rule)] p-5 xl:hidden">
            <aside>
              <p className="np-kicker np-smallcaps border-b border-[var(--np-rule)] pb-3 text-center text-[var(--c-cbc2b0)]">
                {f.inThisIssue}
              </p>
              <ul className="mt-1">
                {index.map((it, i) => (
                  <Reveal as="li" key={it.no} delay={0.6} index={i} y={8} amount={0}>
                    <button
                      onClick={() => go(it.href)}
                      className="group flex w-full items-baseline justify-between gap-3 border-b border-[var(--np-rule)] py-2.5 text-left last:border-b-0"
                    >
                      <span className="np-kicker text-[var(--c-9a927f)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--c-e6e0d5)]">
                        {it.dept}
                      </span>
                      <span className="np-kicker np-tabular text-[var(--c-5e564f)]">No.&nbsp;{it.no}</span>
                    </button>
                  </Reveal>
                ))}
              </ul>
              <div className="np-rule mt-4 mb-3" />
              <p className="np-body text-[12px] italic text-[var(--c-7b7267)]">{f.motto}</p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
