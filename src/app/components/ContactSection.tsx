import { SectionHeading } from "./SectionHeading";
import { DropCap } from "./DropCap";
import { useLanguage } from "../i18n/LanguageContext";

const LINK =
  "underline decoration-[#5e564f] underline-offset-2 text-[#e6e0d5] transition-colors hover:decoration-[#e6e0d5]";

export function ContactSection() {
  const { t } = useLanguage();
  return (
    <section className="relative bg-[#1a1816] px-4 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          index="06"
          dept={t.contact.dept}
          title={t.contact.headline}
          deck={t.contact.deck}
          byline={t.contact.byline}
        />

        <article className="mx-auto max-w-3xl">
          <div className="np-body np-columns np-justify text-[14px] leading-[1.62] text-[#cbc2b0] [&>p]:mb-3.5">
            <p><DropCap text={t.contact.p1} /></p>
            <p>
              {t.contact.p2}
            </p>
            <p>
              {t.contact.p3}{" "}
              <a href="mailto:contact@hachem.cc" className={LINK}>
                contact@hachem.cc
              </a>
            </p>
            <p className="np-endmark">
              {t.contact.p4}{" "}
              <a
                href="https://ko-fi.com/hachem_mp3"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                {t.contact.kofi}
              </a>
            </p>
          </div>

          <p className="np-head mt-7 text-2xl italic text-[#cbc2b0]">— Hachem H.</p>
        </article>
      </div>
    </section>
  );
}
