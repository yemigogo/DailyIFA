import React from 'react';
import okanranMejiImage from '@assets/Screenshot_20250710_123552_Instagram_1752168011070.jpg';

interface OkanranMejiImageProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showCaption?: boolean;
}

const OkanranMejiImage: React.FC<OkanranMejiImageProps> = ({ 
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
        src={okanranMejiImage}
        alt="Okanran Meji - Traditional Ifá Pattern"
        className={`${sizeClasses[size]} object-contain rounded-lg border border-gray-300 dark:border-gray-600`}
      />
      {showCaption && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
          Okanran Meji Traditional Pattern
        </p>
      )}
    </div>
  );
};

export default OkanranMejiImage;