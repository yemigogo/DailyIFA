import ofunMejiImage from '@assets/image_1752180065606.png';

interface OfunMejiImageProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showCaption?: boolean;
}

/**
 * Ofun Meji Image Component
 * Pattern: II II, I I, II II, I I
 * Meaning: Completion, spiritual fulfillment, divine blessing
 * Yoruba: Ìparí, ìtẹ́lọ́rùn ẹ̀mí, ìbùkún òrìṣà
 */
export default function OfunMejiImage({ 
  size = 'medium', 
  className = '',
  showCaption = true 
}: OfunMejiImageProps) {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32', 
    large: 'w-48 h-48'
  };

  const containerClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <div className={`inline-flex flex-col items-center space-y-2 ${containerClasses[size]} ${className}`}>
      <div className={`${sizeClasses[size]} rounded-lg overflow-hidden shadow-lg border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700`}>
        <img 
          src={ofunMejiImage}
          alt="Ofun Meji - Traditional Odu Pattern representing completion and spiritual fulfillment"
          className="w-full h-full object-cover"
        />
      </div>
      
      {showCaption && (
        <div className="text-center max-w-xs">
          <h4 className="font-bold text-amber-900 dark:text-amber-100">
            Òfún Méjì
          </h4>
          <p className="text-amber-700 dark:text-amber-300 font-medium">
            Ofun Meji
          </p>
          <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">
            Completion, spiritual fulfillment
          </p>
          <p className="text-amber-600 dark:text-amber-400 text-xs italic">
            Ìparí, ìtẹ́lọ́rùn ẹ̀mí
          </p>
          
          {/* Pattern Display */}
          <div className="mt-2 flex justify-center space-x-1">
            <div className="text-xs font-mono text-amber-800 dark:text-amber-200">
              II II | I I | II II | I I
            </div>
          </div>
          
          {/* Authentic Badge */}
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
              <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
              Authentic Traditional
            </span>
          </div>
        </div>
      )}
    </div>
  );
}