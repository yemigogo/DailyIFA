import React from 'react';
import ikaMejiImage from '@assets/image_1752169327055.png';

interface IkaMejiImageProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showCaption?: boolean;
}

const IkaMejiImage: React.FC<IkaMejiImageProps> = ({ 
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
        src={ikaMejiImage}
        alt="Ika Meji - Traditional Ifá Pattern"
        className={`${sizeClasses[size]} object-contain rounded-lg border border-gray-300 dark:border-gray-600`}
      />
      {showCaption && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
          Ika Meji Traditional Pattern
        </p>
      )}
    </div>
  );
};

export default IkaMejiImage;