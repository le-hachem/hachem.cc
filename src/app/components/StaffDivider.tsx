import { motion, useReducedMotion } from "motion/react";

const STAFF_YS = [12, 20, 28, 36, 44];

/**
 * Section divider drawn as a single empty measure of music:
 * five staff lines sweep in, a treble clef draws itself, then a
 * whole note and final barline settle in.
 */
export function StaffDivider({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`flex justify-center px-8 ${className}`} aria-hidden>
      <motion.svg
        viewBox="0 -2 480 62"
        fill="none"
        className="w-full max-w-md text-[var(--c-443f39)]"
        initial={reduceMotion ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Staff lines */}
        {STAFF_YS.map((y, i) => (
          <motion.line
            key={y}
            x1="64"
            y1={y}
            x2="428"
            y2={y}
            stroke="currentColor"
            strokeWidth="1"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.9, delay: i * 0.07, ease: [0.6, 0, 0.2, 1] },
              },
            }}
          />
        ))}

        {/* Treble clef — engraved outline from Bravura (SIL OFL, Steinberg) */}
        <g transform="translate(66 0)">
        <motion.path
          fill="currentColor"
          stroke="none"
          d="M12.0 22.7C12.0 22.3 12.0 22.3 12.2 22.1C15.7 18.9 18.3 14.8 18.3 9.9C18.3 7.1 17.5 4.4 16.2 2.5C15.7 1.8 14.9 0.9 14.6 0.9C14.1 0.9 13.1 1.7 12.5 2.4C10.1 5.0 9.3 9.0 9.3 12.4C9.3 14.2 9.6 16.3 9.8 17.6C9.9 18.0 9.9 18.0 9.5 18.4C4.9 22.2 0.0 26.8 0.0 33.2C0.0 38.8 3.8 44.1 11.6 44.1C12.4 44.1 13.2 44.0 13.9 43.9C14.2 43.8 14.3 43.8 14.3 44.2C14.7 46.3 15.2 49.1 15.2 50.6C15.2 55.3 12.0 55.9 10.1 55.9C8.4 55.9 7.6 55.4 7.6 55.0C7.6 54.8 7.8 54.7 8.6 54.4C9.6 54.1 10.7 53.3 10.7 51.4C10.7 49.7 9.6 48.2 7.6 48.2C5.5 48.2 4.2 49.9 4.2 51.8C4.2 53.9 5.5 57.1 10.3 57.1C12.4 57.1 16.6 56.1 16.6 50.7C16.6 48.8 16.0 45.8 15.7 43.8C15.6 43.4 15.6 43.5 16.1 43.3C19.3 42.0 21.5 39.3 21.5 35.6C21.5 31.6 18.5 27.9 13.8 27.9C12.9 27.9 12.9 27.9 12.8 27.4ZM15.0 5.8C16.1 5.8 17.0 6.7 17.0 8.4C17.0 12.0 13.9 14.9 11.4 17.1C11.2 17.3 11.0 17.2 11.0 16.8C10.8 16.0 10.8 14.9 10.8 13.9C10.8 8.9 13.1 5.8 15.0 5.8ZM11.6 27.6C11.6 28.2 11.6 28.2 11.1 28.4C8.3 29.3 6.4 31.9 6.4 34.6C6.4 37.5 7.9 39.5 10.1 40.3C10.4 40.4 10.8 40.4 11.0 40.4C11.2 40.4 11.4 40.3 11.4 40.1C11.4 39.9 11.1 39.8 10.9 39.7C9.5 39.1 8.6 37.7 8.6 36.3C8.6 34.4 9.8 33.1 11.8 32.5C12.3 32.4 12.4 32.4 12.4 32.8L14.0 42.3C14.1 42.7 14.0 42.7 13.6 42.8C13.1 42.8 12.4 42.9 11.8 42.9C6.2 42.9 2.6 39.8 2.6 35.4C2.6 33.5 2.9 30.9 5.5 27.9C7.5 25.8 8.9 24.6 10.4 23.4C10.8 23.1 10.8 23.2 10.9 23.5ZM13.8 32.7C13.7 32.3 13.7 32.2 14.1 32.3C16.7 32.5 18.8 34.7 18.8 37.5C18.8 39.5 17.6 41.1 15.8 42.0C15.5 42.2 15.4 42.2 15.3 41.8Z"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.7, delay: 0.5, ease: "easeOut" },
            },
          }}
        />
        </g>

        {/* Whole note resting in the measure */}
        <motion.ellipse
          cx="246"
          cy="32"
          rx="6.5"
          ry="4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          transform="rotate(-14 246 32)"
          variants={{
            hidden: { opacity: 0, y: -3 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, delay: 1.1, ease: "easeOut" },
            },
          }}
        />

        {/* Final barline */}
        <motion.line
          x1="428"
          y1="12"
          x2="428"
          y2="44"
          stroke="currentColor"
          strokeWidth="2.5"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.3, delay: 1.3 },
            },
          }}
        />
      </motion.svg>
    </div>
  );
}
