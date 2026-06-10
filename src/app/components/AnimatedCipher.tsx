import { useEffect, useRef, useState } from "react";

/**
 * Inlines /hachem-cipher.svg and animates it "writing itself" left to right:
 * staff lines sweep in first, then every glyph appears in reading order —
 * stroke paths (stems, barlines, ledger lines) draw via dashoffset, filled
 * shapes (noteheads, beams, flags, letters) ink in with an opacity fade.
 *
 * Bug-proofing learned the hard way:
 * - Stagger is keyed to each element's bounding-box CENTER, and strokes and
 *   fills share the same delay curve, so a stem, its flag and its beam
 *   appear together instead of out of order.
 * - Fills animate opacity ONLY. Animating CSS transforms on SVG elements
 *   overrides their `transform` attributes and makes them jump.
 * - On finish, inline styles are set to the final state before the
 *   animation is cancelled, so there is no repaint flicker.
 *
 * Falls back to a plain <img> on error; skips animation entirely when the
 * user prefers reduced motion.
 */
export function AnimatedCipher({
  className = "",
  onDone,
}: {
  className?: string;
  onDone?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    fetch("/hachem-cipher.svg")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (cancelled || !containerRef.current) return;

        const doc = new DOMParser().parseFromString(text, "image/svg+xml");
        const parsed = doc.querySelector("svg");
        if (!parsed || doc.querySelector("parsererror")) throw new Error("parse");

        parsed.removeAttribute("width");
        parsed.removeAttribute("height");
        parsed.setAttribute("role", "img");
        parsed.setAttribute("aria-label", "Hachem H.");
        parsed.style.width = "100%";
        parsed.style.height = "auto";
        parsed.style.display = "block";

        const svg = containerRef.current.appendChild(
          document.importNode(parsed, true)
        ) as unknown as SVGSVGElement;

        if (reduceMotion) {
          doneRef.current?.();
          return;
        }

        // Include <text> too: the tuplet "3", the 5/4 time signature and the
        // letter names are text elements, not paths.
        const els = Array.from(
          svg.querySelectorAll<SVGGraphicsElement>(
            "path, rect, ellipse, circle, text"
          )
        ).filter((el) => !el.closest("clipPath") && !el.closest("defs"));

        // Horizontal extent, for the left→right stagger
        let minX = Infinity;
        let maxX = -Infinity;
        const boxes = els.map((el) => {
          try {
            const b = el.getBBox();
            minX = Math.min(minX, b.x);
            maxX = Math.max(maxX, b.x + b.width);
            return b;
          } catch {
            return null;
          }
        });
        const span = Math.max(maxX - minX, 1);

        const BASE = 300;   // ms before the first glyph starts
        const TOTAL = 1700; // ms across which glyph delays are spread
        let lastEnd = 0;

        // Rank the late group (flags and other tall fills) left→right so
        // they draw strictly one by one at the end.
        const flagRank = new Map<number, number>();
        els.forEach((el, i) => {
          const b = boxes[i];
          if (!b) return;
          const style = el.getAttribute("style") ?? "";
          if (style.includes("fill:none")) return;
          if (el.tagName.toLowerCase() === "text") return;
          const isBeam = b.width > b.height * 2 && b.width > 10;
          if (!isBeam && b.height > b.width * 1.5) flagRank.set(i, b.x);
        });
        [...flagRank.entries()]
          .sort((a, b) => a[1] - b[1])
          .forEach(([i], rank) => flagRank.set(i, rank));

        els.forEach((el, i) => {
          const b = boxes[i];
          if (!b) return;

          const style = el.getAttribute("style") ?? "";
          const isStroke = style.includes("fill:none");
          const isStaffLine = isStroke && b.width > span * 0.7;

          // Same delay curve for strokes AND fills, keyed to the element's
          // center, so grouped notation (stem + flag + beam) stays together.
          const center = b.x + b.width / 2;
          const delay = BASE + ((center - minX) / span) * TOTAL;

          if (isStaffLine) {
            // Staff lines sweep in first, from the far left.
            const len = (el as unknown as SVGPathElement).getTotalLength();
            el.style.strokeDasharray = `${len}`;
            el.style.strokeDashoffset = `${len}`;
            const anim = el.animate(
              [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
              {
                duration: 1300,
                easing: "cubic-bezier(0.6, 0, 0.2, 1)",
                fill: "forwards",
              }
            );
            anim.onfinish = () => {
              el.style.strokeDasharray = "";
              el.style.strokeDashoffset = "";
              anim.cancel();
            };
            lastEnd = Math.max(lastEnd, 1300);
          } else if (isStroke) {
            const len =
              "getTotalLength" in el
                ? (el as unknown as SVGPathElement).getTotalLength()
                : Math.max(b.width, b.height);
            const duration = Math.min(420, 140 + len * 4);
            el.style.strokeDasharray = `${len}`;
            el.style.strokeDashoffset = `${len}`;
            const anim = el.animate(
              [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
              { delay, duration, easing: "ease-out", fill: "forwards" }
            );
            anim.onfinish = () => {
              el.style.strokeDasharray = "";
              el.style.strokeDashoffset = "";
              anim.cancel();
            };
            lastEnd = Math.max(lastEnd, delay + duration);
          } else {
            // Filled glyphs and text. Wide fills (beams) wipe in left to
            // right and tall fills (flags, accidentals, the brace) wipe in
            // top to bottom along the stem, just after it, so they read as
            // drawn. Everything else (noteheads, letters, numerals) fades.
            // Only opacity and clip-path are animated, never transforms.
            const isText = el.tagName.toLowerCase() === "text";
            const isBeam = !isText && b.width > b.height * 2 && b.width > 10;
            const isFlag = !isText && !isBeam && b.height > b.width * 1.5;

            if (isBeam || isFlag) {
              const hidden = isBeam
                ? "inset(0 100% 0 0)" // reveal left → right
                : "inset(0 0 100% 0)"; // reveal top → bottom
              const shown = "inset(0 0 0 0)";
              // Flags are the finishing touch: they wait for the whole
              // system, then draw one by one, left to right.
              const start = isFlag
                ? BASE + TOTAL + 150 + (flagRank.get(i) ?? 0) * 240
                : delay + 80; // beams just let their stems land first
              const duration = isBeam ? 260 : 220;
              el.style.clipPath = hidden;
              const anim = el.animate(
                [{ clipPath: hidden }, { clipPath: shown }],
                {
                  delay: start,
                  duration,
                  easing: "ease-out",
                  fill: "forwards",
                }
              );
              anim.onfinish = () => {
                el.style.clipPath = "";
                anim.cancel();
              };
              lastEnd = Math.max(lastEnd, start + duration);
            } else {
              const duration = 300;
              el.style.opacity = "0";
              const anim = el.animate([{ opacity: 0 }, { opacity: 1 }], {
                delay,
                duration,
                easing: "ease-out",
                fill: "forwards",
              });
              anim.onfinish = () => {
                el.style.opacity = "";
                anim.cancel();
              };
              lastEnd = Math.max(lastEnd, delay + duration);
            }
          }
        });

        window.setTimeout(() => {
          if (!cancelled) doneRef.current?.();
        }, Math.min(lastEnd, 3800));
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          doneRef.current?.();
        }
      });

    return () => {
      cancelled = true;
      if (container) container.innerHTML = "";
    };
  }, []);

  if (failed) {
    return (
      <img
        src="/hachem-cipher.svg"
        alt="Hachem H."
        className={className}
        draggable={false}
      />
    );
  }

  return <div ref={containerRef} className={className} aria-label="Hachem H." />;
}
