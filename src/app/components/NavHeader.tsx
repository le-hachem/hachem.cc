import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { X, Menu, Sun, Moon } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { hideDispatches } from "../i18n/dispatches";

function scrollTo(href: string) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Night ⇄ Day (dark ⇄ light "newsprint") edition switch. */
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

export function NavHeader({
  edition,
  onToggleEdition,
}: {
  edition: "night" | "day";
  onToggleEdition: () => void;
}) {
  const { t } = useLanguage();
  // Built from the live section list so the numbering stays sequential whether
  // or not the Dispatches section is published.
  const navLinks = [
    { label: t.nav.about,       href: "#about" },
    { label: t.nav.works,       href: "#works" },
    { label: t.nav.agenda,      href: "#agenda" },
    ...(hideDispatches ? [] : [{ label: t.nav.dispatches, href: "#dispatches" }]),
    { label: t.nav.projects,    href: "#projects" },
    { label: t.nav.services,    href: "#services" },
    { label: t.nav.commissions, href: "#commissions" },
    { label: t.nav.contact,     href: "#contact" },
  ].map((link, i) => ({ ...link, no: String(i + 1).padStart(2, "0") }));

  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Scroll "playhead" — a thin line tracing reading progress like a score
  const { scrollYProgress } = useScroll();
  const playhead = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-[var(--c-121110)]/95 backdrop-blur-sm border-y border-[var(--seam-strong)] shadow-[0_14px_32px_-22px_rgba(0,0,0,0.6)]"
            : ""
        }`}
        style={
          scrolled || menuOpen
            ? undefined
            : {
                // Theme-aware scrim so the masthead reads over the hero photo.
                // Night: an immersive dark fade over the cathedral. Day: the
                // bright organ photo + halftone dots bleed through a thin veil,
                // so the top bar becomes a near-solid sheet of paper instead.
                background:
                  edition === "day"
                    ? "linear-gradient(to bottom, rgba(var(--hero-veil),0.97) 0%, rgba(var(--hero-veil),0.94) 55%, rgba(var(--hero-veil),0.72) 100%)"
                    : "linear-gradient(to bottom, rgba(var(--hero-veil),0.85) 0%, rgba(var(--hero-veil),0.62) 45%, rgba(var(--hero-veil),0.32) 72%, transparent 100%)",
                borderBottom:
                  edition === "day"
                    ? "1px solid var(--seam-strong)"
                    : undefined,
              }
        }
      >
        <div
          className="max-w-7xl mx-auto px-5 sm:px-10 h-12 flex items-center justify-between xl:justify-center"
          style={
            scrolled || menuOpen
              ? undefined
              : { textShadow: "var(--hero-textshadow)" }
          }
        >
          {/* Running head — the masthead folds up into the bar once the reader
              is past the front page (or has the index open), the way a paper
              carries its nameplate small across every inside page. */}
          <span
            aria-hidden
            className={`np-head xl:hidden select-none whitespace-nowrap text-lg font-black tracking-[0.01em] text-[var(--c-e6e0d5)] transition-opacity duration-300 ${
              scrolled || menuOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Hachem
          </span>

          {/* Desktop section index — the whole group (links + language + theme)
              centered as one; collapses to the hamburger below xl. */}
          <nav className="hidden xl:flex items-baseline gap-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`np-kicker group flex items-baseline gap-1.5 transition-colors duration-150 hover:text-[var(--c-e6e0d5)] ${
                  edition === "day" ? "text-[var(--c-bcb3a3)]" : "text-[var(--c-7b7267)]"
                }`}
                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
              >
                <span className={`np-tabular text-[9px] group-hover:text-[var(--c-8a8071)] ${
                  edition === "day" ? "text-[var(--c-9a927f)]" : "text-[var(--c-5e564f)]"
                }`}>{link.no}</span>
                <span>{link.label}</span>
              </a>
            ))}
            <span className="h-3 w-px bg-[var(--c-2f2c28)]" aria-hidden />
            <LanguageToggle />
            <EditionToggle edition={edition} onToggle={onToggleEdition} />
          </nav>

          {/* Compact controls: edition + language toggle + hamburger — below xl */}
          <div className="flex items-center gap-3 xl:hidden">
            <EditionToggle edition={edition} onToggle={onToggleEdition} />
            <LanguageToggle />
            <button
              className="flex items-center justify-center w-8 h-8 text-[var(--c-a1998a)] hover:text-[var(--c-8a8071)] transition-colors"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Playhead */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--c-8a8071)] origin-left"
          style={{ scaleX: playhead }}
        />
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[850] bg-[var(--c-161413)] flex flex-col xl:hidden"
          >
            {/* Spacer for header */}
            <div className="h-12 border-b border-[var(--c-2f2c28)] shrink-0" />

            {/* Index */}
            <nav className="flex-1 flex flex-col justify-center items-center gap-5 px-8 py-6 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  className="np-head flex items-baseline gap-3 text-3xl sm:text-4xl font-black tracking-tight text-[var(--c-eee8dd)] transition-colors hover:text-[var(--c-9a927f)]"
                  onClick={e => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setTimeout(() => scrollTo(link.href), 200);
                  }}
                >
                  <span className="np-kicker np-tabular text-xs text-[var(--c-5e564f)]">{link.no}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom social links */}
            <div className="shrink-0 border-t border-[var(--c-201e1c)] px-8 py-6 flex justify-center gap-8">
              <a
                href="https://www.youtube.com/@hachem.mp3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-[var(--c-5e564f)] hover:text-[var(--c-8a8071)] transition-colors"
                style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
              >
                YouTube
              </a>
              <span className="text-[var(--c-2f2c28)]">·</span>
              <a
                href="https://www.instagram.com/hachem.mp3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-[var(--c-5e564f)] hover:text-[var(--c-8a8071)] transition-colors"
                style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
              >
                Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
