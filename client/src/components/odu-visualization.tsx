interface OduVisualizationProps {
  oduName: string;
  pattern: boolean[][];
  size?: number;
  className?: string;
}

// Sacred Odu patterns for timeline visualization
const SACRED_ODU_PATTERNS = {
  "Eji Ogbe": [
    [true, true],
    [true, true],
    [true, true],
    [true, true]
  ],
  "Oyeku Meji": [
    [false, false],
    [false, false],
    [false, false],
    [false, false]
  ],
  "Iwori Meji": [
    [false, true],
    [false, true],
    [false, true],
    [false, true]
  ],
  "Odi Meji": [
    [true, false],
    [true, true],
    [true, false],
    [true, false]
  ],
  "Irosun Meji": [
    [true, false],
    [false, false],
    [true, false],
    [false, true]
  ],
  "Owonrin Meji": [
    [true, true],
    [false, false],
    [true, true],
    [false, false]
  ],
  "Obara Meji": [
    [false, true],
    [true, true],
    [true, true],
    [false, true]
  ],
  "Okanran Meji": [
    [true, true],
    [true, false],
    [false, false],
    [true, true]
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
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      {displayPattern.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((mark, colIndex) => (
            <div
              key={colIndex}
              className={`rounded-sm border ${
                mark 
                  ? 'bg-amber-600 border-amber-700' 
                  : 'bg-amber-100 border-amber-300 dark:bg-amber-900 dark:border-amber-700'
              }`}
              style={{ 
                width: `${size / 8}px`, 
                height: `${size / 8}px` 
              }}
            />
          ))}
        </div>
      ))}
      {oduName && (
        <div className="text-xs text-center text-amber-700 dark:text-amber-300 mt-1 font-medium">
          {oduName}
        </div>
      )}
    </div>
  );
}