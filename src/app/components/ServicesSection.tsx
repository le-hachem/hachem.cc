import { motion, useReducedMotion } from "motion/react";
import { commissionsOpen } from "./CommissionsSection";
import { SectionHeading } from "./SectionHeading";
import { DropCap } from "./DropCap";
import { useLanguage } from "../i18n/LanguageContext";
import { hideDispatches } from "../i18n/dispatches";

/** A drawn path: a plain stroke, or a solid (filled) shape like a black key. */
type IconPath = string | { d: string; fill?: boolean };

/** Stroke-drawn icons that sketch themselves in on scroll. */
function DrawnIcon({ paths, viewBox = "0 0 48 48" }: { paths: IconPath[]; viewBox?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox={viewBox}
      fill="none"
      className="w-8 h-8 text-[var(--c-cbc2b0)]"
      initial={reduceMotion ? undefined : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {paths.map((p, i) => {
        const d = typeof p === "string" ? p : p.d;
        const filled = typeof p !== "string" && p.fill;
        return (
          <motion.path
            key={i}
            d={d}
            stroke={filled ? "none" : "currentColor"}
            fill={filled ? "currentColor" : "none"}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.7, delay: 0.15 + i * 0.18, ease: "easeInOut" },
              },
            }}
          />
        );
      })}
    </motion.svg>
  );
}

/** Icons align by index with t.services.items. */
const serviceIcons: React.ReactNode[] = [
  <DrawnIcon
    paths={[
      // Quill
      "M36 6 Q28 12 24 20 Q21 26 23 30 L26 27 Q24 22 28 16 Q31 11 36 6Z",
      "M36 6 Q38 14 34 22 Q31 27 26 30",
      "M24 30 L14 40",
      "M14 40 L10 44 L12 40Z",
      // Ink line
      "M16 44 Q26 42 38 44",
    ]}
  />,
  <DrawnIcon
    paths={[
      // Page
      "M10 4 L32 4 L38 10 L38 44 L10 44 Z",
      "M32 4 L32 10 L38 10",
      // Staff lines
      "M15 18 L33 18",
      "M15 24 L33 24",
      "M15 30 L33 30",
      // Note
      "M26 24 L26 15 M26 24 A2.6 2 -18 1 1 25.9 23.9",
    ]}
  />,
  <DrawnIcon
    paths={[
      // Conductor's baton over fanned staves
      "M8 40 Q24 34 44 38",
      "M8 32 Q24 24 44 28",
      "M8 24 Q24 14 44 18",
      "M14 36 L34 8",
      "M34 8 L37 5",
    ]}
  />,
  <DrawnIcon
    paths={[
      // Keybed
      "M6 16 L42 16 L42 39 L6 39 Z",
      // White-key dividers (seven keys)
      "M11.1 16 L11.1 39 M16.3 16 L16.3 39 M21.4 16 L21.4 39 M26.6 16 L26.6 39 M31.7 16 L31.7 39 M36.9 16 L36.9 39",
      // Solid black keys — group of two, then group of three
      { d: "M9.6 16 L12.6 16 L12.6 28 L9.6 28 Z", fill: true },
      { d: "M14.8 16 L17.8 16 L17.8 28 L14.8 28 Z", fill: true },
      { d: "M25.1 16 L28.1 16 L28.1 28 L25.1 28 Z", fill: true },
      { d: "M30.2 16 L33.2 16 L33.2 28 L30.2 28 Z", fill: true },
      { d: "M35.4 16 L38.4 16 L38.4 28 L35.4 28 Z", fill: true },
      // A small eighth note above the keyboard
      "M28 13 A2 2 0 1 1 24 13 A2 2 0 1 1 28 13",
      "M28 13 L28 5",
      "M28 5 Q31 6 31 9",
    ]}
  />,
];

export function ServicesSection() {
  const { t } = useLanguage();
  const services = t.services.items.map((item, i) => ({
    ...item,
    icon: serviceIcons[i],
    badge: i === 0 ? (commissionsOpen ? t.services.badgeOpen : t.services.badgeClosed) : undefined,
  }));

  return (
    <section className={`relative px-4 py-20 sm:py-28 ${hideDispatches ? "bg-[var(--c-151414)]" : "bg-[var(--c-1a1816)]"}`}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          index={hideDispatches ? "05" : "06"}
          dept={t.services.dept}
          title={t.services.headline}
          deck={t.services.deck}
          byline={t.services.byline}
        />

        {/* Article lede */}
        <div className="np-body np-justify mx-auto mb-14 max-w-3xl text-[14px] leading-[1.62] text-[var(--c-cbc2b0)]">
          <p><DropCap text={t.services.lede} /></p>
        </div>

        {/* Notices — ruled columns, no boxes */}
        <div className="grid sm:grid-cols-2 sm:gap-x-12 border-t-2 border-[var(--np-rule-strong)]">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-40px" }}
              className="border-b border-[var(--np-rule)] py-7 sm:py-8 sm:[&:nth-last-child(-n+1)]:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
            >
              <div className="flex items-baseline gap-3">
                <span className="np-kicker np-tabular text-[var(--c-8a8071)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="np-head flex-1 text-2xl font-bold leading-tight text-[var(--c-e6e0d5)]">
                  {s.title}
                </h3>
                {s.badge && (
                  <span
                    className={`np-kicker shrink-0 border px-1.5 py-0.5 text-[9px] ${
                      commissionsOpen
                        ? "border-[var(--c-cbc2b0)] text-[var(--c-cbc2b0)]"
                        : "border-[var(--c-443f39)] text-[var(--c-5e564f)]"
                    }`}
                  >
                    {s.badge}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-start gap-4">
                <div className="mt-1 shrink-0">{s.icon}</div>
                <p className="np-body np-justify text-[15px] leading-[1.65] text-[var(--c-bcb3a3)]">
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="font-serif italic text-[var(--c-7b7267)] text-sm sm:text-base">
            {t.services.ctaPre}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="underline decoration-[var(--c-443f39)] underline-offset-4 transition-colors hover:text-[var(--c-eee8dd)] hover:decoration-[var(--c-eee8dd)]"
            >
              {t.services.ctaLink}
            </a>
            {t.services.ctaPost}
          </p>
        </motion.div>

        <div className="np-head mt-12 text-center text-xl tracking-[0.6em] text-[var(--c-5e564f)]" aria-hidden>
          * * *
        </div>
      </div>
    </section>
  );
}
