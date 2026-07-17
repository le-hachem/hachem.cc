import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Holds its child like a photograph: the plate tilts a few degrees toward the
 * pointer in real 3D, and a soft sheen tracks across the surface — the light
 * catching a glossy print as it turns in the hand. Fine pointers only; touch
 * devices and reduced-motion readers get the child untouched.
 */
export function Tilt({
  children,
  className = "",
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt, in degrees. */
  max?: number;
}) {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // Pointer position across the card, 0..1, sprung so the plate settles
  // rather than snaps.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 160, damping: 20, mass: 0.4 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const sheenX = useTransform(sx, [0, 1], [22, 78]);
  const sheenY = useTransform(sy, [0, 1], [18, 82]);
  const sheen = useMotionTemplate`radial-gradient(240px circle at ${sheenX}% ${sheenY}%, rgba(255, 252, 240, 0.16), transparent 65%)`;

  if (!fine || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
        {/* The travelling light */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.45 }}
          style={{ background: sheen }}
        />
      </motion.div>
    </div>
  );
}
