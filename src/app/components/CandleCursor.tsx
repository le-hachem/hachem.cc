import { useEffect, useRef } from "react";

/**
 * A faint warm radial glow that follows the pointer across the dark page —
 * reading by candlelight. Screen-blended so it only lifts the shadows near the
 * cursor. Enabled only for fine pointers (no touch) and respects reduced motion.
 */
export function CandleCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--cx", `${x}px`);
      el.style.setProperty("--cy", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    el.style.opacity = "1";
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[45] opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(360px circle at var(--cx, 50%) var(--cy, 50%), rgba(214,194,150,0.08), rgba(214,194,150,0.03) 38%, transparent 72%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
