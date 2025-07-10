import React from 'react';
import oseMejiImage from '@assets/image_1752179450588.png';

interface OseMejiImageProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showCaption?: boolean;
}

const OseMejiImage: React.FC<OseMejiImageProps> = ({ 
  size = 'medium', 
  className = '',
  showCaption = true 
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32', 
    large: 'w-48 h-48'
  };

  const captionSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded-lg border-2 border-spiritual-blue/30 shadow-lg`}>
        <img 
          src={oseMejiImage}
          alt="Ose Meji - Traditional Yoruba Ifá pattern showing abundance, prosperity, and spiritual gifts with authentic carved divination tools"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      {showCaption && (
        <div className="text-center space-y-1">
          <p className={`font-semibold text-spiritual-blue dark:text-sacred-gold ${captionSizes[size]}`}>
            Òṣé Méjì
          </p>
          <p className={`text-gray-600 dark:text-gray-400 ${captionSizes[size]} leading-tight`}>
            Abundance, Prosperity, Spiritual Gifts
          </p>
          <p className={`text-xs text-emerald-600 dark:text-emerald-400 font-medium`}>
            ⚡ Authentic Traditional Image
          </p>
        </div>
      )}
    </div>
  );
};

export default OseMejiImage;