import { AnimatedCipher } from "./AnimatedCipher";
import { playCipher } from "./EasterEggs";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Mobile / tablet masthead (below xl). The pocket edition's answer to the
 * desktop nameplate: the same engraved cipher promoted to the paper's logo,
 * set as a front-page masthead at the very top of the page instead of a
 * full-screen photograph. It scrolls away as the reader moves on, at which
 * point the slim running head in the nav bar takes over — the way a paper
 * carries a big nameplate on the front and a small one on every inside page.
 *
 * `isolation: isolate` contains the cipher's `difference` blend to this band so
 * the white notation composites against the masthead's own stock (cream on the
 * night stone, ink on the day paper).
 */
export function MastheadMobile() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[var(--c-121110)] px-5 pb-6 pt-16">
      <div className="mx-auto max-w-md" style={{ isolation: "isolate" }}>
        {/* Heavy masthead rule */}
        <div aria-hidden style={{ borderTop: "2px solid var(--np-rule-strong)" }} />

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
          className="cursor-pointer py-5"
        >
          <AnimatedCipher invert className="w-full select-none" />
        </div>

        {/* Thin rule + standfirst */}
        <div aria-hidden style={{ borderTop: "1px solid var(--np-rule)" }} />
        <p className="np-kicker mt-3 text-center text-[var(--c-dfd6c7)]">
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
