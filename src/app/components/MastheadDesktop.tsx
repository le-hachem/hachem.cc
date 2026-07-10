import { motion, useScroll, useSpring } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { AnimatedCipher } from "./AnimatedCipher";
import { playCipher } from "./EasterEggs";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../i18n/LanguageContext";

/** Night ⇄ Day edition switch, mirrored from the mobile nav. */
function EditionToggle({
  edition,
  onToggle,
}: {
  edition: "night" | "day";
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={edition === "day" ? "Switch to Night edition" : "Switch to Day edition"}
      title={edition === "day" ? "Night edition" : "Day edition"}
      className="flex h-8 w-8 items-center justify-center text-[var(--c-a1998a)] transition-colors hover:text-[var(--c-e6e0d5)]"
    >
      {edition === "day" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

/**
 * Desktop masthead (xl+). The engraved cipher is promoted from the old hero to
 * the paper's nameplate: a fixed band at the very top, ruled top and bottom
 * like a printed masthead, with the dateline set at the left and the edition /
 * language controls at the right. A thin reading "playhead" traces progress
 * along the lower rule.
 *
 * `isolation: isolate` contains the cipher's `difference` blend to this band, so
 * the white notation composites against the masthead's own stock (turning cream
 * on the night stone, ink on the day paper) rather than the content below.
 */
export function MastheadDesktop({
  edition,
  onToggleEdition,
}: {
  edition: "night" | "day";
  onToggleEdition: () => void;
}) {
  const { t, lang } = useLanguage();

  const dateline = new Date()
    .toLocaleDateString(
      lang === "fr" ? "fr-FR" : lang === "de" ? "de-DE" : "en-GB",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    )
    .replace(/^\w/, (c) => c.toUpperCase());

  const { scrollYProgress } = useScroll();
  const playhead = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <header
      className="fixed inset-x-0 top-0 z-[900] hidden h-[var(--masthead-h)] bg-[var(--c-121110)] xl:block"
      style={{ isolation: "isolate" }}
    >
      {/* Heavy masthead rule */}
      <div
        aria-hidden
        style={{ borderTop: "2px solid var(--np-rule-strong)" }}
      />

      <div className="relative flex h-full items-center justify-center px-10">
        {/* Dateline — left */}
        <p className="np-kicker absolute left-10 top-1/2 -translate-y-1/2 max-w-[13rem] leading-relaxed text-[var(--c-8a8071)]">
          <span className="np-smallcaps block text-[var(--c-cbc2b0)]">
            {t.front?.edition ?? "Edition"}
          </span>
          {dateline}
        </p>

        {/* The nameplate — click to hear the motif */}
        <div
          onClick={playCipher}
          role="button"
          tabIndex={0}
          aria-label="Play the cipher"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              playCipher();
            }
          }}
          className="w-[19rem] cursor-pointer"
        >
          <AnimatedCipher invert className="w-full select-none" />
        </div>

        {/* Controls — right */}
        <div className="absolute right-8 top-1/2 flex -translate-y-1/2 items-center gap-3">
          <LanguageToggle />
          <span className="h-3 w-px bg-[var(--c-2f2c28)]" aria-hidden />
          <EditionToggle edition={edition} onToggle={onToggleEdition} />
        </div>
      </div>

      {/* Heavy lower rule + reading playhead */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0"
        style={{ borderTop: "2px solid var(--np-rule-strong)" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-[var(--c-8a8071)]"
        style={{ scaleX: playhead }}
      />
    </header>
  );
}
