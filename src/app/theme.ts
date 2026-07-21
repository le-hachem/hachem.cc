/**
 * The paper's printings. Each theme is a class (or pair of classes) on the
 * root element; the palettes themselves live in index.css as overrides of the
 * same --c-* token ramp. Light printings include `daylight` so every
 * light-mode behavioural rule follows automatically.
 *
 * This lives outside App.tsx so the admin console can apply the same printing
 * without pulling the whole site into its bundle.
 */
export const THEMES: Record<string, { cls: string[]; light: boolean }> = {
  night: { cls: [], light: false },
  day: { cls: ["daylight"], light: true },
  sepia: { cls: ["daylight", "theme-sepia"], light: true },
  midnight: { cls: ["theme-midnight"], light: false },
  verdigris: { cls: ["theme-verdigris"], light: false },
  oxblood: { cls: ["theme-oxblood"], light: false },
};

export const ALL_THEME_CLASSES = [
  "daylight",
  "theme-sepia",
  "theme-midnight",
  "theme-verdigris",
  "theme-oxblood",
];

export const THEME_STORAGE_KEY = "hh-theme";

/** The printing chosen on a previous visit, or the house default. */
export function readStoredTheme(): string {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && saved in THEMES) return saved;
    return localStorage.getItem("hh-edition-theme") === "day" ? "day" : "night";
  } catch {
    return "night";
  }
}

/** Put a printing on the document and remember it. */
export function applyTheme(theme: string): void {
  const entry = THEMES[theme] ?? THEMES.night;
  const root = document.documentElement;
  ALL_THEME_CLASSES.forEach((c) => root.classList.remove(c));
  entry.cls.forEach((c) => root.classList.add(c));
  // Flip the favicon with the paper's tone.
  document
    .getElementById("favicon-svg")
    ?.setAttribute("href", entry.light ? "/favicon-day.svg" : "/favicon.svg");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem("hh-edition-theme", entry.light ? "day" : "night");
  } catch {
    /* ignore */
  }
}
