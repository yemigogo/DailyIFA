interface OduPatternProps {
  pattern: boolean[][];
  className?: string;
}

export default function OduPattern({ pattern, className = "" }: OduPatternProps) {
  // Traditional Ifa pattern: 2 columns (legs), 4 rows each, displayed vertically
  return (
    <div className={`flex justify-center space-x-4 ${className}`}>
      {pattern.map((leg, legIndex) => (
        <div key={legIndex} className="flex flex-col space-y-2">
          {leg.map((mark, markIndex) => (
            <div
              key={markIndex}
              className={`w-8 h-2 rounded ${
                mark ? "bg-sacred-gold shadow-sm" : "bg-gray-300"
              } transition-colors`}
              title={`${legIndex === 0 ? 'Right' : 'Left'} leg, mark ${markIndex + 1}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
