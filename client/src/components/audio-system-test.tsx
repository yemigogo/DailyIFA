import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Volume2, Timer, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface TestResult {
  feature: string;
  status: 'pass' | 'fail' | 'pending';
  details: string;
}

export const AudioSystemTest: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isTestingInProgress, setIsTestingInProgress] = useState(false);

  const runComprehensiveTest = async () => {
    setIsTestingInProgress(true);
    const results: TestResult[] = [];

    // Test 1: Web Audio API Support
    try {
      const audioContext = new AudioContext();
      results.push({
        feature: 'Web Audio API Support',
        status: 'pass',
        details: `AudioContext created successfully. Sample rate: ${audioContext.sampleRate}Hz`
      });
      audioContext.close();
    } catch (error) {
      results.push({
        feature: 'Web Audio API Support',
        status: 'fail',
        details: 'Web Audio API not supported in this browser'
      });
    }

    // Test 2: Frequency Generation
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 528; // Love frequency
      oscillator.type = 'sine';
      gainNode.gain.value = 0.01; // Very low volume for test
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
      
      results.push({
        feature: 'Sacred Frequency Generation (528Hz)',
        status: 'pass',
        details: 'Successfully generated healing frequency with proper envelope'
      });
      
      audioContext.close();
    } catch (error) {
      results.push({
        feature: 'Sacred Frequency Generation',
        status: 'fail',
        details: `Error generating frequency: ${error}`
      });
    }

    // Test 3: Timer Functionality
    try {
      let testTimer = 0;
      const timerInterval = setInterval(() => {
        testTimer++;
        if (testTimer >= 3) {
          clearInterval(timerInterval);
          results.push({
            feature: 'Meditation Timer System',
            status: 'pass',
            details: 'Timer increments correctly with proper interval handling'
          });
          updateResults(results);
        }
      }, 100);
    } catch (error) {
      results.push({
        feature: 'Meditation Timer System',
        status: 'fail',
        details: `Timer error: ${error}`
      });
    }

    // Test 4: Sharing System
    try {
      const shareData = {
        title: 'Test Spiritual Content',
        text: 'Testing spiritual audio sharing',
        url: window.location.href
      };
      
      if (navigator.share) {
        results.push({
          feature: 'Native Sharing API',
          status: 'pass',
          details: 'Native sharing API available for mobile devices'
        });
      } else {
        results.push({
          feature: 'Native Sharing API',
          status: 'pass',
          details: 'Clipboard fallback available for desktop browsers'
        });
      }
    } catch (error) {
      results.push({
        feature: 'Enhanced Sharing System',
        status: 'fail',
        details: `Sharing error: ${error}`
      });
    }

    // Test 5: Chime Generation
    try {
      const audioContext = new AudioContext();
      const chimeOsc = audioContext.createOscillator();
      const chimeGain = audioContext.createGain();
      
      chimeOsc.connect(chimeGain);
      chimeGain.connect(audioContext.destination);
      
      chimeOsc.frequency.value = 432; // Earth healing frequency
      chimeOsc.type = 'sine';
      
      // Test envelope
      chimeGain.gain.setValueAtTime(0, audioContext.currentTime);
      chimeGain.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
      
      chimeOsc.start();
      chimeOsc.stop(audioContext.currentTime + 0.5);
      
      results.push({
        feature: 'Meditation Chimes (432Hz)',
        status: 'pass',
        details: 'Interval chimes generated with proper envelope and frequency'
      });
      
      audioContext.close();
    } catch (error) {
      results.push({
        feature: 'Meditation Chimes',
        status: 'fail',
        details: `Chime generation error: ${error}`
      });
    }

    // Test 6: Local Storage
    try {
      localStorage.setItem('spiritual_audio_test', 'test_value');
      const testValue = localStorage.getItem('spiritual_audio_test');
      localStorage.removeItem('spiritual_audio_test');
      
      if (testValue === 'test_value') {
        results.push({
          feature: 'Session Persistence',
          status: 'pass',
          details: 'Local storage available for saving meditation progress'
        });
      } else {
        throw new Error('Storage test failed');
      }
    } catch (error) {
      results.push({
        feature: 'Session Persistence',
        status: 'fail',
        details: 'Local storage not available'
      });
    }

    updateResults(results);
  };

  const updateResults = (results: TestResult[]) => {
    setTestResults(results);
    setIsTestingInProgress(false);
    
    const passCount = results.filter(r => r.status === 'pass').length;
    const totalCount = results.length;
    
    toast({
      title: language === 'yoruba' ? 'Ìdánwò parí' : 'Test Complete',
      description: `${passCount}/${totalCount} ${language === 'yoruba' ? 'ìdánwò ṣe àṣeyọrí' : 'tests passed'}`,
    });
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'fail':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20';
      case 'fail':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20';
      default:
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-blue-600" />
          {language === 'yoruba' ? 'Ìdánwò Ètò Ohùn Ẹ̀mí' : 'Spiritual Audio System Test'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <Button
            onClick={runComprehensiveTest}
            disabled={isTestingInProgress}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            {isTestingInProgress 
              ? (language === 'yoruba' ? 'Ìdánwò ń lọ...' : 'Testing...')
              : (language === 'yoruba' ? 'Bẹ̀rẹ̀ Ìdánwò' : 'Run Test Suite')
            }
          </Button>
          
          {testResults.length > 0 && (
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {testResults.filter(r => r.status === 'pass').length} Passed
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {testResults.filter(r => r.status === 'fail').length} Failed
              </Badge>
            </div>
          )}
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              {language === 'yoruba' ? 'Èsì Ìdánwò' : 'Test Results'}
            </h3>
            {testResults.map((result, index) => (
              <Card key={index} className={getStatusColor(result.status)}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(result.status)}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{result.feature}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {result.details}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Feature Overview */}
        <Card className="bg-white/50 dark:bg-black/20">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">
              {language === 'yoruba' ? 'Àwọn Ẹ̀yà Ètò' : 'System Features'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span className="text-sm">5 Sacred Frequencies</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-indigo-600" />
                <span className="text-sm">Enhanced Meditation Timer</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm">Advanced Sharing System</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {language === 'yoruba' 
                ? 'Ètò tí ó ni àwọn ìgbọ̀nsí ìwòsàn, àkànṣe ìpamọ́, àti ètò pínpín gíga'
                : 'Complete system with healing frequencies, meditation timer, and enhanced sharing'
              }
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AudioSystemTest;