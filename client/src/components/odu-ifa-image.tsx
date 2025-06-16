interface OduIfaImageProps {
  oduName: string;
  size?: number;
  className?: string;
}

// Traditional Odu Ifa visual representations with authentic patterns
const ODU_IFA_IMAGES = {
  "Eji Ogbe": {
    pattern: [
      [true, true],
      [true, true],
      [true, true], 
      [true, true]
    ],
    meaning: "Light, Strength, Leadership",
    meaningYoruba: "Ìmọ́lẹ̀, Agbára, Aṣáájú"
  },
  "Iwori Meji": {
    pattern: [
      [false, true],
      [false, true],
      [false, true],
      [false, true]
    ],
    meaning: "Wisdom, Revelation, Knowledge",
    meaningYoruba: "Ọgbọ́n, Ìfihàn, Ìmọ̀"
  },
  "Obara Meji": {
    pattern: [
      [false, true],
      [true, true],
      [true, true],
      [false, true]
    ],
    meaning: "Completion, Perfection, Order",
    meaningYoruba: "Ìparí, Ìpéye, Ètò"
  }
};

export default function OduIfaImage({ 
  oduName, 
  size = 120, 
  className = "" 
}: OduIfaImageProps) {
  const oduData = ODU_IFA_IMAGES[oduName as keyof typeof ODU_IFA_IMAGES];
  
  if (!oduData) return null;

  const cellSize = size / 6;
  const strokeWidth = Math.max(1, cellSize / 8);

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Sacred Pattern Display */}
      <div className="relative">
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-lg"
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth}
            fill="url(#amberGradient)"
            stroke="#b45309"
            strokeWidth={strokeWidth}
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
          </defs>
          
          {/* Odu Pattern in Center */}
          <g transform={`translate(${size / 2 - cellSize}, ${size / 2 - cellSize * 2})`}>
            {oduData.pattern.map((row, rowIndex) => (
              <g key={rowIndex} transform={`translate(0, ${rowIndex * cellSize})`}>
                {row.map((mark, colIndex) => (
                  <rect
                    key={colIndex}
                    x={colIndex * cellSize}
                    y={0}
                    width={cellSize * 0.8}
                    height={cellSize * 0.8}
                    rx={cellSize * 0.1}
                    fill={mark ? "#ffffff" : "url(#darkGradient)"}
                    stroke={mark ? "#d97706" : "#78716c"}
                    strokeWidth={strokeWidth / 2}
                  />
                ))}
              </g>
            ))}
          </g>
          
          {/* Sacred Symbols Around Border */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const radius = size / 2 - strokeWidth * 3;
            const x = size / 2 + Math.cos(angle) * radius;
            const y = size / 2 + Math.sin(angle) * radius;
            
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={strokeWidth}
                fill="#92400e"
                opacity={0.6}
              />
            );
          })}
        </svg>
      </div>
      
      {/* Odu Name */}
      <div className="mt-3 text-center">
        <h4 className="font-bold text-amber-900 dark:text-amber-100 text-sm">
          {oduName}
        </h4>
        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
          {oduData.meaning}
        </p>
        <p className="text-xs text-amber-600 dark:text-amber-400 italic">
          {oduData.meaningYoruba}
        </p>
      </div>
    </div>
  );
}