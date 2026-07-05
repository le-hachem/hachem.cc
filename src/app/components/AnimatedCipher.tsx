import { useEffect, useRef, useState } from "react";

/**
 * Inlines /hachem-cipher.svg and "plays" it in: a glowing playhead cursor
 * sweeps left → right while a soft-edged mask trailing just behind it inks the
 * notation in, in strict reading order (clef → key → notes → barline). The
 * cursor fades at the final barline, leaving the finished cipher.
 *
 * A positional mask (rather than per-glyph staggering) keeps the reveal in true
 * reading order — ordering individual paths by bounding box is fragile because
 * beams, flags and stems share x-ranges.
 *
 * Falls back to a plain <img> on error; shows instantly under reduced motion.
 */
export function AnimatedCipher({
  className = "",
  onDone,
  invert = false,
}: {
  className?: string;
  onDone?: () => void;
  /**
   * When true, every glyph is forced white and the whole cipher is composited
   * with `mix-blend-mode: difference`. Painted over a photograph, the white
   * notation then reads as a negative of whatever sits behind it — the cipher
   * becomes a mask that inverts the image's colours.
   */
  invert?: boolean;
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
        parsed.setAttribute("aria-label", "Hachem");
        parsed.style.width = "100%";
        parsed.style.height = "auto";
        parsed.style.display = "block";

        const svg = containerRef.current.appendChild(
          document.importNode(parsed, true)
        ) as unknown as SVGSVGElement;

        // Invert mode: force every glyph white so the difference blend on the
        // wrapper turns the photo behind into its own negative through the
        // shape of the notation.
        if (invert) {
          const paintEls = Array.from(
            svg.querySelectorAll<SVGGraphicsElement>(
              "path, rect, ellipse, circle, text, line, polygon, polyline"
            )
          ).filter((el) => !el.closest("clipPath") && !el.closest("defs"));
          paintEls.forEach((el) => {
            const s = el.getAttribute("style") ?? "";
            if (s.includes("fill:none")) {
              el.style.stroke = "#ffffff";
            } else {
              el.style.fill = "#ffffff";
              if (/stroke\s*:/.test(s) && !s.includes("stroke:none")) {
                el.style.stroke = "#ffffff";
              }
            }
          });
        }

        if (reduceMotion) {
          svg.classList.add("np-cipher-glow");
          doneRef.current?.();
          return;
        }

        // The score is "played": a thin playhead cursor sweeps left → right and
        // the notation inks in just behind it, as if read off the page in time.
        const DURATION = 1500;
        const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

        // 1) Soft reveal mask, trailing the cursor. The mask image is wider than
        // the box; sliding it right-aligned → left-aligned uncovers the glyphs
        // in reading order with a feathered edge.
        const MASK =
          "linear-gradient(to right, #000 0%, #000 50%, rgba(0,0,0,0) 56%, rgba(0,0,0,0) 100%)";
        const setMask = (image: string) => {
          svg.style.webkitMaskImage = image;
          svg.style.maskImage = image;
        };
        setMask(MASK);
        svg.style.webkitMaskRepeat = svg.style.maskRepeat = "no-repeat";
        svg.style.webkitMaskSize = svg.style.maskSize = "240% 100%";
        svg.style.webkitMaskPosition = svg.style.maskPosition = "100% 0%";

        const reveal = svg.animate(
          [
            { maskPosition: "100% 0%", WebkitMaskPosition: "100% 0%" },
            { maskPosition: "0% 0%", WebkitMaskPosition: "0% 0%" },
          ],
          { duration: DURATION, easing: EASE, fill: "forwards" }
        );
        reveal.onfinish = () => {
          setMask("none"); // resting state: no feather
          reveal.cancel();
          svg.classList.add("np-cipher-glow"); // begin the living glow
        };

        // 2) The playhead — a glowing vertical cursor that runs the staff and
        // fades as it reaches the final barline.
        container.style.position = "relative";
        const playhead = document.createElement("div");
        playhead.setAttribute("aria-hidden", "true");
        playhead.style.cssText =
          "position:absolute;top:-5%;bottom:-5%;left:0;width:2px;background:#fff;" +
          "box-shadow:0 0 14px 1px rgba(255,255,255,0.75);pointer-events:none;" +
          "will-change:left,opacity;";
        container.appendChild(playhead);
        const cursor = playhead.animate(
          [
            { left: "0%", opacity: 0 },
            { left: "3%", opacity: 1, offset: 0.05 },
            { left: "96%", opacity: 1, offset: 0.86 },
            { left: "100%", opacity: 0 },
          ],
          { duration: DURATION, easing: EASE, fill: "forwards" }
        );
        cursor.onfinish = () => {
          playhead.remove();
          cursor.cancel();
        };

        window.setTimeout(() => {
          if (!cancelled) doneRef.current?.();
        }, DURATION);
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
  }, [invert]);

  if (failed) {
    return (
      <img
        src="/hachem-cipher.svg"
        alt="Hachem"
        className={className}
        draggable={false}
        style={
          invert
            ? { filter: "invert(1)", mixBlendMode: "difference" }
            : undefined
        }
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label="Hachem"
      style={invert ? { mixBlendMode: "difference" } : undefined}
    />
  );
}
