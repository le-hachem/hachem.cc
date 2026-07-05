import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { X, Menu, Sun, Moon } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

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
  const navLinks = [
    { no: "01", label: t.nav.about,       href: "#about" },
    { no: "02", label: t.nav.works,       href: "#works" },
    { no: "03", label: t.nav.projects,    href: "#projects" },
    { no: "04", label: t.nav.services,    href: "#services" },
    { no: "05", label: t.nav.commissions, href: "#commissions" },
    { no: "06", label: t.nav.contact,     href: "#contact" },
  ];

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
            ? "bg-[var(--c-121110)]/95 backdrop-blur-sm border-y border-[var(--seam-strong)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 h-12 flex items-center justify-between">
          {/* Running head / nameplate */}
          <a
            href="#"
            className="select-none text-[var(--c-e6e0d5)]"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}
          >
            <span className="np-head font-black text-sm tracking-tight lg:hidden">H</span>
            <span className="np-smallcaps np-head hidden lg:inline text-base tracking-[0.04em]">
              {t.masthead}
            </span>
          </a>

          {/* Desktop section index — hidden below md */}
          <nav className="hidden md:flex items-baseline gap-7">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="np-kicker group flex items-baseline gap-1.5 text-[var(--c-7b7267)] transition-colors duration-150 hover:text-[var(--c-e6e0d5)]"
                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
              >
                <span className="np-tabular text-[9px] text-[var(--c-5e564f)] group-hover:text-[var(--c-8a8071)]">{link.no}</span>
                <span>{link.label}</span>
              </a>
            ))}
            <span className="h-3 w-px bg-[var(--c-2f2c28)]" aria-hidden />
            <LanguageToggle />
            <EditionToggle edition={edition} onToggle={onToggleEdition} />
          </nav>

          {/* Mobile: edition + language toggle + hamburger — visible below md */}
          <div className="flex items-center gap-3 md:hidden">
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
            className="fixed inset-0 z-[850] bg-[var(--c-161413)] flex flex-col md:hidden"
          >
            {/* Spacer for header */}
            <div className="h-12 border-b border-[var(--c-2f2c28)] shrink-0" />

            {/* Index */}
            <nav className="flex-1 flex flex-col justify-center items-center gap-6 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  className="np-head flex items-baseline gap-3 text-4xl sm:text-5xl font-black tracking-tight text-[var(--c-eee8dd)] transition-colors hover:text-[var(--c-9a927f)]"
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
