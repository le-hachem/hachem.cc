import { useMemo } from "react";

/**
 * A ripped paper edge that masks out a jagged strip, revealing whatever is behind.
 * Place between sections. The SVG draws a white shape that covers most of the band,
 * leaving a torn edge that exposes the fixed background underneath.
 *
 * `direction`: "down" = top section's torn bottom, "up" = next section's torn top
 */
export function RippedEdge({
  seed = 1,
  direction = "down",
  className = "",
  color = "white",
}: {
  seed?: number;
  direction?: "down" | "up";
  className?: string;
  color?: string;
}) {
  const path = useMemo(() => {
    // Simple seeded PRNG
    let s = seed * 9301 + 49297;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    const width = 1200;
    const height = 50;
    const steps = 100;
    const stepW = width / steps;

    const points: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = i * stepW;
      // Jagged tear with varying amplitude
      const amp = height * 0.5;
      const base = height * 0.5;
      const jag = base + (rand() - 0.5) * amp + Math.sin(i * 0.3) * amp * 0.3;
      points.push({ x, y: jag });
    }

    // Build path: for "down", fill from top to torn line; for "up", fill from torn line to bottom
    let d: string;
    if (direction === "down") {
      d = `M0,0 L0,${points[0].y}`;
      for (let i = 1; i <= steps; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        const cpy = prev.y + (rand() - 0.5) * 8;
        d += ` Q${cpx},${cpy} ${curr.x},${curr.y}`;
      }
      d += ` L${width},0 Z`;
    } else {
      d = `M0,${height} L0,${points[0].y}`;
      for (let i = 1; i <= steps; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        const cpy = prev.y + (rand() - 0.5) * 8;
        d += ` Q${cpx},${cpy} ${curr.x},${curr.y}`;
      }
      d += ` L${width},${height} Z`;
    }

    return d;
  }, [seed, direction]);

  // Build a shadow path (slightly offset torn edge)
  const shadowPath = useMemo(() => {
    let s = seed * 9301 + 49297;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    const width = 1200;
    const height = 50;
    const steps = 100;
    const stepW = width / steps;

    const points: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = i * stepW;
      const amp = height * 0.5;
      const base = height * 0.5;
      const jag = base + (rand() - 0.5) * amp + Math.sin(i * 0.3) * amp * 0.3;
      points.push({ x, y: jag });
    }

    let d = `M0,${points[0].y}`;
    for (let i = 1; i <= steps; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      const cpy = prev.y + (rand() - 0.5) * 8;
      d += ` Q${cpx},${cpy} ${curr.x},${curr.y}`;
    }
    return d;
  }, [seed]);

  return (
    <div className={`${className} relative`} aria-hidden>
      <svg
        viewBox="0 0 1200 50"
        preserveAspectRatio="none"
        className="block h-6 w-full md:h-8"
      >
        {/* Drop shadow along torn edge */}
        <path
          d={shadowPath}
          fill="none"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="3"
          style={{ filter: "blur(1px)" }}
        />
        {/* Main paper shape */}
        <path d={path} fill={color} />
      </svg>
    </div>
  );
}
