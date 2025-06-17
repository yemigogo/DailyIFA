interface OduVisualizationProps {
  oduName: string;
  pattern: boolean[][];
  size?: number;
  className?: string;
}

// Sacred Odu patterns for timeline visualization (vertical legs format)
const SACRED_ODU_PATTERNS = {
  "Eji Ogbe": [
    [true, true, true, true], // Right leg
    [true, true, true, true]  // Left leg
  ],
  "Oyeku Meji": [
    [false, false, false, false], // Right leg
    [false, false, false, false]  // Left leg
  ],
  "Iwori Meji": [
    [false, true, false, true], // Right leg
    [false, true, false, true]  // Left leg
  ],
  "Odi Meji": [
    [true, false, false, true], // Right leg
    [true, false, false, true]  // Left leg
  ],
  "Irosun Meji": [
    [true, true, false, false], // Right leg
    [true, true, false, false]  // Left leg
  ],
  "Owonrin Meji": [
    [false, false, true, true], // Right leg
    [false, false, true, true]  // Left leg
  ],
  "Obara Meji": [
    [true, false, true, false], // Right leg
    [true, false, true, false]  // Left leg
  ],
  "Okanran Meji": [
    [false, true, true, false], // Right leg
    [false, true, true, false]  // Left leg
  ]
};

export default function OduVisualization({ 
  oduName, 
  pattern, 
  size = 40, 
  className = "" 
}: OduVisualizationProps) {
  // Use provided pattern or fall back to sacred patterns
  const displayPattern = pattern || SACRED_ODU_PATTERNS[oduName as keyof typeof SACRED_ODU_PATTERNS] || SACRED_ODU_PATTERNS["Eji Ogbe"];

  return (
    <div className={`inline-flex items-center justify-center gap-2 ${className}`}>
      {/* Traditional vertical Ifa pattern: two legs side by side */}
      {displayPattern.map((leg, legIndex) => (
        <div key={legIndex} className="flex flex-col gap-1">
          {leg.map((mark, markIndex) => (
            <div
              key={markIndex}
              className={`rounded-sm border ${
                mark 
                  ? 'bg-amber-600 border-amber-700' 
                  : 'bg-amber-100 border-amber-300 dark:bg-amber-900 dark:border-amber-700'
              }`}
              style={{ 
                width: `${size / 10}px`, 
                height: `${size / 20}px` 
              }}
              title={`${legIndex === 0 ? 'Right' : 'Left'} leg, mark ${markIndex + 1}`}
            />
          ))}
        </div>
      ))}
      {oduName && (
        <div className="text-xs text-center text-amber-700 dark:text-amber-300 ml-2 font-medium">
          {oduName}
        </div>
      )}
    </div>
  );
}