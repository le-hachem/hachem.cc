import { useLanguage } from "../i18n/LanguageContext";
import type { Lang } from "../i18n/translations";

const options: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
];

interface LanguageToggleProps {
  /** "sm" for the header rail, "lg" for the mobile full-screen menu. */
  size?: "sm" | "lg";
  className?: string;
}

export function LanguageToggle({ size = "sm", className = "" }: LanguageToggleProps) {
  const { lang, setLang, t } = useLanguage();

  const text = size === "lg" ? "text-sm" : "text-[10px]";

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      role="group"
      aria-label={t.language.label}
      style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
    >
      {options.map((opt, i) => {
        const active = lang === opt.code;
        return (
          <span key={opt.code} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-neutral-300" aria-hidden>·</span>}
            <button
              type="button"
              onClick={() => setLang(opt.code)}
              aria-pressed={active}
              lang={opt.code}
              className={`${text} tracking-[0.2em] uppercase transition-colors duration-150 ${
                active
                  ? "text-black font-bold"
                  : "text-neutral-400 hover:text-black"
              }`}
            >
              {opt.label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
