export function SheetMusicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="staff-lines" x="0" y="0" width="100%" height="120" patternUnits="userSpaceOnUse">
            <line x1="0" y1="20" x2="100%" y2="20" stroke="black" strokeWidth="1.5" />
            <line x1="0" y1="35" x2="100%" y2="35" stroke="black" strokeWidth="1.5" />
            <line x1="0" y1="50" x2="100%" y2="50" stroke="black" strokeWidth="1.5" />
            <line x1="0" y1="65" x2="100%" y2="65" stroke="black" strokeWidth="1.5" />
            <line x1="0" y1="80" x2="100%" y2="80" stroke="black" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#staff-lines)" />
        
        {/* Musical notes scattered */}
        <g opacity="0.6">
          <text x="10%" y="30" fontSize="24" fontFamily="serif">𝅘𝅥𝅮</text>
          <text x="25%" y="55" fontSize="28" fontFamily="serif">𝅘𝅥</text>
          <text x="40%" y="75" fontSize="26" fontFamily="serif">𝅗𝅥</text>
          <text x="60%" y="140" fontSize="24" fontFamily="serif">𝅘𝅥𝅮</text>
          <text x="75%" y="165" fontSize="28" fontFamily="serif">𝅘𝅥</text>
          <text x="90%" y="45" fontSize="26" fontFamily="serif">𝅗𝅥</text>
          <text x="15%" y="190" fontSize="24" fontFamily="serif">𝅘𝅥𝅮</text>
          <text x="55%" y="220" fontSize="28" fontFamily="serif">𝅘𝅥</text>
          <text x="85%" y="195" fontSize="26" fontFamily="serif">𝅗𝅥</text>
        </g>
      </svg>
    </div>
  );
}
