import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

// Simple test page to debug the issue
const LearningTest: React.FC = () => {
  const { ts } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-yellow-400 mb-4">
            {ts("Learning Center Test", "Ile-Ẹ̀kọ́ Ìdánwò")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {ts("Testing page functionality", "Ìdánwò iṣẹ́ ojú-ìwé")}
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Test Content</h2>
            <p>This is a test page to verify basic functionality.</p>
            <button 
              onClick={() => alert('Button clicked!')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Button
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningTest;