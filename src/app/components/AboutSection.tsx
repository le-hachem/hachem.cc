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
import { Reveal } from "./Reveal";
import { PlateCorners } from "./Ornaments";
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
              <Reveal as="figure" className="mb-8" y={16}>
                <p className="np-kicker text-[9px] text-[var(--c-8a8071)] mb-2">Fig.&nbsp;1</p>
                <div className="relative w-full max-w-[220px]">
                  <PlateCorners />
                  <ProfilePortrait className="w-full" />
                </div>
              </Reveal>
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
                  <Reveal
                    as="li"
                    key={i}
                    index={i}
                    y={10}
                    amount={0.3}
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
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* Right — the lead article, set in tight justified columns */}
            <div className="np-body text-[13.5px] leading-[1.55] text-[var(--c-cbc2b0)]">
              <Reveal as="p" y={8} className="np-kicker text-[var(--c-8a8071)] mb-5">By&nbsp;Hachem</Reveal>

              <Reveal className="np-columns np-columns-lg3 np-justify [&>p]:mb-3.5" amount={0.08}>
                <p className="np-opener"><DropCap text={t.about.bio1} /></p>
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
              </Reveal>

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
                className="np-kicker np-link-grow mt-6 inline-block text-[var(--c-8a8071)] transition-colors hover:text-[var(--c-e6e0d5)]"
              >
                No.&nbsp;02 · {t.rack.dept} →
              </button>
            </div>

          </div>

          {/* Recognition strip */}
          <div className="mt-10 sm:mt-16 border-t border-[var(--c-201e1c)] pt-8 sm:pt-10">
            <Reveal as="p" y={6} className="text-[10px] tracking-[0.4em] uppercase text-[var(--c-5e564f)] mb-6 text-center"
               style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
              {t.about.recognition}
            </Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
              {t.about.accolades.map((a, i) => (
                <Reveal key={i} index={i} y={10} className="text-center">
                  <p className="font-serif font-bold text-sm text-[var(--c-dfd6c7)]">{a.title}</p>
                  <p className="text-xs text-[var(--c-5e564f)] mt-0.5"
                     style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    {a.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
