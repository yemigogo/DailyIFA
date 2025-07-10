import React from 'react';
import EjiOgbeImage from '@/components/eji-ogbe-image';
import OyekuMejiImage from '@/components/oyeku-meji-image';
import IdiMejiImage from '@/components/idi-meji-image';
import IrosunMejiImage from '@/components/irosun-meji-image';
import OwonrinMejiImage from '@/components/owonrin-meji-image';
import ObaraMejiImage from '@/components/obara-meji-image';
import IworiMejiImage from '@/components/iwori-meji-image';
import OkanranMejiImage from '@/components/okanran-meji-image';
import OgundaMejiImage from '@/components/ogunda-meji-image';
import OsaMejiImage from '@/components/osa-meji-image';
import IkaMejiImage from '@/components/ika-meji-image';

interface OduTraditionalImageProps {
  oduName: string;
  pattern: boolean[][];
  size?: number;
  className?: string;
}

// Traditional Odu Ifa sacred symbols and visual representations
const ODU_TRADITIONAL_SYMBOLS = {
  "Ogbe Meji": {
    symbol: "||||  ||||",
    meaning: "Double Light, Divine Clarity",
    element: "Light/Fire",
    colors: ["#FFD700", "#FFA500"],
    sacredLines: 8,
    description: "Eight unbroken lines representing divine illumination"
  },
  "Oyeku Meji": {
    symbol: "||  ||  ||  ||",
    meaning: "Double Darkness, Mystery",
    element: "Darkness/Water", 
    colors: ["#2C3E50", "#34495E"],
    sacredLines: 8,
    description: "Eight broken lines representing hidden wisdom"
  },
  "Iwori Meji": {
    symbol: "|| |  || |",
    meaning: "Sacred Wisdom Emerging",
    element: "Earth/Metal",
    colors: ["#8B4513", "#CD853F"],
    sacredLines: 6,
    description: "Mixed lines showing wisdom through experience"
  },
  "Odi Meji": {
    symbol: "| ||  | ||",
    meaning: "Foundation and Stability",
    element: "Earth",
    colors: ["#654321", "#D2691E"],
    sacredLines: 6,
    description: "Alternating pattern showing balance"
  },
  "Irosun Meji": {
    symbol: "|||| ",
    meaning: "Inner Light Rising",
    element: "Fire/Air",
    colors: ["#FF6B35", "#F7931E"],
    sacredLines: 4,
    description: "Rising energy pattern"
  },
  "Owonrin Meji": {
    symbol: "  ||||",
    meaning: "Transformation Through Challenges",
    element: "Air/Water",
    colors: ["#4A90E2", "#7ED321"],
    sacredLines: 4,
    description: "Energy moving from below"
  }
};

export default function OduTraditionalImage({ 
  oduName, 
  pattern, 
  size = 120, 
  className = "" 
}: OduTraditionalImageProps) {
  // Use authentic images for specific Odu
  if (oduName === "Eji Ogbe" || oduName === "Ogbe Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <EjiOgbeImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Oyeku Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <OyekuMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Idi Meji" || oduName === "Odi Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <IdiMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Irosun Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <IrosunMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Owonrin Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <OwonrinMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Obara Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <ObaraMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Iwori Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <IworiMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Okanran Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <OkanranMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Ogunda Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <OgundaMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Osa Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <OsaMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  if (oduName === "Ika Meji") {
    const imageSize = size <= 60 ? 'small' : size <= 150 ? 'medium' : 'large';
    return <IkaMejiImage size={imageSize} className={className} showCaption={false} />;
  }
  
  // For other Odu without authentic images, continue with geometric patterns

  const oduData = ODU_TRADITIONAL_SYMBOLS[oduName as keyof typeof ODU_TRADITIONAL_SYMBOLS];
  
  if (!oduData) {
    // Default pattern visualization for unknown Odu
    return (
      <div className={`inline-flex flex-col items-center ${className}`}>
        <div className="relative p-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg border-2 border-amber-400">
          <svg width={size} height={size * 0.8} viewBox={`0 0 ${size} ${size * 0.8}`}>
            {pattern.map((leg, legIndex) => (
              <g key={legIndex} transform={`translate(${legIndex * (size/3)}, 0)`}>
                {leg.map((mark, markIndex) => (
                  <rect
                    key={markIndex}
                    x={size/6}
                    y={markIndex * (size/6)}
                    width={mark ? size/8 : size/12}
                    height={size/16}
                    rx={2}
                    fill={mark ? "#d97706" : "#92400e"}
                    opacity={mark ? 1 : 0.6}
                  />
                ))}
              </g>
            ))}
          </svg>
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold text-amber-900">{oduName}</p>
        </div>
      </div>
    );
  }

  const primaryColor = oduData.colors[0];
  const secondaryColor = oduData.colors[1];

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Traditional Odu Sacred Image */}
      <div 
        className="relative p-6 rounded-lg shadow-lg border-2"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`,
          borderColor: primaryColor 
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background Circle with Sacred Geometry */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}
            fill="url(#oduGradient)"
            stroke={primaryColor}
            strokeWidth="2"
          />
          
          {/* Gradient Definitions */}
          <defs>
            <radialGradient id="oduGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor={primaryColor + "40"} />
              <stop offset="100%" stopColor={secondaryColor + "60"} />
            </radialGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>

          {/* Traditional Odu Pattern Lines */}
          <g transform={`translate(${size/4}, ${size/4})`}>
            {pattern.map((leg, legIndex) => (
              <g key={legIndex} transform={`translate(${legIndex * (size/4)}, 0)`}>
                {leg.map((mark, markIndex) => {
                  const lineY = markIndex * (size/8);
                  const lineWidth = mark ? size/6 : size/8;
                  const gaps = mark ? 0 : 2;
                  
                  if (mark) {
                    // Solid line for true values
                    return (
                      <rect
                        key={markIndex}
                        x={0}
                        y={lineY}
                        width={lineWidth}
                        height={4}
                        rx={1}
                        fill="url(#lineGradient)"
                        stroke={primaryColor}
                        strokeWidth="0.5"
                      />
                    );
                  } else {
                    // Broken line for false values (traditional Ifa style)
                    return (
                      <g key={markIndex}>
                        <rect
                          x={0}
                          y={lineY}
                          width={lineWidth/2 - gaps}
                          height={4}
                          rx={1}
                          fill="url(#lineGradient)"
                          stroke={primaryColor}
                          strokeWidth="0.5"
                        />
                        <rect
                          x={lineWidth/2 + gaps}
                          y={lineY}
                          width={lineWidth/2 - gaps}
                          height={4}
                          rx={1}
                          fill="url(#lineGradient)"
                          stroke={primaryColor}
                          strokeWidth="0.5"
                        />
                      </g>
                    );
                  }
                })}
              </g>
            ))}
          </g>

          {/* Sacred Element Symbol */}
          <g transform={`translate(${size/2}, ${size/2 + size/3})`}>
            <circle
              cx={0}
              cy={0}
              r={size/12}
              fill={primaryColor + "80"}
              stroke={secondaryColor}
              strokeWidth="1"
            />
            <text
              x={0}
              y={2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size/16}
              fill="white"
              fontWeight="bold"
            >
              {oduData.element.charAt(0)}
            </text>
          </g>

          {/* Traditional Corner Markings */}
          {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = size/2 + Math.cos(rad) * (size/2 - 12);
            const y = size/2 + Math.sin(rad) * (size/2 - 12);
            
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={2}
                fill={primaryColor}
                opacity={0.8}
              />
            );
          })}
        </svg>
      </div>

      {/* Odu Information */}
      <div className="mt-3 text-center max-w-xs">
        <h4 className="font-bold text-lg" style={{ color: primaryColor }}>
          {oduName}
        </h4>
        <p className="text-sm font-medium" style={{ color: secondaryColor }}>
          {oduData.meaning}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          {oduData.description}
        </p>
        <div className="flex justify-center items-center mt-2 space-x-2">
          <span 
            className="px-2 py-1 text-xs rounded-full text-white font-medium"
            style={{ backgroundColor: primaryColor }}
          >
            {oduData.element}
          </span>
          <span className="text-xs text-gray-500">
            {oduData.sacredLines} Sacred Lines
          </span>
        </div>
      </div>
    </div>
  );
}