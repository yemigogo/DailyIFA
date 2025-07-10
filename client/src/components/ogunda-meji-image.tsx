import React from 'react';
import ogundaMejiImage from '@assets/Screenshot_20250710_123529_Instagram (1)_1752168226467.jpg';

interface OgundaMejiImageProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showCaption?: boolean;
}

const OgundaMejiImage: React.FC<OgundaMejiImageProps> = ({ 
  className = '', 
  size = 'medium', 
  showCaption = false 
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src={ogundaMejiImage}
        alt="Ogunda Meji - Traditional Ifá Pattern"
        className={`${sizeClasses[size]} object-contain rounded-lg border border-gray-300 dark:border-gray-600`}
      />
      {showCaption && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
          Ogunda Meji Traditional Pattern
        </p>
      )}
    </div>
  );
};

export default OgundaMejiImage;