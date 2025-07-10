import React from 'react';
import obaraMejiImage from '@assets/Screenshot_20250710_123617_Instagram_1752167558117.jpg';

interface ObaraMejiImageProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showCaption?: boolean;
}

const ObaraMejiImage: React.FC<ObaraMejiImageProps> = ({ 
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
        src={obaraMejiImage}
        alt="Obara Meji - Traditional Ifá Pattern"
        className={`${sizeClasses[size]} object-contain rounded-lg border border-gray-300 dark:border-gray-600`}
      />
      {showCaption && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
          Obara Meji Traditional Pattern
        </p>
      )}
    </div>
  );
};

export default ObaraMejiImage;