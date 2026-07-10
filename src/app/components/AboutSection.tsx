import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { Youtube, Instagram } from "lucide-react";
import { ProfilePortrait } from "./ProfilePortrait";
import { SectionHeading } from "./SectionHeading";
import { DropCap } from "./DropCap";
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
    <section className="relative bg-[var(--c-151414)] px-4 py-14 sm:py-28">
      <div className="max-w-5xl mx-auto">
        <div>
          <SectionHeading
            index="01"
            dept={t.about.dept}
            title={t.about.headline}
            deck={t.about.deck}
            byline={t.about.byline}
          />

          {/* Two-column layout on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">

            {/* Left — portrait figure + timeline (the agate column) */}
            <div className="relative">
              <figure className="mb-8">
                <p className="np-kicker text-[9px] text-[var(--c-8a8071)] mb-2">Fig.&nbsp;1</p>
                <ProfilePortrait className="w-full max-w-[220px]" />
              </figure>
              <div className="np-rule mb-5" />
              <p className="np-kicker text-[var(--c-8a8071)] mb-6">
                {t.about.timeline}
              </p>
              <ol ref={timelineRef} className="relative space-y-0">
                {/* Rail track + ink fill driven by scroll */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--c-2f2c28)]" aria-hidden />
                <motion.div
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-px bg-[var(--c-eee8dd)] origin-top"
                  style={{ scaleY: reduceMotion ? 1 : railScale }}
                />
                {milestoneAges.map((age, i) => (
                  <li
                    key={i}
                    className="relative pl-6 pb-8 last:pb-0"
                  >
                    <span className="absolute -left-[4.5px] top-[5px] w-2 h-2 rounded-full bg-[var(--c-eee8dd)] border-2 border-[var(--c-161413)] ring-1 ring-[var(--c-eee8dd)]" />
                    <p className="text-[11px] tracking-widest uppercase text-[var(--c-5e564f)] mb-1"
                       style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                      {t.about.ageLabel(age)}
                    </p>
                    <p className="text-sm font-serif text-[var(--c-c2b9ab)] leading-relaxed">
                      {t.about.milestones[i]}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right — the lead article, set in tight justified columns */}
            <div className="np-body text-[13.5px] leading-[1.55] text-[var(--c-cbc2b0)]">
              <p className="np-kicker text-[var(--c-8a8071)] mb-5">By&nbsp;Hachem</p>

              <div className="np-columns np-columns-lg3 np-justify [&>p]:mb-3.5">
                <p><DropCap text={t.about.bio1} /></p>
                <p>{t.about.bio2}</p>
                <p>{t.about.bio3}</p>
                <blockquote className="np-pullquote np-colspan-all">
                  {t.about.bio2.split(/(?<=[.!?])\s/)[0]}
                </blockquote>
                <p>{t.about.bio5}</p>
                <p>{t.about.bio6}</p>
                <p className="np-endmark">
                  {t.about.bio4Pre}
                  <span className="italic">{t.about.bio4Project}</span>
                  {t.about.bio4Post}
                </p>
              </div>

              {/* Social links */}
              <div className="mt-8 flex items-center gap-5 border-t border-[var(--c-2f2c28)] pt-5">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[var(--c-5e564f)] hover:text-[var(--c-eee8dd)] transition-colors duration-150"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs tracking-widest uppercase"
                          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Jump line to the next department */}
              <button
                onClick={() =>
                  document
                    .querySelector("#works")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="np-kicker mt-6 block text-[var(--c-8a8071)] transition-colors hover:text-[var(--c-e6e0d5)]"
              >
                No.&nbsp;02 · {t.rack.dept} →
              </button>
            </div>

          </div>

          {/* Recognition strip */}
          <div className="mt-10 sm:mt-16 border-t border-[var(--c-201e1c)] pt-8 sm:pt-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--c-5e564f)] mb-6 text-center"
               style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
              {t.about.recognition}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
              {t.about.accolades.map((a, i) => (
                <div key={i} className="text-center">
                  <p className="font-serif font-bold text-sm text-[var(--c-dfd6c7)]">{a.title}</p>
                  <p className="text-xs text-[var(--c-5e564f)] mt-0.5"
                     style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
