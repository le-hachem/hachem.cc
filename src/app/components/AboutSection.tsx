import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { Youtube, Instagram } from "lucide-react";
import { ProfilePortrait } from "./ProfilePortrait";
import { useLanguage } from "../i18n/LanguageContext";

/** Ages/years align by index with t.about.milestones. */
const milestoneAges = ["4", "6", "13", "17", "2026"];

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@hachem.mp3",
    icon: Youtube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hachem.mp3/",
    icon: Instagram,
  },
];

export function AboutSection() {
  const { t } = useLanguage();
  // The timeline's rail fills with ink as the reader scrolls through it
  const timelineRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.45"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  return (
    <section className="relative bg-white px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="mb-10 sm:mb-14 text-center">
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
              {t.about.title}
            </h2>
            <div className="mx-auto mt-4 h-px w-12 bg-black" />
          </div>

          {/* Two-column layout on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">

            {/* Left — timeline */}
            <div className="relative">
              <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-6"
                 style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                {t.about.timeline}
              </p>
              <ol ref={timelineRef} className="relative space-y-0">
                {/* Rail track + ink fill driven by scroll */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200" aria-hidden />
                <motion.div
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-px bg-neutral-900 origin-top"
                  style={{ scaleY: reduceMotion ? 1 : railScale }}
                />
                {milestoneAges.map((age, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    viewport={{ once: true }}
                    className="relative pl-6 pb-8 last:pb-0"
                  >
                    <span className="absolute -left-[4.5px] top-[5px] w-2 h-2 rounded-full bg-black border-2 border-white ring-1 ring-black" />
                    <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-1"
                       style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                      {t.about.ageLabel(age)}
                    </p>
                    <p className="text-sm font-serif text-neutral-700 leading-relaxed">
                      {t.about.milestones[i]}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Right — prose with inset portrait */}
            <div className="font-serif text-base sm:text-lg leading-relaxed text-neutral-800 space-y-6">
              <ProfilePortrait className="float-right w-36 sm:w-44 ml-5 sm:ml-6 mb-2 !mt-1" />
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
              <p>{t.about.bio3}</p>
              <p>
                {t.about.bio4Pre}
                <span className="italic">{t.about.bio4Project}</span>
                {t.about.bio4Post}
              </p>

              {/* Social links */}
              <div className="clear-both flex items-center gap-5 pt-2">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-black transition-colors duration-150"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs tracking-widest uppercase"
                          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Recognition strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-16 border-t border-neutral-100 pt-8 sm:pt-10"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-6 text-center"
               style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
              {t.about.recognition}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
              {t.about.accolades.map((a, i) => (
                <div key={i} className="text-center">
                  <p className="font-serif font-bold text-sm text-neutral-800">{a.title}</p>
                  <p className="text-xs text-neutral-400 mt-0.5"
                     style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
