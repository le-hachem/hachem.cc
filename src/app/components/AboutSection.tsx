import { motion } from "motion/react";
import { Youtube, Instagram } from "lucide-react";

const milestones = [
  {
    age: "4",
    text: "Began learning music.",
  },
  {
    age: "6",
    text: "Started composing — writing melodies in solfège syllables, having not yet learned to read a stave.",
  },
  {
    age: "13",
    text: "Turned to serious self-study: harmony, counterpoint, form. Writing canons, sonatas and fugues without formal instruction.",
  },
  {
    age: "17",
    text: "Left Lebanon to pursue physics and mathematics, studying at university in France and then Belgium.",
  },
  {
    age: "2026",
    text: "Left academia to focus entirely on music. Now studying composition at the Sorbonne, Paris.",
  },
];

const accolades = [
  { title: "1st place — Harmony & Orchestration", body: "ICS Composition Competition" },
  { title: "4th place — Overall",                 body: "ICS Composition Competition" },
];

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
              Biography
            </h2>
            <div className="mx-auto mt-4 h-px w-12 bg-black" />
          </div>

          {/* Two-column layout on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">

            {/* Left — timeline */}
            <div className="relative">
              <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-6"
                 style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                Timeline
              </p>
              <ol className="relative border-l border-neutral-200 space-y-0">
                {milestones.map((m, i) => (
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
                      {isNaN(Number(m.age)) ? m.age : `Age ${m.age}`}
                    </p>
                    <p className="text-sm font-serif text-neutral-700 leading-relaxed">
                      {m.text}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Right — prose */}
            <div className="font-serif text-base sm:text-lg leading-relaxed text-neutral-800 space-y-6">
              <p>
                Hachem began his musical life at four and was composing by six —
                inventing his own notation using solfège syllables before he had learned
                to read a stave. It was an early sign of the self-reliance that would
                define his formation.
              </p>
              <p>
                By thirteen, driven by curiosity and a growing library of scores, he had
                turned to serious self-study: working through harmony and counterpoint,
                writing canons, sonatas and fugues, building a fluency in the classical
                forms without formal instruction.
              </p>
              <p>
                Born in Lebanon, he left at seventeen to pursue physics and mathematics
                at university in France and Belgium — the analytical rigour leaving a
                clear mark on how he approaches structure and form. In 2026 he left
                academia to devote himself entirely to composition, and is currently
                studying at the Sorbonne in Paris.
              </p>
              <p>
                His work spans original composition for large forces and a quieter
                scholarly practice: the{" "}
                <span className="italic">Lili Boulanger Restoration Project</span>,
                producing new critical editions of her manuscripts and releasing them
                freely on IMSLP.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-5 pt-2">
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
              Recognition
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
              {accolades.map((a, i) => (
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
