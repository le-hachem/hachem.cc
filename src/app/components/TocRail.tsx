import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Manicule } from "./Ornaments";
import { useLanguage } from "../i18n/LanguageContext";
import { hideDispatches } from "../i18n/dispatches";

function go(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@hachem.mp3" },
  { label: "Instagram", href: "https://www.instagram.com/hachem.mp3/" },
  { label: "Ko-fi", href: "https://ko-fi.com/hachem_mp3" },
];

/**
 * Fixed left rail (xl+): the paper's running table of contents. It carries the
 * "In This Issue" index down the side of every page and lights the section the
 * reader is currently in (a scroll-spy over the section anchors), so the index
 * doubles as the primary navigation now that the top bar is a pure nameplate.
 */
export function TocRail() {
  const { t } = useLanguage();

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

  const [active, setActive] = useState<string>(index[0].href);

  // Scroll-spy: mark the section crossing the upper third of the viewport as
  // current. The asymmetric rootMargin makes a section "active" a little before
  // its heading reaches the top, so the rail leads the reader rather than lags.
  useEffect(() => {
    const targets = index
      .map((it) => document.querySelector(it.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.1, 0.5, 1] }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // Rebuild when the index changes (language / dispatches visibility).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  return (
    <nav
      aria-label={t.front?.inThisIssue ?? "In this issue"}
      className="fixed left-0 top-[var(--masthead-h)] bottom-0 z-[800] hidden w-[var(--rail-w)] flex-col border-r border-[var(--seam-strong)] bg-[var(--c-121110)] px-7 py-8 shadow-[18px_0_38px_-28px_rgba(0,0,0,0.55)] xl:flex"
    >
      <p className="np-kicker np-smallcaps border-b border-[var(--np-rule)] pb-3 text-[var(--c-cbc2b0)]">
        {t.front?.inThisIssue ?? "In This Issue"}
      </p>

      <ul className="mt-1 flex-1 overflow-y-auto">
        {index.map((it) => {
          const current = active === it.href;
          return (
            <li key={it.no}>
              <button
                onClick={() => go(it.href)}
                aria-current={current ? "true" : undefined}
                className="group flex w-full items-baseline gap-3 border-b border-[var(--np-rule)] py-3 text-left last:border-b-0"
              >
                {/* The printer's manicule points out the section being read;
                    the line indents to make room for it, like an index mark. */}
                <motion.span
                  aria-hidden
                  className="self-center overflow-hidden"
                  initial={false}
                  animate={{
                    width: current ? 18 : 0,
                    opacity: current ? 1 : 0,
                    // A collapsed span still costs one flex gap — swallow it.
                    marginRight: current ? 0 : -12,
                  }}
                  transition={{ duration: 0.35, ease: [0.6, 0, 0.2, 1] }}
                >
                  <Manicule className="w-[15px] text-[var(--c-cbc2b0)]" />
                </motion.span>
                <span
                  className={`np-kicker np-tabular text-[9px] transition-colors ${
                    current ? "text-[var(--c-e6e0d5)]" : "text-[var(--c-5e564f)]"
                  }`}
                >
                  {it.no}
                </span>
                <span
                  className={`np-kicker relative transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--c-e6e0d5)] ${
                    current ? "text-[var(--c-e6e0d5)]" : "text-[var(--c-9a927f)]"
                  }`}
                >
                  {it.dept}
                  {/* Ruled underscore marks the section in view. */}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1 left-0 h-px bg-[var(--c-e6e0d5)] transition-all duration-300 ${
                      current ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Foot of the rail — the paper's imprint. */}
      <div className="mt-4 border-t border-[var(--np-rule)] pt-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="np-kicker np-link-grow text-[9px] text-[var(--c-7b7267)] transition-colors hover:text-[var(--c-e6e0d5)]"
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="np-body mt-3 text-[11px] italic leading-snug text-[var(--c-7b7267)]">
          {t.front?.motto}
        </p>
      </div>
    </nav>
  );
}
