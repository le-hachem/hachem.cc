/** Whimsical silhouette decorations — cats, birds, lamp posts, flowers, musical elements — to perch on card edges. */
import React from "react";

export function CatSitting({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <path d="M12 6 L9 0 L8 7Z" />
      <path d="M20 6 L23 0 L24 7Z" />
      {/* Head */}
      <ellipse cx="16" cy="9" rx="7" ry="5.5" />
      {/* Eyes */}
      <ellipse cx="13" cy="8.5" rx="1.2" ry="1.5" fill="white" />
      <ellipse cx="19" cy="8.5" rx="1.2" ry="1.5" fill="white" />
      <circle cx="13.3" cy="8.8" r="0.6" />
      <circle cx="19.3" cy="8.8" r="0.6" />
      {/* Nose */}
      <path d="M15.5 10.5 L16.5 10.5 L16 11.2Z" />
      {/* Whiskers */}
      <line x1="10" y1="10" x2="4" y2="9" stroke="currentColor" strokeWidth="0.4" />
      <line x1="10" y1="11" x2="4" y2="11.5" stroke="currentColor" strokeWidth="0.4" />
      <line x1="22" y1="10" x2="28" y2="9" stroke="currentColor" strokeWidth="0.4" />
      <line x1="22" y1="11" x2="28" y2="11.5" stroke="currentColor" strokeWidth="0.4" />
      {/* Body */}
      <path d="M11 14 Q10 18 10 22 Q10 28 12 30 L12 34 L14 34 L14 31 Q16 32 18 31 L18 34 L20 34 L20 30 Q22 28 22 22 Q22 18 21 14Z" />
      {/* Tail curling up */}
      <path d="M10 28 Q5 27 3 24 Q1 20 3 17 Q5 15 7 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Paws detail */}
      <path d="M12 34 Q12.5 35 13 34" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <path d="M18 34 Q18.5 35 19 34" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export function CatWalking({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <path d="M18 5 L15 0 L14 6Z" />
      <path d="M24 5 L27 0 L28 6Z" />
      {/* Head */}
      <ellipse cx="21" cy="8" rx="6" ry="5" />
      {/* Eyes */}
      <ellipse cx="19" cy="7.5" rx="1" ry="1.2" fill="white" />
      <ellipse cx="23.5" cy="7.5" rx="1" ry="1.2" fill="white" />
      <circle cx="19.2" cy="7.7" r="0.5" />
      <circle cx="23.7" cy="7.7" r="0.5" />
      {/* Nose & whiskers */}
      <path d="M20.8 9.5 L21.5 9.5 L21.2 10Z" />
      <line x1="17" y1="9" x2="12" y2="8" stroke="currentColor" strokeWidth="0.4" />
      <line x1="17" y1="10" x2="12" y2="10.5" stroke="currentColor" strokeWidth="0.4" />
      <line x1="25" y1="9" x2="30" y2="8" stroke="currentColor" strokeWidth="0.4" />
      {/* Body - elongated walking pose */}
      <path d="M19 13 Q16 14 14 16 Q12 18 14 20 L14 22 Q18 24 26 24 Q32 24 36 22 L38 20 Q40 18 38 16 Q36 14 33 13 Q26 11 19 13Z" />
      {/* Front legs walking */}
      <path d="M18 22 L16 28 L15 30 L17 30 L18 28 L20 24" fill="currentColor" />
      <path d="M24 23 L25 28 L26 30 L28 30 L27 28 L25 24" fill="currentColor" />
      {/* Back legs */}
      <path d="M32 22 L30 28 L29 30 L31 30 L32 28 L33 24" fill="currentColor" />
      <path d="M36 21 L38 27 L39 30 L41 30 L40 27 L38 22" fill="currentColor" />
      {/* Tail curving up elegantly */}
      <path d="M38 18 Q42 16 44 12 Q46 8 44 5 Q42 3 40 4 Q39 5 40 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CatStretching({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 50 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Head low - stretching */}
      <ellipse cx="8" cy="14" rx="5" ry="4" />
      {/* Ears */}
      <path d="M5 10 L3 6 L6 10Z" />
      <path d="M10 10 L12 6 L11 10Z" />
      {/* Eyes closed - content */}
      <path d="M6 13 Q7 12.5 8 13" fill="none" stroke="white" strokeWidth="0.6" />
      <path d="M9 13 Q10 12.5 11 13" fill="none" stroke="white" strokeWidth="0.6" />
      {/* Front paws stretched out */}
      <path d="M12 16 L4 22 L2 24 L4 24 L6 22 L8 20" fill="currentColor" />
      <path d="M12 15 L6 20 L5 22 L7 22 L9 19" fill="currentColor" />
      {/* Body arching up */}
      <path d="M12 14 Q18 8 26 10 Q32 12 36 16 Q38 18 38 20" />
      {/* Back legs */}
      <path d="M36 20 L34 26 L33 28 L35 28 L36 26 L37 22" fill="currentColor" />
      <path d="M38 19 L40 25 L41 28 L43 28 L42 25 L40 20" fill="currentColor" />
      {/* Tail up */}
      <path d="M38 17 Q42 14 44 10 Q45 7 43 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Bird({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="16" cy="15" rx="8" ry="5.5" />
      {/* Head */}
      <circle cx="24" cy="11" r="3.5" />
      {/* Eye */}
      <circle cx="25.5" cy="10.5" r="1" fill="white" />
      <circle cx="25.8" cy="10.3" r="0.5" />
      {/* Beak */}
      <path d="M27 10.5 L32 9.5 L31 11 L27 11.5Z" />
      {/* Wing detail */}
      <path d="M10 13 Q12 10 16 11 Q18 11.5 19 13" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M11 14 Q13 11.5 16 12.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
      {/* Tail feathers - more elaborate */}
      <path d="M8 14 L2 10 L3 14Z" />
      <path d="M8 15 L1 12 L3 16Z" />
      <path d="M8 16 L2 16 L4 18Z" />
      {/* Legs with feet */}
      <line x1="14" y1="20" x2="13" y2="23" stroke="currentColor" strokeWidth="0.8" />
      <line x1="18" y1="20" x2="19" y2="23" stroke="currentColor" strokeWidth="0.8" />
      <path d="M11 23 L13 23 L14 23.5" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <path d="M17.5 23 L19 23 L20 23.5" fill="none" stroke="currentColor" strokeWidth="0.6" />
      {/* Breast feather detail */}
      <path d="M20 14 Q22 15 22 17" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}

export function BirdFlying({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="20" cy="11" rx="6" ry="2.5" />
      {/* Head */}
      <circle cx="26" cy="10" r="2" />
      {/* Beak */}
      <path d="M28 9.5 L32 8.5 L28 10.5Z" />
      {/* Eye */}
      <circle cx="26.8" cy="9.5" r="0.5" fill="white" />
      {/* Upper wing */}
      <path d="M18 9 Q14 4 8 1 Q6 0 4 1 Q6 3 10 6 Q14 8 18 9Z" />
      <path d="M22 9 Q26 4 32 1 Q34 0 36 1 Q34 3 30 6 Q26 8 22 9Z" />
      {/* Lower wing feathers */}
      <path d="M16 11 Q12 14 8 16 Q10 14 14 12Z" opacity="0.6" />
      <path d="M24 11 Q28 14 32 16 Q30 14 26 12Z" opacity="0.6" />
      {/* Tail */}
      <path d="M14 11 L10 13 L9 11 L14 10Z" />
    </svg>
  );
}

export function BirdOnBranch({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Branch */}
      <path d="M0 26 Q12 24 24 25 Q36 26 48 24" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Small leaves on branch */}
      <ellipse cx="8" cy="24" rx="2" ry="1" transform="rotate(-20 8 24)" opacity="0.4" />
      <ellipse cx="36" cy="25" rx="2" ry="1" transform="rotate(15 36 25)" opacity="0.4" />
      <ellipse cx="42" cy="24" rx="1.5" ry="0.8" transform="rotate(-10 42 24)" opacity="0.4" />
      {/* Bird body */}
      <ellipse cx="22" cy="20" rx="6" ry="4" />
      {/* Head */}
      <circle cx="28" cy="16" r="3" />
      {/* Eye */}
      <circle cx="29.5" cy="15.5" r="0.8" fill="white" />
      <circle cx="29.7" cy="15.3" r="0.4" />
      {/* Beak */}
      <path d="M30.5 16 L34 15 L30.5 17Z" />
      {/* Wing */}
      <path d="M18 18 Q20 15 24 16 Q26 17 26 19" fill="none" stroke="currentColor" strokeWidth="0.8" />
      {/* Tail */}
      <path d="M16 19 L11 17 L12 20Z" />
      <path d="M16 20 L10 19 L12 21Z" />
      {/* Legs gripping branch */}
      <path d="M20 24 L19 25 Q18 26 19.5 26" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M24 24 L25 25 Q26 26 24.5 26" fill="none" stroke="currentColor" strokeWidth="0.8" />
      {/* Musical notes floating from beak */}
      <circle cx="34" cy="12" r="1" opacity="0.3" />
      <line x1="35" y1="12" x2="35" y2="8" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <circle cx="37" cy="9" r="0.8" opacity="0.2" />
      <line x1="37.8" y1="9" x2="37.8" y2="6" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
    </svg>
  );
}

export function LampPost({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Ornate base */}
      <path d="M10 60 L26 60 L24 57 Q22 56 20 56 L16 56 Q14 56 12 57 Z" />
      <rect x="15" y="54" width="6" height="2" rx="0.5" />
      {/* Post with taper */}
      <path d="M16.5 54 L16 20 L20 20 L19.5 54Z" />
      {/* Ornamental rings */}
      <rect x="15" y="42" width="6" height="1.5" rx="0.5" />
      <rect x="14.5" y="34" width="7" height="1.5" rx="0.5" />
      <rect x="15" y="26" width="6" height="1.5" rx="0.5" />
      {/* Scroll bracket left */}
      <path d="M16 20 Q12 19 10 16 Q9 14 10 12 L12 13 Q11 15 12 16 Q14 18 16 18" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {/* Scroll bracket right */}
      <path d="M20 20 Q24 19 26 16 Q27 14 26 12 L24 13 Q25 15 24 16 Q22 18 20 18" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {/* Lamp housing - ornate */}
      <path d="M8 12 L10 6 L12 3 L14 1 L18 0 L22 1 L24 3 L26 6 L28 12 L26 12 L24 7 L22 4 L18 2.5 L14 4 L12 7 L10 12Z" />
      {/* Glass panels with cross bars */}
      <rect x="11" y="6" width="5" height="6" rx="0.5" opacity="0.2" />
      <rect x="20" y="6" width="5" height="6" rx="0.5" opacity="0.2" />
      <line x1="11" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
      <line x1="20" y1="9" x2="25" y2="9" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
      {/* Top finial */}
      <circle cx="18" cy="0" r="1.5" />
      {/* Light glow lines */}
      <line x1="7" y1="8" x2="4" y2="7" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      <line x1="29" y1="8" x2="32" y2="7" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      <line x1="7" y1="11" x2="4" y2="12" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      <line x1="29" y1="11" x2="32" y2="12" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
    </svg>
  );
}

export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M10 14 Q9 18 10 22 Q11 25 10 28" fill="none" stroke="currentColor" strokeWidth="0.8" />
      {/* Leaves on stem */}
      <path d="M10 18 Q6 16 4 18 Q6 19 10 18Z" opacity="0.5" />
      <path d="M10 22 Q14 20 16 22 Q14 23 10 22Z" opacity="0.5" />
      {/* Petals */}
      <ellipse cx="10" cy="5" rx="2.2" ry="4" />
      <ellipse cx="10" cy="13" rx="2.2" ry="4" />
      <ellipse cx="5" cy="9" rx="4" ry="2.2" />
      <ellipse cx="15" cy="9" rx="4" ry="2.2" />
      <ellipse cx="6.5" cy="5.5" rx="2.2" ry="4" transform="rotate(-45 6.5 5.5)" />
      <ellipse cx="13.5" cy="12.5" rx="2.2" ry="4" transform="rotate(-45 13.5 12.5)" />
      <ellipse cx="13.5" cy="5.5" rx="2.2" ry="4" transform="rotate(45 13.5 5.5)" />
      <ellipse cx="6.5" cy="12.5" rx="2.2" ry="4" transform="rotate(45 6.5 12.5)" />
      {/* Center with detail */}
      <circle cx="10" cy="9" r="3" />
      <circle cx="10" cy="9" r="1.5" opacity="0.3" fill="white" />
    </svg>
  );
}

export function FlowerCluster({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Stems */}
      <path d="M12 12 Q11 15 12 20" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <path d="M20 10 Q20 14 20 20" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <path d="M28 12 Q29 15 28 20" fill="none" stroke="currentColor" strokeWidth="0.6" />
      {/* Leaves */}
      <path d="M12 16 Q9 15 8 16 Q9 17 12 16Z" opacity="0.4" />
      <path d="M20 15 Q23 14 24 15 Q23 16 20 15Z" opacity="0.4" />
      <path d="M28 16 Q25 15 24 16 Q25 17 28 16Z" opacity="0.4" />
      {/* Flower 1 - small */}
      <circle cx="12" cy="8" r="1.5" /><circle cx="12" cy="12" r="1.5" />
      <circle cx="9.5" cy="10" r="1.5" /><circle cx="14.5" cy="10" r="1.5" />
      <circle cx="12" cy="10" r="2" />
      {/* Flower 2 - medium */}
      <circle cx="20" cy="5.5" r="2" /><circle cx="20" cy="10.5" r="2" />
      <circle cx="17" cy="8" r="2" /><circle cx="23" cy="8" r="2" />
      <circle cx="20" cy="8" r="2.5" />
      {/* Flower 3 - small bud */}
      <ellipse cx="28" cy="9" rx="2" ry="3" />
      <circle cx="28" cy="9" r="1.5" opacity="0.5" fill="white" />
    </svg>
  );
}

export function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Upper wings */}
      <path d="M15 11 Q10 4 5 2 Q2 1 1 3 Q0 6 3 9 Q6 12 15 11Z" />
      <path d="M15 11 Q20 4 25 2 Q28 1 29 3 Q30 6 27 9 Q24 12 15 11Z" />
      {/* Lower wings */}
      <path d="M15 11 Q10 16 6 18 Q4 19 3 17 Q2 15 4 13 Q7 11 15 11Z" />
      <path d="M15 11 Q20 16 24 18 Q26 19 27 17 Q28 15 26 13 Q23 11 15 11Z" />
      {/* Wing patterns */}
      <circle cx="7" cy="6" r="1.5" opacity="0.15" fill="white" />
      <circle cx="23" cy="6" r="1.5" opacity="0.15" fill="white" />
      <circle cx="8" cy="15" r="1" opacity="0.15" fill="white" />
      <circle cx="22" cy="15" r="1" opacity="0.15" fill="white" />
      {/* Body */}
      <ellipse cx="15" cy="11" rx="1" ry="4" />
      {/* Antennae with curls */}
      <path d="M15 7 Q12 3 10 1 Q9 0 8 1" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <path d="M15 7 Q18 3 20 1 Q21 0 22 1" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="8" cy="1" r="0.7" />
      <circle cx="22" cy="1" r="0.7" />
    </svg>
  );
}

export function Quill({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Feather plume */}
      <path d="M16 0 Q8 8 6 16 Q4 22 8 24 L10 22 Q6 18 10 12 Q12 8 16 4Z" opacity="0.7" />
      <path d="M16 0 Q24 8 26 16 Q28 22 24 24 L22 22 Q26 18 22 12 Q20 8 16 4Z" opacity="0.7" />
      {/* Feather detail lines */}
      <path d="M16 2 Q12 8 10 14" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
      <path d="M16 2 Q20 8 22 14" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
      {/* Quill shaft */}
      <line x1="16" y1="8" x2="16" y2="44" stroke="currentColor" strokeWidth="1.2" />
      {/* Nib */}
      <path d="M15 44 L16 50 L17 44Z" />
      <path d="M14.5 42 L17.5 42 L17 44 L15 44Z" opacity="0.6" />
      {/* Ink drops */}
      <circle cx="17" cy="48" r="0.8" opacity="0.4" />
      <circle cx="19" cy="49" r="0.5" opacity="0.3" />
    </svg>
  );
}

export function MusicStand({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Stand pole */}
      <rect x="19" y="22" width="2" height="24" />
      {/* Tripod base */}
      <path d="M20 46 L10 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M20 46 L30 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M20 46 L20 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Music desk - angled */}
      <rect x="5" y="4" width="30" height="20" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Sheet music lines */}
      <line x1="8" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
      <line x1="8" y1="10.5" x2="32" y2="10.5" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
      <line x1="8" y1="13" x2="32" y2="13" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
      <line x1="8" y1="15.5" x2="32" y2="15.5" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
      <line x1="8" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
      {/* A few notes on the stand */}
      <ellipse cx="12" cy="10.5" rx="1.5" ry="1" transform="rotate(-10 12 10.5)" opacity="0.4" />
      <ellipse cx="20" cy="13" rx="1.5" ry="1" transform="rotate(-10 20 13)" opacity="0.4" />
      <ellipse cx="27" cy="8" rx="1.5" ry="1" transform="rotate(-10 27 8)" opacity="0.4" />
      {/* Lip at bottom of desk */}
      <path d="M5 24 L5 26 L35 26 L35 24" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function TrebleClefVine({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Treble clef shape */}
      <path d="M12 4 Q8 8 8 14 Q8 20 12 22 Q16 24 16 18 Q16 14 12 12 Q8 10 8 14 Q8 18 12 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 20 L12 36" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 36 Q10 40 8 40 Q6 40 6 38 Q6 36 8 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="4" r="1.5" />
      {/* Vine leaves growing from clef */}
      <path d="M16 16 Q20 14 22 16 Q20 18 16 16Z" opacity="0.4" />
      <path d="M8 26 Q4 24 2 26 Q4 28 8 26Z" opacity="0.4" />
      <path d="M16 30 Q20 28 22 30 Q20 32 16 30Z" opacity="0.4" />
      {/* Small buds */}
      <circle cx="22" cy="16" r="1" opacity="0.3" />
      <circle cx="2" cy="26" r="1" opacity="0.3" />
      <circle cx="22" cy="30" r="0.8" opacity="0.3" />
    </svg>
  );
}

export function Candelabra({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 44 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Base */}
      <ellipse cx="22" cy="48" rx="10" ry="2" />
      <rect x="20" y="44" width="4" height="4" rx="0.5" />
      {/* Central stem */}
      <rect x="21" y="20" width="2" height="24" />
      {/* Ornamental knob */}
      <circle cx="22" cy="32" r="2" />
      {/* Left arm */}
      <path d="M21 24 Q16 22 12 18 Q10 16 10 14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Right arm */}
      <path d="M23 24 Q28 22 32 18 Q34 16 34 14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Candle holders */}
      <rect x="8" y="12" width="4" height="2" rx="0.5" />
      <rect x="20" y="18" width="4" height="2" rx="0.5" />
      <rect x="32" y="12" width="4" height="2" rx="0.5" />
      {/* Candles */}
      <rect x="9" y="6" width="2" height="6" rx="0.3" opacity="0.7" />
      <rect x="21" y="12" width="2" height="6" rx="0.3" opacity="0.7" />
      <rect x="33" y="6" width="2" height="6" rx="0.3" opacity="0.7" />
      {/* Flames */}
      <path d="M10 6 Q9 3 10 1 Q11 3 10 6Z" opacity="0.5" />
      <path d="M22 12 Q21 9 22 7 Q23 9 22 12Z" opacity="0.5" />
      <path d="M34 6 Q33 3 34 1 Q35 3 34 6Z" opacity="0.5" />
    </svg>
  );
}

export function GrandPiano({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Piano body */}
      <path d="M10 20 Q8 10 15 6 Q25 2 40 4 Q50 6 52 12 L52 22 Q50 24 40 25 Q25 26 10 24Z" />
      {/* Lid open */}
      <path d="M15 6 Q25 2 40 4 Q50 6 52 12 L50 10 Q42 5 30 4 Q20 4 15 6Z" opacity="0.6" />
      {/* Lid prop */}
      <line x1="35" y1="5" x2="38" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      {/* Keys area */}
      <rect x="10" y="22" width="30" height="4" fill="white" stroke="currentColor" strokeWidth="0.5" />
      {/* Black keys */}
      <rect x="13" y="22" width="2" height="2.5" /><rect x="17" y="22" width="2" height="2.5" />
      <rect x="23" y="22" width="2" height="2.5" /><rect x="27" y="22" width="2" height="2.5" />
      <rect x="31" y="22" width="2" height="2.5" /><rect x="35" y="22" width="2" height="2.5" />
      {/* Legs */}
      <rect x="12" y="26" width="2" height="12" rx="0.5" />
      <rect x="36" y="26" width="2" height="12" rx="0.5" />
      <path d="M50 24 L52 26 L52 38 L50 38Z" />
      {/* Pedals */}
      <rect x="22" y="37" width="2" height="2" rx="0.3" opacity="0.5" />
      <rect x="26" y="37" width="2" height="2" rx="0.3" opacity="0.5" />
      <rect x="30" y="37" width="2" height="2" rx="0.3" opacity="0.5" />
    </svg>
  );
}

export function MusicalNotes({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Eighth note */}
      <ellipse cx="8" cy="18" rx="3" ry="2.2" transform="rotate(-15 8 18)" />
      <line x1="11" y1="17" x2="11" y2="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 4 Q14 6 16 4 Q18 2 20 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {/* Quarter note */}
      <ellipse cx="20" cy="14" rx="3" ry="2.2" transform="rotate(-15 20 14)" />
      <line x1="23" y1="13" x2="23" y2="2" stroke="currentColor" strokeWidth="1.2" />
      {/* Floating dots */}
      <circle cx="28" cy="8" r="1" opacity="0.3" />
      <circle cx="32" cy="12" r="0.8" opacity="0.2" />
      <circle cx="4" cy="10" r="0.6" opacity="0.2" />
    </svg>
  );
}

/** Pre-built decoration sets to assign to cards by index */
const cardDecorations: Array<(props: { className: string }) => React.ReactNode> = [
  ({ className }) => <CatSitting className={className} />,
  ({ className }) => <BirdOnBranch className={className} />,
  ({ className }) => <FlowerCluster className={className} />,
  ({ className }) => <Butterfly className={className} />,
  ({ className }) => <CatWalking className={className} />,
  ({ className }) => <MusicalNotes className={className} />,
  ({ className }) => <CatStretching className={className} />,
  ({ className }) => <Bird className={className} />,
];

export function CardDecoration({ index }: { index: number }) {
  const DecoComponent = cardDecorations[index % cardDecorations.length];
  const positions = [
    "absolute -top-9 right-4 w-8 h-7",       // cat sitting
    "absolute -top-8 right-2 w-12 h-8",       // bird on branch
    "absolute -top-5 left-14 w-10 h-5",       // flower cluster
    "absolute -top-6 left-16 w-7 h-5",        // butterfly
    "absolute -top-7 right-6 w-12 h-7",       // cat walking
    "absolute -top-6 left-14 w-8 h-5",        // musical notes
    "absolute -top-6 right-4 w-11 h-6",       // cat stretching
    "absolute -top-6 right-10 w-7 h-5",       // bird
  ];
  const pos = positions[index % positions.length];
  return (
    <div className="pointer-events-none text-neutral-600">
      <DecoComponent className={pos} />
    </div>
  );
}
