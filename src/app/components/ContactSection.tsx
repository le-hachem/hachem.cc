import { motion } from "motion/react";
import { Mail, Coffee } from "lucide-react";
import { PerchedDeco } from "./PerchedDeco";
import { CatStretching } from "./Deco";
import { useLanguage } from "../i18n/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();
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
            {t.contact.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-black" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.04) 31px, rgba(0,0,0,0.04) 32px)",
              backgroundPosition: "0 20px",
            }}
          >
            {/* A cat stretching along the letter's top edge */}
            <PerchedDeco
              className="absolute -top-[26px] right-10 w-12 h-7"
              idle="sway"
              delay={0.6}
            >
              <CatStretching className="w-full h-full" />
            </PerchedDeco>

            {/* Red margin line — only on sm+ where indentation makes sense */}
            <div
              className="absolute top-0 bottom-0 w-px bg-red-200/70 hidden sm:block"
              style={{ left: "60px" }}
            />

            <div className="p-5 sm:p-8 sm:pl-14 md:p-10 md:pl-20 font-serif text-sm sm:text-base leading-relaxed text-neutral-800">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-6 sm:mb-8 text-center"
                 style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                {t.contact.eyebrow}
              </p>

              <p>{t.contact.salutation}</p>

              <p className="mt-5 sm:mt-8">{t.contact.p1}</p>

              <p className="mt-5 sm:mt-8">{t.contact.p2}</p>

              <p className="mt-5 sm:mt-8">{t.contact.p3}</p>

              <div className="mt-5 sm:mt-8 mb-2 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:contact@hachem.cc"
                  className="inline-flex items-center gap-2 border border-black bg-black text-white px-4 py-2.5 sm:px-5 text-sm tracking-wide transition-colors hover:bg-neutral-800 active:bg-neutral-700"
                  style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
                >
                  <Mail className="h-3.5 w-3.5" />
                  contact@hachem.cc
                </a>
              </div>

              <p className="mt-5 sm:mt-8">{t.contact.p4}</p>

              <div className="mt-5 sm:mt-8 mb-2">
                <a
                  href="https://ko-fi.com/hachem_mp3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-black bg-white px-4 py-2.5 sm:px-5 text-sm tracking-wide transition-colors hover:bg-neutral-50 active:bg-neutral-100"
                  style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
                >
                  <Coffee className="h-3.5 w-3.5" />
                  {t.contact.kofi}
                </a>
              </div>

              <p className="mt-10 sm:mt-16">{t.contact.closing}</p>
              <p className="mt-5 sm:mt-8 text-xl sm:text-2xl italic">Hachem H.</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
