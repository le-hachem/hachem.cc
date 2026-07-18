import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Manicule } from "./Ornaments";
import { playTone } from "./EasterEggs";
import { useLanguage } from "../i18n/LanguageContext";
import { hideDispatches } from "../i18n/dispatches";

/** E natural minor, E4 → E5 — the cipher's key, one degree per department. */
const READING_SCALE = [329.63, 369.99, 392.0, 440.0, 493.88, 523.25, 587.33, 659.25];

/**
 * The reading scale: a miniature staff at the foot of the index. Each
 * department is a degree of the scale, and the whole note climbs as the
 * reader moves through the paper — a full octave from Portrait to
 * Correspondance. Click to hear where you are.
 */
function ReadingScale({ activeIdx }: { activeIdx: number }) {
  const idx = Math.max(0, activeIdx);
  return (
    <button
      type="button"
      onClick={() => playTone(READING_SCALE[Math.min(idx, READING_SCALE.length - 1)])}
      aria-label="Play the note of the section being read"
      title="La gamme de lecture — cliquez pour entendre le degré"
      className="group mt-3 w-full cursor-pointer border-t border-[var(--np-rule)] pt-4 pb-1"
    >
      <svg viewBox="0 0 128 62" fill="none" className="w-full text-[var(--c-443f39)] transition-colors group-hover:text-[var(--c-5e564f)]">
        {/* Staff */}
        {[16, 24, 32, 40, 48].map((y) => (
          <line key={y} x1="4" y1={y} x2="118" y2={y} stroke="currentColor" strokeWidth="1" />
        ))}
        {/* Treble clef — engraved outline from Bravura (SIL OFL, Steinberg) */}
        <g transform="translate(8 4) scale(0.92)" className="text-[var(--c-5e564f)]">
          <path
            fill="currentColor"
            d="M12.0 22.7C12.0 22.3 12.0 22.3 12.2 22.1C15.7 18.9 18.3 14.8 18.3 9.9C18.3 7.1 17.5 4.4 16.2 2.5C15.7 1.8 14.9 0.9 14.6 0.9C14.1 0.9 13.1 1.7 12.5 2.4C10.1 5.0 9.3 9.0 9.3 12.4C9.3 14.2 9.6 16.3 9.8 17.6C9.9 18.0 9.9 18.0 9.5 18.4C4.9 22.2 0.0 26.8 0.0 33.2C0.0 38.8 3.8 44.1 11.6 44.1C12.4 44.1 13.2 44.0 13.9 43.9C14.2 43.8 14.3 43.8 14.3 44.2C14.7 46.3 15.2 49.1 15.2 50.6C15.2 55.3 12.0 55.9 10.1 55.9C8.4 55.9 7.6 55.4 7.6 55.0C7.6 54.8 7.8 54.7 8.6 54.4C9.6 54.1 10.7 53.3 10.7 51.4C10.7 49.7 9.6 48.2 7.6 48.2C5.5 48.2 4.2 49.9 4.2 51.8C4.2 53.9 5.5 57.1 10.3 57.1C12.4 57.1 16.6 56.1 16.6 50.7C16.6 48.8 16.0 45.8 15.7 43.8C15.6 43.4 15.6 43.5 16.1 43.3C19.3 42.0 21.5 39.3 21.5 35.6C21.5 31.6 18.5 27.9 13.8 27.9C12.9 27.9 12.9 27.9 12.8 27.4ZM15.0 5.8C16.1 5.8 17.0 6.7 17.0 8.4C17.0 12.0 13.9 14.9 11.4 17.1C11.2 17.3 11.0 17.2 11.0 16.8C10.8 16.0 10.8 14.9 10.8 13.9C10.8 8.9 13.1 5.8 15.0 5.8ZM11.6 27.6C11.6 28.2 11.6 28.2 11.1 28.4C8.3 29.3 6.4 31.9 6.4 34.6C6.4 37.5 7.9 39.5 10.1 40.3C10.4 40.4 10.8 40.4 11.0 40.4C11.2 40.4 11.4 40.3 11.4 40.1C11.4 39.9 11.1 39.8 10.9 39.7C9.5 39.1 8.6 37.7 8.6 36.3C8.6 34.4 9.8 33.1 11.8 32.5C12.3 32.4 12.4 32.4 12.4 32.8L14.0 42.3C14.1 42.7 14.0 42.7 13.6 42.8C13.1 42.8 12.4 42.9 11.8 42.9C6.2 42.9 2.6 39.8 2.6 35.4C2.6 33.5 2.9 30.9 5.5 27.9C7.5 25.8 8.9 24.6 10.4 23.4C10.8 23.1 10.8 23.2 10.9 23.5ZM13.8 32.7C13.7 32.3 13.7 32.2 14.1 32.3C16.7 32.5 18.8 34.7 18.8 37.5C18.8 39.5 17.6 41.1 15.8 42.0C15.5 42.2 15.4 42.2 15.3 41.8Z"
          />
        </g>
        {/* The reader's note — it climbs one degree per department, sprung so
            it lands with the small bounce of a note set on the line. */}
        <motion.g
          initial={false}
          animate={{ y: -4 * idx }}
          transition={{ type: "spring", stiffness: 210, damping: 17, mass: 0.6 }}
        >
          <ellipse
            cx="96"
            cy="48"
            rx="5.2"
            ry="3.8"
            transform="rotate(-14 96 48)"
            stroke="var(--c-cbc2b0)"
            strokeWidth="1.5"
          />
        </motion.g>
      </svg>
    </button>
  );
}

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

      {/* The reading scale — one degree per department. */}
      <ReadingScale activeIdx={index.findIndex((it) => it.href === active)} />

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
