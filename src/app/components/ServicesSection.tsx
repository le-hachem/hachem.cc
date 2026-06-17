import { motion, useReducedMotion } from "motion/react";
import { commissionsOpen } from "./CommissionsSection";
import { useLanguage } from "../i18n/LanguageContext";

/** Stroke-drawn icons that sketch themselves in on scroll. */
function DrawnIcon({ paths, viewBox = "0 0 48 48" }: { paths: string[]; viewBox?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox={viewBox}
      fill="none"
      className="w-10 h-10 text-neutral-800"
      initial={reduceMotion ? undefined : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
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
      ))}
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
      // Piano keys
      "M6 16 L42 16 L42 38 L6 38 Z",
      "M15 16 L15 38 M24 16 L24 38 M33 16 L33 38",
      "M12 16 L12 28 L18 28 L18 16",
      "M30 16 L30 28 L36 28 L36 16",
      // Floating note
      "M24 10 L24 4 Q28 5 30 3",
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
    <section className="relative bg-white px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
            {t.services.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-black" />
          <p
            className="mt-4 text-xs tracking-[0.4em] uppercase text-neutral-500"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-40px" }}
              className="group bg-white p-8 sm:p-10 transition-colors duration-300 hover:bg-neutral-50"
            >
              <div className="mb-5 transition-transform duration-300 group-hover:-translate-y-0.5">
                {s.icon}
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl flex items-center gap-2.5">
                {s.title}
                {s.badge && (
                  <span
                    className={`text-[9px] tracking-[0.25em] uppercase border px-1.5 py-0.5 translate-y-px ${
                      commissionsOpen
                        ? "border-neutral-900 text-neutral-900"
                        : "border-neutral-300 text-neutral-400"
                    }`}
                    style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
                  >
                    {s.badge}
                  </span>
                )}
              </h3>
              <div className="mt-3 h-px w-8 bg-neutral-200 transition-all duration-300 group-hover:w-12 group-hover:bg-neutral-400" />
              <p className="mt-4 font-serif text-sm sm:text-base leading-relaxed text-neutral-600">
                {s.body}
              </p>
            </motion.div>
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
          <p className="font-serif italic text-neutral-500 text-sm sm:text-base">
            {t.services.ctaPre}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-black hover:decoration-black"
            >
              {t.services.ctaLink}
            </a>
            {t.services.ctaPost}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
