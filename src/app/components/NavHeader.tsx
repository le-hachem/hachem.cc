import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { X, Menu } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

function scrollTo(href: string) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function NavHeader() {
  const { t } = useLanguage();
  const navLinks = [
    { label: t.nav.about,       href: "#about" },
    { label: t.nav.works,       href: "#works" },
    { label: t.nav.projects,    href: "#projects" },
    { label: t.nav.services,    href: "#services" },
    { label: t.nav.commissions, href: "#commissions" },
    { label: t.nav.contact,     href: "#contact" },
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
            ? "bg-white/95 backdrop-blur-sm border-b border-neutral-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 h-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-black text-sm tracking-tight select-none"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}
          >
            H.H.
          </a>

          {/* Desktop links — hidden below md */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 hover:text-black transition-colors duration-150"
                style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
              >
                {link.label}
              </a>
            ))}
            <span className="h-3 w-px bg-neutral-200" aria-hidden />
            <LanguageToggle />
          </nav>

          {/* Mobile: language toggle + hamburger — visible below md */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageToggle />
            <button
              className="flex items-center justify-center w-8 h-8 text-neutral-600 hover:text-black transition-colors"
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
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 origin-left"
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
            className="fixed inset-0 z-[850] bg-white flex flex-col md:hidden"
          >
            {/* Spacer for header */}
            <div className="h-12 border-b border-neutral-200 shrink-0" />

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center items-center gap-7 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  className="text-4xl sm:text-5xl font-display font-black tracking-tight text-black hover:text-neutral-500 transition-colors"
                  onClick={e => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setTimeout(() => scrollTo(link.href), 200);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom social links */}
            <div className="shrink-0 border-t border-neutral-100 px-8 py-6 flex justify-center gap-8">
              <a
                href="https://www.youtube.com/@hachem.mp3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-neutral-400 hover:text-black transition-colors"
                style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
              >
                YouTube
              </a>
              <span className="text-neutral-200">·</span>
              <a
                href="https://www.instagram.com/hachem.mp3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-neutral-400 hover:text-black transition-colors"
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
