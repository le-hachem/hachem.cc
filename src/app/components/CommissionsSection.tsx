import { motion } from "motion/react";
import { Mail, Hourglass } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

/** Single source of truth for commission availability (set in .env). */
export const commissionsOpen =
  import.meta.env.VITE_COMMISSIONS_OPEN === "true";

function StatusSeal() {
  const { t } = useLanguage();
  return (
    <div className="inline-flex items-center gap-3 border border-neutral-900 px-5 py-2.5">
      {commissionsOpen ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neutral-900 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-900" />
          </span>
          <span
            className="text-xs tracking-[0.3em] uppercase text-neutral-900"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {t.commissions.sealOpen}
          </span>
        </>
      ) : (
        <>
          <Hourglass className="h-3 w-3 text-neutral-500" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-neutral-500"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
          >
            {t.commissions.sealClosed}
          </span>
        </>
      )}
    </div>
  );
}

export function CommissionsSection() {
  const { t } = useLanguage();
  const steps = t.commissions.steps;
  return (
    <section className="relative bg-neutral-50 px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
            {t.commissions.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-black" />
          <div className="mt-6">
            <StatusSeal />
          </div>
        </motion.div>

        {/* State-dependent lede */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center font-serif text-base sm:text-lg leading-relaxed text-neutral-700"
        >
          {commissionsOpen ? (
            <p>{t.commissions.ledeOpen}</p>
          ) : (
            <p>{t.commissions.ledeClosed}</p>
          )}
        </motion.div>

        {/* Process */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-40px" }}
              className="bg-white p-6 sm:p-8"
            >
              <p
                className="text-[10px] tracking-[0.35em] uppercase text-neutral-400"
                style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-serif font-bold text-base sm:text-lg">
                {s.title}
              </h3>
              <div className="mt-3 h-px w-8 bg-neutral-200" />
              <p className="mt-4 font-serif text-sm leading-relaxed text-neutral-600">
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
          className="mt-10 sm:mt-12 text-center"
        >
          {commissionsOpen ? (
            <a
              href="mailto:contact@hachem.cc?subject=Commission%20inquiry"
              className="inline-flex items-center gap-2 border border-black bg-black text-white px-5 py-2.5 text-xs tracking-widest uppercase transition-colors hover:bg-neutral-800 active:bg-neutral-700"
              style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
            >
              <Mail className="h-3.5 w-3.5" />
              {t.commissions.ctaOpen}
            </a>
          ) : (
            <a
              href="mailto:contact@hachem.cc?subject=Future%20commission%20inquiry"
              className="inline-flex items-center gap-2 border border-neutral-400 bg-white text-neutral-600 px-5 py-2.5 text-xs tracking-widest uppercase transition-colors hover:border-black hover:text-black"
              style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
            >
              <Mail className="h-3.5 w-3.5" />
              {t.commissions.ctaClosed}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
