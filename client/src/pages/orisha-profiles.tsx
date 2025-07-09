import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import OrishaCharacterProfiles from '@/components/orisha-character-profiles';

const OrishaProfiles: React.FC = () => {
  const { ts } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <OrishaCharacterProfiles />
      </div>
    </div>
  );
};

export default OrishaProfiles;