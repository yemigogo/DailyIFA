interface OduIfaImageProps {
  oduName: string;
  size?: number;
  className?: string;
}

// Traditional Odu Ifa visual representations with authentic patterns and sacred symbols
const ODU_IFA_IMAGES = {
  "Eji Ogbe": {
    pattern: [
      [true, true, true, true], // Right leg (vertical marks)
      [true, true, true, true]  // Left leg (vertical marks)
    ],
    symbol: "⚌", // Double solid lines representing unity and strength
    sacredGeometry: "circle",
    meaning: "Light, Strength, Leadership",
    meaningYoruba: "Ìmọ́lẹ̀, Agbára, Aṣáájú"
  },
  "Iwori Meji": {
    pattern: [
      [false, true, false, true], // Right leg 
      [false, true, false, true]  // Left leg
    ],
    symbol: "⚍", // Mixed lines representing wisdom emerging from mystery
    sacredGeometry: "triangle",
    meaning: "Wisdom, Revelation, Knowledge",
    meaningYoruba: "Ọgbọ́n, Ìfihàn, Ìmọ̀"
  },
  "Obara Meji": {
    pattern: [
      [true, false, true, false], // Right leg
      [true, false, true, false]  // Left leg  
    ],
    symbol: "⚏", // Balanced pattern representing completion
    sacredGeometry: "hexagon",
    meaning: "Completion, Perfection, Order",
    meaningYoruba: "Ìparí, Ìpéye, Ètò"
  },
  "Owonrin Meji": {
    pattern: [
      [false, false, true, true], // Right leg
      [false, false, true, true]  // Left leg
    ],
    symbol: "⚎", // Alternating pattern representing transformation
    sacredGeometry: "spiral",
    meaning: "Transformation, Change, Movement",
    meaningYoruba: "Ìyípadà, Àyípo, Ìgbésẹ̀"
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
          
          {/* Sacred Symbol in Center */}
          <g transform={`translate(${size / 2}, ${size / 2 - cellSize})`}>
            {/* Central Sacred Symbol */}
            <text
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size / 4}
              fill="#ffffff"
              fontWeight="bold"
              style={{ fontFamily: 'serif' }}
            >
              {oduData.symbol}
            </text>
            
            {/* Sacred Geometry Pattern based on Odu */}
            {oduData.sacredGeometry === "circle" && (
              <circle
                cx={0}
                cy={cellSize}
                r={cellSize * 0.6}
                fill="none"
                stroke="#ffffff"
                strokeWidth={strokeWidth}
                opacity={0.7}
              />
            )}
            
            {oduData.sacredGeometry === "triangle" && (
              <polygon
                points={`0,${cellSize - cellSize * 0.6} ${cellSize * 0.6},${cellSize + cellSize * 0.3} ${-cellSize * 0.6},${cellSize + cellSize * 0.3}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth={strokeWidth}
                opacity={0.7}
              />
            )}
            
            {oduData.sacredGeometry === "hexagon" && (
              <polygon
                points={`${cellSize * 0.5},${cellSize - cellSize * 0.3} ${cellSize * 0.25},${cellSize} ${-cellSize * 0.25},${cellSize} ${-cellSize * 0.5},${cellSize + cellSize * 0.3} ${-cellSize * 0.25},${cellSize + cellSize * 0.6} ${cellSize * 0.25},${cellSize + cellSize * 0.6}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth={strokeWidth}
                opacity={0.7}
              />
            )}
            
            {oduData.sacredGeometry === "spiral" && (
              <path
                d={`M 0 ${cellSize} Q ${cellSize * 0.3} ${cellSize - cellSize * 0.3} ${cellSize * 0.6} ${cellSize} Q ${cellSize * 0.3} ${cellSize + cellSize * 0.3} 0 ${cellSize} Q ${-cellSize * 0.3} ${cellSize - cellSize * 0.3} ${-cellSize * 0.6} ${cellSize}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth={strokeWidth}
                opacity={0.7}
              />
            )}
          </g>

          {/* Traditional Vertical Odu Pattern Below Symbol */}
          <g transform={`translate(${size / 2 - cellSize * 0.6}, ${size / 2 + cellSize * 1.2})`}>
            {oduData.pattern.map((leg, legIndex) => (
              <g key={legIndex} transform={`translate(${legIndex * (cellSize * 0.8)}, 0)`}>
                {leg.map((mark, markIndex) => (
                  <rect
                    key={markIndex}
                    x={0}
                    y={markIndex * (cellSize * 0.25)}
                    width={cellSize * 0.4}
                    height={cellSize * 0.15}
                    rx={cellSize * 0.02}
                    fill={mark ? "#ffffff" : "url(#darkGradient)"}
                    stroke={mark ? "#d97706" : "#78716c"}
                    strokeWidth={strokeWidth / 3}
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