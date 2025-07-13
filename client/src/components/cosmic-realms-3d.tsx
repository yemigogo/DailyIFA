import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Maximize2, Volume2, VolumeX, Download, Share2 } from 'lucide-react';

// Enhanced Orisha data with sound and spiritual properties
const ORISHAS = {
  'Ọbàtálá': { 
    color: '#FFFFFF', 
    realm: 'orun', 
    symbol: '☁️', 
    domain: 'Creation, Wisdom',
    element: 'air',
    sound: '/static/audio/tibetan-singing-bowl.mp3',
    blessing: 'May Ọbàtálá grant you clarity and wisdom'
  },
  'Ṣàngó': { 
    color: '#CC2244', 
    realm: 'aye', 
    symbol: '⚡', 
    domain: 'Thunder, Justice',
    element: 'fire',
    sound: '/static/audio/thunder-sound.mp3',
    blessing: 'May Ṣàngó bring you courage and justice'
  },
  'Ọ̀ṣun': { 
    color: '#FFD700', 
    realm: 'aye', 
    symbol: '🌊', 
    domain: 'Love, Rivers',
    element: 'water',
    sound: '/static/audio/river-flow.mp3',
    blessing: 'May Ọ̀ṣun fill your life with love and abundance'
  },
  'Ògún': { 
    color: '#228B22', 
    realm: 'aye', 
    symbol: '⚔️', 
    domain: 'Iron, War',
    element: 'iron',
    sound: '/static/audio/metal-forge.mp3',
    blessing: 'May Ògún give you strength and determination'
  },
  'Yemọja': { 
    color: '#4169E1', 
    realm: 'ile_okun', 
    symbol: '🌍', 
    domain: 'Ocean, Motherhood',
    element: 'water',
    sound: '/static/audio/ocean-waves.mp3',
    blessing: 'May Yemọja nurture and protect you'
  },
  'Olókun': { 
    color: '#000080', 
    realm: 'ile_okun', 
    symbol: '🐚', 
    domain: 'Deep Ocean',
    element: 'water',
    sound: '/static/audio/deep-ocean.mp3',
    blessing: 'May Olókun reveal the mysteries of wisdom'
  },
  'Ọya': { 
    color: '#8B008B', 
    realm: 'orun', 
    symbol: '🌪️', 
    domain: 'Winds, Change',
    element: 'air',
    sound: '/static/audio/wind-storm.mp3',
    blessing: 'May Ọya bring you transformation and renewal'
  },
  'Ọ̀rúnmìlà': { 
    color: '#FFD700', 
    realm: 'orun', 
    symbol: '👁️', 
    domain: 'Wisdom, Divination',
    element: 'wisdom',
    sound: '/static/audio/ancestral-chant.mp3',
    blessing: 'May Ọ̀rúnmìlà guide your spiritual path'
  }
};

interface CosmicRealm3DProps {
  className?: string;
}

export function CosmicRealms3D({ className = "" }: CosmicRealm3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedOrisha, setSelectedOrisha] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'focused'>('overview');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const animate = () => {
      if (!isPlaying) return;
      
      time += 0.02;
      
      // Clear canvas with cosmic background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, '#000814');
      gradient.addColorStop(0.5, '#001D3D');
      gradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);

      // Draw cosmic connections (energy lines)
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      // Òrun to Ayé
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 150);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();
      
      // Ayé to Ilẹ̀-Ọkùn
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX, centerY + 150);
      ctx.stroke();

      // Òrun to Ilẹ̀-Ọkùn (diagonal)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 150);
      ctx.lineTo(centerX, centerY + 150);
      ctx.stroke();

      ctx.setLineDash([]);

      // Draw Òrun (Purple Heavenly Realm)
      const orunGradient = ctx.createRadialGradient(centerX, centerY - 150, 0, centerX, centerY - 150, 60);
      orunGradient.addColorStop(0, '#8A2BE2');
      orunGradient.addColorStop(0.7, '#4B0082');
      orunGradient.addColorStop(1, 'rgba(75, 0, 130, 0.3)');
      
      ctx.fillStyle = orunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 150, 50, 0, Math.PI * 2);
      ctx.fill();

      // Crown above Òrun
      ctx.fillStyle = '#FFD700';
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        const crownX = centerX + Math.cos(angle) * 25;
        const crownY = centerY - 150 - 60 + Math.sin(angle) * 25;
        ctx.beginPath();
        ctx.arc(crownX, crownY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Ayé (Green Earth Realm) with Orisha spheres
      const ayeGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
      ayeGradient.addColorStop(0, '#32CD32');
      ayeGradient.addColorStop(0.7, '#228B22');
      ayeGradient.addColorStop(1, 'rgba(34, 139, 34, 0.3)');
      
      ctx.fillStyle = ayeGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.fill();

      // Sacred palm tree (cosmic bridge)
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(centerX - 5, centerY - 70, 10, 140);
      
      // Palm fronds
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 4;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 70);
        ctx.lineTo(centerX + Math.cos(angle) * 40, centerY - 70 + Math.sin(angle) * 20);
        ctx.stroke();
      }

      // Floating Orisha spheres around Ayé
      const earthOrishas = Object.entries(ORISHAS).filter(([_, data]) => data.realm === 'aye');
      earthOrishas.forEach(([name, data], index) => {
        const angle = time * 0.5 + (index * Math.PI * 2) / earthOrishas.length;
        const orbitalRadius = 120;
        const orishaX = centerX + Math.cos(angle) * orbitalRadius;
        const orishaY = centerY + Math.sin(angle * 2) * 30 + Math.sin(time * 2) * 10;

        // Orisha sphere with glow
        const orishaGradient = ctx.createRadialGradient(orishaX, orishaY, 0, orishaX, orishaY, 20);
        orishaGradient.addColorStop(0, data.color);
        orishaGradient.addColorStop(0.7, data.color + '80');
        orishaGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        
        ctx.fillStyle = orishaGradient;
        ctx.beginPath();
        ctx.arc(orishaX, orishaY, 15, 0, Math.PI * 2);
        ctx.fill();

        // Orisha symbol
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.fillText(data.symbol, orishaX, orishaY + 5);

        // Orisha name (if selected)
        if (selectedOrisha === name) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '12px serif';
          ctx.fillText(name, orishaX, orishaY - 25);
          ctx.fillText(data.domain, orishaX, orishaY - 10);
        }
      });

      // Draw Ilẹ̀-Ọkùn (Blue Ocean Abyss)
      const okunGradient = ctx.createRadialGradient(centerX, centerY + 150, 0, centerX, centerY + 150, 60);
      okunGradient.addColorStop(0, '#4169E1');
      okunGradient.addColorStop(0.7, '#000080');
      okunGradient.addColorStop(1, 'rgba(0, 0, 128, 0.3)');
      
      ctx.fillStyle = okunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY + 150, 50, 0, Math.PI * 2);
      ctx.fill();

      // Swirling water currents
      ctx.strokeStyle = 'rgba(135, 206, 250, 0.6)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 16; i++) {
        const angle = time * 2 + (i * Math.PI * 2) / 16;
        const currentX = centerX + Math.cos(angle) * (30 + Math.sin(time * 3) * 10);
        const currentY = centerY + 150 + Math.sin(angle * 3) * 20;
        
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Ocean Orishas
      const oceanOrishas = Object.entries(ORISHAS).filter(([_, data]) => data.realm === 'ile_okun');
      oceanOrishas.forEach(([name, data], index) => {
        const angle = index * Math.PI;
        const orishaX = centerX + Math.cos(angle) * 80;
        const orishaY = centerY + 150;

        const orishaGradient = ctx.createRadialGradient(orishaX, orishaY, 0, orishaX, orishaY, 18);
        orishaGradient.addColorStop(0, data.color);
        orishaGradient.addColorStop(1, data.color + '40');
        
        ctx.fillStyle = orishaGradient;
        ctx.beginPath();
        ctx.arc(orishaX, orishaY, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '14px serif';
        ctx.textAlign = 'center';
        ctx.fillText(data.symbol, orishaX, orishaY + 5);
      });

      // Heavenly Orishas around Òrun
      const heavenOrishas = Object.entries(ORISHAS).filter(([_, data]) => data.realm === 'orun');
      heavenOrishas.forEach(([name, data], index) => {
        const angle = time * 0.3 + (index * Math.PI * 2) / heavenOrishas.length;
        const orishaX = centerX + Math.cos(angle) * 90;
        const orishaY = centerY - 150 + Math.sin(angle * 0.5) * 20;

        const orishaGradient = ctx.createRadialGradient(orishaX, orishaY, 0, orishaX, orishaY, 16);
        orishaGradient.addColorStop(0, data.color);
        orishaGradient.addColorStop(1, data.color + '60');
        
        ctx.fillStyle = orishaGradient;
        ctx.beginPath();
        ctx.arc(orishaX, orishaY, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px serif';
        ctx.textAlign = 'center';
        ctx.fillText(data.symbol, orishaX, orishaY + 4);
      });

      // Realm labels
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px serif';
      ctx.textAlign = 'center';
      
      ctx.fillText('Òrun', centerX, centerY - 200);
      ctx.font = '12px serif';
      ctx.fillText('(Heavenly Realm)', centerX, centerY - 185);
      
      ctx.font = 'bold 16px serif';
      ctx.fillText('Ayé', centerX, centerY + 120);
      ctx.font = '12px serif';
      ctx.fillText('(Earthly Marketplace)', centerX, centerY + 135);
      
      ctx.font = 'bold 16px serif';
      ctx.fillText('Ilẹ̀-Ọkùn', centerX, centerY + 220);
      ctx.font = '12px serif';
      ctx.fillText('(Oceanic Abyss)', centerX, centerY + 235);

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, selectedOrisha]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    // Check if click is on any Orisha sphere
    Object.entries(ORISHAS).forEach(([name, data]) => {
      let orishaX, orishaY;
      
      if (data.realm === 'aye') {
        const index = Object.entries(ORISHAS).filter(([_, d]) => d.realm === 'aye').findIndex(([n]) => n === name);
        const angle = (index * Math.PI * 2) / Object.entries(ORISHAS).filter(([_, d]) => d.realm === 'aye').length;
        orishaX = centerX + Math.cos(angle) * 120;
        orishaY = centerY;
      } else if (data.realm === 'orun') {
        const index = Object.entries(ORISHAS).filter(([_, d]) => d.realm === 'orun').findIndex(([n]) => n === name);
        const angle = (index * Math.PI * 2) / Object.entries(ORISHAS).filter(([_, d]) => d.realm === 'orun').length;
        orishaX = centerX + Math.cos(angle) * 90;
        orishaY = centerY - 150;
      } else {
        const index = Object.entries(ORISHAS).filter(([_, d]) => d.realm === 'ile_okun').findIndex(([n]) => n === name);
        const angle = index * Math.PI;
        orishaX = centerX + Math.cos(angle) * 80;
        orishaY = centerY + 150;
      }

      const distance = Math.sqrt((x - orishaX) ** 2 + (y - orishaY) ** 2);
      if (distance < 20) {
        setSelectedOrisha(selectedOrisha === name ? null : name);
        // Play Orisha sound if enabled
        if (soundEnabled) {
          playOrishaSound(name);
        }
      }
    });
  };

  // Enhanced audio functionality
  const playOrishaSound = (orisha: string) => {
    if (!soundEnabled) return;
    
    const data = ORISHAS[orisha];
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Create new audio instance for Orisha sound
    audioRef.current = new Audio(data.sound);
    audioRef.current.volume = 0.3;
    audioRef.current.play().catch(() => {
      console.log('Audio playback requires user interaction');
    });
    
    setCurrentAudio(orisha);
    
    // Auto-stop after 3 seconds
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        setCurrentAudio(null);
      }
    }, 3000);
  };

  // Avatar creation functionality
  const createShareableAvatar = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Create avatar background
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    gradient.addColorStop(0, '#4A148C');
    gradient.addColorStop(1, '#000051');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    // Add selected Orisha or random one
    const targetOrisha = selectedOrisha || Object.keys(ORISHAS)[Math.floor(Math.random() * Object.keys(ORISHAS).length)];
    const orishaData = ORISHAS[targetOrisha];
    
    // Draw Orisha symbol
    ctx.fillStyle = orishaData.color;
    ctx.font = 'bold 80px serif';
    ctx.textAlign = 'center';
    ctx.fillText(orishaData.symbol, 200, 220);
    
    // Add text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px serif';
    ctx.fillText(`Your Orisha Guide: ${targetOrisha}`, 200, 300);
    
    ctx.font = '16px serif';
    ctx.fillText(orishaData.blessing, 200, 340);
    
    ctx.font = '12px serif';
    ctx.fillText('Generated by Yorùbá Cosmic Realms', 200, 380);
    
    // Download avatar
    const link = document.createElement('a');
    link.download = `orisha-avatar-${targetOrisha.toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    setShowAvatarCreator(false);
  };

  // Share functionality
  const shareCosmicExperience = async () => {
    const shareData = {
      title: 'Yorùbá Cosmic Realms Experience',
      text: selectedOrisha 
        ? `I just connected with ${selectedOrisha} in the Yorùbá Cosmic Realms! ${ORISHAS[selectedOrisha].blessing}`
        : 'Explore the mystical Yorùbá Cosmic Realms - three sacred dimensions with floating Orisha spheres!',
      url: window.location.href
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('Experience shared to clipboard!');
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Yorùbá Cosmic Realms 3D
              </CardTitle>
              <CardDescription className="text-gray-300">
                Interactive visualization of Òrun, Ayé, and Ilẹ̀-Ọkùn with floating Orisha spheres
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="border-purple-500/50 hover:bg-purple-500/20"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`border-purple-500/50 hover:bg-purple-500/20 ${soundEnabled ? 'bg-purple-500/30' : ''}`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={createShareableAvatar}
                className="border-purple-500/50 hover:bg-purple-500/20"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareCosmicExperience}
                className="border-purple-500/50 hover:bg-purple-500/20"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedOrisha(null);
                  setViewMode('overview');
                }}
                className="border-purple-500/50 hover:bg-purple-500/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="relative">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full h-[600px] cursor-pointer bg-gradient-to-br from-slate-900 to-blue-900"
              style={{ imageRendering: 'pixelated' }}
            />
            
            {/* Cosmic overlay effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 space-y-2">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Òrun: Heavenly Realm
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  Ayé: Earthly Marketplace
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Ilẹ̀-Ọkùn: Oceanic Abyss
                </Badge>
              </div>
              
              <div className="absolute top-4 right-4 text-right">
                <div className="text-xs text-gray-400 space-y-1">
                  <div>🌟 Click Orisha spheres for details</div>
                  <div>✨ Watch the eternal spiritual dance</div>
                  <div>🌊 Palm tree bridges all realms</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Selected Orisha Details */}
      {selectedOrisha && (
        <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-3xl">{ORISHAS[selectedOrisha].symbol}</span>
              <div className="flex-1">
                <div className="text-xl font-bold text-purple-300">{selectedOrisha}</div>
                <div className="text-sm text-gray-400">{ORISHAS[selectedOrisha].domain}</div>
                <div className="text-xs text-blue-300 mt-1">Element: {ORISHAS[selectedOrisha].element}</div>
              </div>
              {currentAudio === selectedOrisha && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                  🔊 Playing Sound
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-purple-200">{ORISHAS[selectedOrisha].blessing}</div>
              
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                  Realm: {ORISHAS[selectedOrisha].realm}
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                  Element: {ORISHAS[selectedOrisha].element}
                </Badge>
                {soundEnabled && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => playOrishaSound(selectedOrisha)}
                    className="border-purple-500/50 hover:bg-purple-500/20"
                  >
                    🔊 Play Sacred Sound
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Instructions with New Features */}
      <Card className="bg-slate-800/50 border-purple-500/30">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-300">
            <div className="text-center">
              <div className="text-purple-400 font-semibold mb-2 flex items-center justify-center gap-1">
                <Volume2 className="w-4 h-4" />
                Sacred Sounds
              </div>
              <div>Enable audio to hear each Orisha's sacred sound when clicked</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-semibold mb-2 flex items-center justify-center gap-1">
                <Download className="w-4 h-4" />
                Avatar Creator
              </div>
              <div>Generate and download your personalized Orisha avatar image</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-semibold mb-2 flex items-center justify-center gap-1">
                <Share2 className="w-4 h-4" />
                Share Experience
              </div>
              <div>Share your cosmic journey and Orisha connections with others</div>
            </div>
            <div className="text-center">
              <div className="text-amber-400 font-semibold mb-2">Interactive Realms</div>
              <div>Click floating Orisha spheres to explore their domains and blessings</div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-600">
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
              <div className="text-center">
                <div className="text-purple-400 font-semibold mb-1">Òrun (Purple)</div>
                <div>Divine realm where Orishas of wisdom and spiritual power reside</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-semibold mb-1">Ayé (Green)</div>
                <div>Earthly marketplace with floating Orisha spheres in eternal dance</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-semibold mb-1">Ilẹ̀-Ọkùn (Blue)</div>
                <div>Oceanic abyss with flowing currents and deep water mysteries</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CosmicRealms3D;