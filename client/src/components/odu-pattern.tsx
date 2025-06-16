interface OduPatternProps {
  pattern: boolean[][];
  className?: string;
}

export default function OduPattern({ pattern, className = "" }: OduPatternProps) {
  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      {pattern.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col space-y-1">
          {column.map((mark, markIndex) => (
            <div
              key={markIndex}
              className={`w-6 h-1 rounded ${
                mark ? "bg-sacred-gold" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
