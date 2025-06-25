import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, VolumeX, Info, Layers, Shuffle, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AudioLayer {
  id: string;
  name: string;
  nameYoruba: string;
  category: "spiritual" | "nature" | "ceremonial";
  audioUrl: string;
  volume: number;
  isPlaying: boolean;
  culturalSignificance: string;
  culturalSignificanceYoruba: string;
  spiritualPurpose: string;
  spiritualPurposeYoruba: string;
  traditionalUse: string;
  traditionalUseYoruba: string;
  color: string;
}

const audioLayers: AudioLayer[] = [
  {
    id: "ifa_wisdom",
    name: "Ifá Wisdom Chant",
    nameYoruba: "Orin Ọgbọ́n Ifá",
    category: "spiritual",
    audioUrl: "/static/audio/soundscapes/ifa_wisdom_chant.mp3",
    volume: 0.7,
    isPlaying: false,
    culturalSignificance: "Traditional sacred chants used in Ifá divination ceremonies to invoke wisdom and spiritual guidance",
    culturalSignificanceYoruba: "Àwọn orin mímọ́ ìbílẹ̀ tí a ń lò nínú àjọ̀dún Ifá láti pe ọgbọ́n àti ìtọ́ni ẹ̀mí",
    spiritualPurpose: "Opens spiritual channels for divine communication and enhances mental clarity",
    spiritualPurposeYoruba: "Ó ń ṣí àwọn ọ̀nà ẹ̀mí fún ìbánisọ̀rọ̀ àtọrun àti ìmúni kedere ọkàn",
    traditionalUse: "Recited during Ifá consultations, meditation, and spiritual preparation",
    traditionalUseYoruba: "A ń kà á nígbà ìfá, ìjímọ̀, àti ìgbarí ẹ̀mí",
    color: "#8B4513"
  },
  {
    id: "bata_egungun",
    name: "Batá Egungun Drumming",
    nameYoruba: "Ìlù Bàtá Egúngún",
    category: "ceremonial",
    audioUrl: "/static/audio/soundscapes/bata_egungun_abida.mp3",
    volume: 0.6,
    isPlaying: false,
    culturalSignificance: "Sacred drumming pattern used specifically for ancestral worship and communication with the Egungun",
    culturalSignificanceYoruba: "Ìlù mímọ́ tí a ń lò pàtàkì fún ìbọrí àwọn bàbá àti ìbánisọ̀rọ̀ pẹ̀lú Egúngún",
    spiritualPurpose: "Creates rhythmic bridge between physical and spiritual realms, calling ancestral spirits",
    spiritualPurposeYoruba: "Ó ń dá afárá ìlù láàrín ayé àti ọ̀run, ó ń pe àwọn ẹ̀mí bàbá",
    traditionalUse: "Performed during Egungun festivals, ancestral ceremonies, and spiritual cleansing rituals",
    traditionalUseYoruba: "A ń ṣe é nígbà àjọ̀dún Egúngún, àjọ̀dún àwọn bàbá, àti àwọn ìjọsìn ìwẹ̀nù ẹ̀mí",
    color: "#4A148C"
  },
  {
    id: "ocean_blessing",
    name: "Ocean Blessing Waves",
    nameYoruba: "Ìgbì Ìbùkún Òkun",
    category: "nature",
    audioUrl: "/static/audio/soundscapes/ocean_blessing_waves.mp3",
    volume: 0.5,
    isPlaying: false,
    culturalSignificance: "Represents Yemoja's divine feminine energy and the primordial waters of creation",
    culturalSignificanceYoruba: "Ó ń sọ agbára obìnrin Yemọja àti àwọn omi àkọ́kọ́ ìdá",
    spiritualPurpose: "Provides emotional healing, cleansing, and connection to maternal divine energy",
    spiritualPurposeYoruba: "Ó ń fun ni ìwòsàn ẹ̀mí, ìwẹ̀nù, àti ìsopọ̀ mọ́ agbára obìnrin òrun",
    traditionalUse: "Used in healing ceremonies, purification rituals, and offerings to Yemoja",
    traditionalUseYoruba: "A ń lò ó nínú àjọ̀dún ìwòsàn, àwọn ìjọsìn ìwẹ̀nù, àti ẹbọ sí Yemọja",
    color: "#0D7377"
  },
  {
    id: "sacred_forest",
    name: "Sacred Forest Ambience",
    nameYoruba: "Àyíká Igbó Mímọ́",
    category: "nature",
    audioUrl: "/static/audio/soundscapes/sacred_forest.mp3",
    volume: 0.4,
    isPlaying: false,
    culturalSignificance: "Represents the sacred groves where Orishas dwell and spiritual initiations take place",
    culturalSignificanceYoruba: "Ó ń sọ àwọn igbó mímọ́ níbi tí àwọn Òrìṣà ń gbé àti níbi tí àwọn ìgbélewọ̀n ẹ̀mí ti ń wáyé",
    spiritualPurpose: "Connects practitioners to earth energies and natural spiritual forces",
    spiritualPurposeYoruba: "Ó ń so àwọn akitiyan mọ́ agbára ilẹ̀ àti àwọn ipa ẹ̀mí àdáyébá",
    traditionalUse: "Background for herb gathering, spiritual retreats, and nature-based healing",
    traditionalUseYoruba: "Ẹ̀yìn fún kíkó ewé, ìpadàsẹ́yìn ẹ̀mí, àti ìwòsàn tó dá lórí àdáyébá",
    color: "#2E7D32"
  }
];

const spiritualCombinations = [
  {
    name: "Ancestral Communion",
    nameYoruba: "Ìbánisọ̀rọ̀ Àwọn Bàbá",
    layers: ["bata_egungun", "sacred_forest"],
    purpose: "Deep connection with ancestral wisdom and guidance",
    purposeYoruba: "Ìsopọ̀ jinlẹ̀ pẹ̀lú ọgbọ́n àti ìtọ́ni àwọn bàbá",
    description: "Combines ceremonial drumming with sacred grove ambience for ancestral communication",
    descriptionYoruba: "Ó dàpọ̀ ìlù àjọ̀dún àti àyíká igbó mímọ́ fún ìbánisọ̀rọ̀ àwọn bàbá"
  },
  {
    name: "Divine Feminine Healing",
    nameYoruba: "Ìwòsàn Obìnrin Òrun",
    layers: ["ocean_blessing", "ifa_wisdom"],
    purpose: "Emotional healing and maternal divine connection",
    purposeYoruba: "Ìwòsàn ẹ̀mí àti ìsopọ̀ agbára obìnrin òrun",
    description: "Merges Yemoja's healing waters with Ifá wisdom for emotional restoration",
    descriptionYoruba: "Ó dàpọ̀ omi ìwòsàn Yemọja pẹ̀lú ọgbọ́n Ifá fún ìmúpadà ẹ̀mí"
  },
  {
    name: "Complete Sacred Circle",
    nameYoruba: "Àyíká Mímọ́ Pípé",
    layers: ["ifa_wisdom", "bata_egungun", "ocean_blessing", "sacred_forest"],
    purpose: "Full spectrum spiritual experience encompassing all elements",
    purposeYoruba: "Ìrírí ẹ̀mí tó kún tí ó kan gbogbo àwọn eroja",
    description: "The ultimate layered experience combining all spiritual and natural elements",
    descriptionYoruba: "Ìrírí ìṣedèdè tó ga jù tí ó dàpọ̀ gbogbo àwọn eroja ẹ̀mí àti àdáyébá"
  }
];

export default function ImmersiveAudioExperience() {
  const { language, ts } = useLanguage();
  const [layers, setLayers] = useState<AudioLayer[]>(audioLayers);
  const [selectedCombination, setSelectedCombination] = useState<string | null>(null);
  const [showCulturalInfo, setShowCulturalInfo] = useState<string | null>(null);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [isGlobalMuted, setIsGlobalMuted] = useState(false);
  const [timingOffsets, setTimingOffsets] = useState<{ [key: string]: number }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    // Initialize audio elements
    layers.forEach(layer => {
      if (!audioRefs.current[layer.id]) {
        const audio = new Audio(layer.audioUrl);
        audio.loop = true;
        audio.volume = layer.volume * masterVolume;
        audioRefs.current[layer.id] = audio;
      }
    });

    return () => {
      // Cleanup audio elements
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  useEffect(() => {
    // Update all audio volumes when master volume changes
    layers.forEach(layer => {
      const audio = audioRefs.current[layer.id];
      if (audio) {
        audio.volume = layer.volume * masterVolume * (isGlobalMuted ? 0 : 1);
      }
    });
  }, [masterVolume, isGlobalMuted, layers]);

  const toggleLayer = async (layerId: string) => {
    const audio = audioRefs.current[layerId];
    if (!audio) return;

    setLayers(prev => prev.map(layer => {
      if (layer.id === layerId) {
        const newIsPlaying = !layer.isPlaying;
        if (newIsPlaying) {
          const offset = timingOffsets[layerId] || 0;
          if (offset > 0) {
            setTimeout(() => {
              audio.play().catch(console.error);
            }, offset * 1000);
          } else {
            audio.play().catch(console.error);
          }
        } else {
          audio.pause();
        }
        return { ...layer, isPlaying: newIsPlaying };
      }
      return layer;
    }));
  };

  const updateLayerVolume = (layerId: string, volume: number) => {
    const audio = audioRefs.current[layerId];
    if (audio) {
      audio.volume = volume * masterVolume * (isGlobalMuted ? 0 : 1);
    }

    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, volume } : layer
    ));
  };

  const updateTimingOffset = (layerId: string, offset: number) => {
    setTimingOffsets(prev => ({
      ...prev,
      [layerId]: offset
    }));
  };

  const applyCombination = (combination: typeof spiritualCombinations[0]) => {
    // Stop all current layers
    layers.forEach(layer => {
      const audio = audioRefs.current[layer.id];
      if (audio && layer.isPlaying) {
        audio.pause();
      }
    });

    // Start selected combination layers with timing offsets
    setLayers(prev => prev.map(layer => {
      const shouldPlay = combination.layers.includes(layer.id);
      const audio = audioRefs.current[layer.id];
      
      if (shouldPlay && audio) {
        const baseDelay = 300;
        const offset = timingOffsets[layer.id] || 0;
        const totalDelay = baseDelay + (offset * 1000);
        setTimeout(() => audio.play().catch(console.error), totalDelay);
      }
      
      return { ...layer, isPlaying: shouldPlay };
    }));

    setSelectedCombination(combination.name);
  };

  const stopAllLayers = () => {
    layers.forEach(layer => {
      const audio = audioRefs.current[layer.id];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setLayers(prev => prev.map(layer => ({ ...layer, isPlaying: false })));
    setSelectedCombination(null);
  };

  const playingLayers = layers.filter(layer => layer.isPlaying);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
        <CardHeader>
          <CardTitle className="text-amber-700 dark:text-amber-300 flex items-center gap-3">
            <Layers className="w-6 h-6" />
            {ts("Immersive Audio Layering Experience", "Ìrírí Ìṣedèdè Ohùn Àyíká")}
          </CardTitle>
          <p className="text-amber-600 dark:text-amber-400 text-sm">
            {ts(
              "Layer traditional Yoruba soundscapes to create personalized spiritual experiences. Each combination carries deep cultural significance and specific spiritual purposes.",
              "Ṣe ìṣedèdè àwọn ohùn àyíká Yorùbá ìbílẹ̀ láti dá àwọn ìrírí ẹ̀mí ti ara ẹni. Ìdàpọ̀ kọ̀ọ̀kan ní ìtumọ̀ àṣà jinlẹ̀ àti àwọn ète ẹ̀mí pàtàkì."
            )}
          </p>
        </CardHeader>
      </Card>

      {/* Master Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              {ts("Master Controls", "Àwọn Ìṣàkóso Àgbà")}
            </h3>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsGlobalMuted(!isGlobalMuted)}
                variant="outline"
                size="sm"
              >
                {isGlobalMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Button onClick={stopAllLayers} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                {ts("Stop All", "Dá Gbogbo Dúró")}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {ts("Master Volume:", "Agbára Ohùn Àgbà:")}
            </label>
            <Slider
              value={[masterVolume]}
              onValueChange={(value) => setMasterVolume(value[0])}
              max={1}
              step={0.1}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
              {Math.round(masterVolume * 100)}%
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Spiritual Combinations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-700 dark:text-purple-300">
            {ts("Sacred Combinations", "Àwọn Ìdàpọ̀ Mímọ́")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {spiritualCombinations.map((combination) => (
            <Card key={combination.name} className="border border-purple-200 dark:border-purple-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                      {language === "yoruba" ? combination.nameYoruba : combination.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {language === "yoruba" ? combination.purposeYoruba : combination.purpose}
                    </p>
                  </div>
                  <Button
                    onClick={() => applyCombination(combination)}
                    size="sm"
                    className={`ml-4 ${
                      selectedCombination === combination.name
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    {ts("Play", "Ṣe")}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === "yoruba" ? combination.descriptionYoruba : combination.description}
                </p>
                <div className="flex gap-2 mt-2">
                  {combination.layers.map(layerId => {
                    const layer = layers.find(l => l.id === layerId);
                    return layer ? (
                      <Badge
                        key={layerId}
                        variant="outline"
                        className="text-xs"
                        style={{ borderColor: layer.color, color: layer.color }}
                      >
                        {language === "yoruba" ? layer.nameYoruba : layer.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Individual Layer Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-teal-700 dark:text-teal-300">
            {ts("Individual Layers", "Àwọn Ipele Kọ̀ọ̀kan")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {layers.map((layer) => (
            <Card key={layer.id} className="border-l-4" style={{ borderLeftColor: layer.color }}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {language === "yoruba" ? layer.nameYoruba : layer.name}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          layer.category === "spiritual" ? "border-amber-500 text-amber-700" :
                          layer.category === "ceremonial" ? "border-purple-500 text-purple-700" :
                          "border-green-500 text-green-700"
                        }`}
                      >
                        {ts(
                          layer.category === "spiritual" ? "Spiritual" :
                          layer.category === "ceremonial" ? "Ceremonial" : "Nature",
                          layer.category === "spiritual" ? "Ẹ̀mí" :
                          layer.category === "ceremonial" ? "Àjọ̀dún" : "Àdáyébá"
                        )}
                      </Badge>
                      {layer.isPlaying && (
                        <Badge className="bg-green-500 text-white text-xs">
                          {ts("Playing", "Ń Ṣe")}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setShowCulturalInfo(
                        showCulturalInfo === layer.id ? null : layer.id
                      )}
                      variant="outline"
                      size="sm"
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => toggleLayer(layer.id)}
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      {layer.isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          {ts("Pause", "Dúró")}
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          {ts("Play", "Ṣe")}
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-4 mb-3">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    {ts("Volume:", "Agbára Ohùn:")}
                  </label>
                  <Slider
                    value={[layer.volume]}
                    onValueChange={(value) => updateLayerVolume(layer.id, value[0])}
                    max={1}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500 w-12">
                    {Math.round(layer.volume * 100)}%
                  </span>
                </div>

                {/* Timing Offset Control - Show for drum layers */}
                {layer.category === "ceremonial" && (
                  <div className="flex items-center gap-4 mb-3">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      {ts("Timing Offset (sec):", "Ìgbà Ìdádúró (ìṣẹ́jú):")}
                    </label>
                    <input
                      type="number"
                      value={timingOffsets[layer.id] || 0}
                      onChange={(e) => updateTimingOffset(layer.id, parseFloat(e.target.value) || 0)}
                      step="0.1"
                      min="0"
                      max="5"
                      className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <span className="text-xs text-gray-500">
                      {ts("sec", "ìṣẹ́jú")}
                    </span>
                  </div>
                )}

                {/* Cultural Information */}
                {showCulturalInfo === layer.id && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">
                        {ts("Cultural Significance:", "Ìtumọ̀ Àṣà:")}
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {language === "yoruba" ? layer.culturalSignificanceYoruba : layer.culturalSignificance}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">
                        {ts("Spiritual Purpose:", "Ète Ẹ̀mí:")}
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {language === "yoruba" ? layer.spiritualPurposeYoruba : layer.spiritualPurpose}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">
                        {ts("Traditional Use:", "Ìlò Ìbílẹ̀:")}
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {language === "yoruba" ? layer.traditionalUseYoruba : layer.traditionalUse}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Active Experience Summary */}
      {playingLayers.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
          <CardContent className="p-6">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">
              {ts("Current Experience:", "Ìrírí Lọ́wọ́lọ́wọ́:")}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {playingLayers.map(layer => (
                <Badge
                  key={layer.id}
                  className="text-white"
                  style={{ backgroundColor: layer.color }}
                >
                  {language === "yoruba" ? layer.nameYoruba : layer.name}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              {selectedCombination ? (
                <>
                  {ts("Sacred Combination:", "Ìdàpọ̀ Mímọ́:")} {selectedCombination}
                </>
              ) : (
                <>
                  {ts("Custom layered experience with", "Ìrírí ìṣedèdè àkànṣe pẹ̀lú")} {playingLayers.length} {ts("layers", "ipele")}
                </>
              )}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}