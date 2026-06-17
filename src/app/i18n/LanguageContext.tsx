import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Dict } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Translation dictionary for the active language. */
  t: Dict;
}

const STORAGE_KEY = "hh-lang";
const SUPPORTED: Lang[] = ["en", "fr", "de"];

/** Open Graph locale codes per language. */
const OG_LOCALE: Record<Lang, string> = {
  en: "en_GB",
  fr: "fr_FR",
  de: "de_DE",
};

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";

  // 1. Explicit choice persisted from a previous visit
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored as Lang)) return stored as Lang;
  } catch {
    /* localStorage unavailable — fall through to detection */
  }

  // 2. Browser preference
  const nav = window.navigator;
  const candidates = [
    ...(nav.languages ?? []),
    nav.language,
  ].filter(Boolean) as string[];
  for (const c of candidates) {
    const base = c.slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(base as Lang)) return base as Lang;
  }

  return "en";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  // Keep <html lang>, the page title, and meta tags in sync for
  // accessibility, SEO and link previews.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const dict = translations[lang];

    document.documentElement.lang = lang;
    document.title = dict.seo.title;

    const setMeta = (selector: string, content: string) => {
      const el = document.head.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute("content", content);
    };
    setMeta('meta[name="description"]', dict.seo.description);
    setMeta('meta[property="og:title"]', dict.seo.title);
    setMeta('meta[property="og:description"]', dict.seo.description);
    setMeta('meta[name="twitter:title"]', dict.seo.title);
    setMeta('meta[name="twitter:description"]', dict.seo.description);
    setMeta('meta[property="og:locale"]', OG_LOCALE[lang]);
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore persistence failures */
    }
  };

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: translations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
