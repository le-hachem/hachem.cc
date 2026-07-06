import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Broadsheet 404. Because the site is a single-page app served with a
 * 404.html = index.html fallback, an unknown path still boots the app; App
 * detects that the path matches no piece and renders this instead of the front
 * page — a themed "stop press" notice with a way back.
 */
export function NotFound({ onHome }: { onHome: () => void }) {
  const { t } = useLanguage();
  const nf = t.notFound;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--c-121110)] px-6">
      {/* Film grain, matching the rest of the paper */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/noise.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
          mixBlendMode: "overlay",
          opacity: 0.32,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        <div className="np-rule-strong" />
        <p className="np-kicker np-smallcaps py-3 text-[var(--c-8a8071)]">
          {nf.kicker}
        </p>
        <div className="np-rule" />

        <p
          className="np-head mt-8 font-black leading-none text-[var(--c-e6e0d5)]"
          style={{ fontSize: "clamp(4.5rem, 18vw, 9rem)" }}
        >
          404
        </p>

        <h1 className="np-head mt-4 text-3xl font-bold tracking-tight text-[var(--c-e6e0d5)] sm:text-4xl [text-wrap:balance]">
          {nf.headline}
        </h1>
        <p className="np-body mx-auto mt-4 max-w-md text-[15px] italic leading-[1.6] text-[var(--c-b5ab98)]">
          {nf.deck}
        </p>

        <div className="np-rule mx-auto mt-8 mb-6 max-w-xs" />

        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onHome();
          }}
          className="np-kicker inline-flex items-center gap-2 border border-[var(--c-5e564f)] px-5 py-2.5 text-[var(--c-cbc2b0)] transition-colors hover:border-[var(--c-e6e0d5)] hover:text-[var(--c-e6e0d5)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {nf.back}
        </a>
      </motion.div>
    </div>
  );
}
