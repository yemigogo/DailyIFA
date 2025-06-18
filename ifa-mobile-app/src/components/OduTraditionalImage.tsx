import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, G, Defs, RadialGradient, LinearGradient, Stop } from 'react-native-svg';

import { THEME_CONFIG } from '../constants/Config';

interface OduTraditionalImageProps {
  oduName: string;
  pattern: boolean[][];
  size?: number;
  style?: any;
}

// Traditional Odu Ifa sacred symbols and visual representations
const ODU_TRADITIONAL_SYMBOLS: { [key: string]: any } = {
  "Ogbe Meji": {
    meaning: "Double Light, Divine Clarity",
    element: "Light/Fire",
    colors: ["#FFD700", "#FFA500"],
    sacredLines: 8,
    description: "Eight unbroken lines representing divine illumination"
  },
  "Oyeku Meji": {
    meaning: "Double Darkness, Mystery",
    element: "Darkness/Water", 
    colors: ["#2C3E50", "#34495E"],
    sacredLines: 8,
    description: "Eight broken lines representing hidden wisdom"
  },
  "Iwori Meji": {
    meaning: "Sacred Wisdom Emerging",
    element: "Earth/Metal",
    colors: ["#8B4513", "#CD853F"],
    sacredLines: 6,
    description: "Mixed lines showing wisdom through experience"
  },
  "Odi Meji": {
    meaning: "Foundation and Stability",
    element: "Earth",
    colors: ["#654321", "#D2691E"],
    sacredLines: 6,
    description: "Alternating pattern showing balance"
  },
  "Irosun Meji": {
    meaning: "Inner Light Rising",
    element: "Fire/Air",
    colors: ["#FF6B35", "#F7931E"],
    sacredLines: 4,
    description: "Rising energy pattern"
  },
  "Owonrin Meji": {
    meaning: "Transformation Through Challenges",
    element: "Air/Water",
    colors: ["#4A90E2", "#7ED321"],
    sacredLines: 4,
    description: "Energy moving from below"
  }
};

export default function OduTraditionalImage({ 
  oduName, 
  pattern, 
  size = 120,
  style 
}: OduTraditionalImageProps) {
  const oduData = ODU_TRADITIONAL_SYMBOLS[oduName] || {
    meaning: "Sacred Odu Pattern",
    element: "Spirit",
    colors: [THEME_CONFIG.COLORS.PRIMARY, THEME_CONFIG.COLORS.SECONDARY],
    sacredLines: pattern.length * pattern[0]?.length || 4,
    description: "Traditional Ifa divination pattern"
  };

  const primaryColor = oduData.colors[0];
  const secondaryColor = oduData.colors[1];

  const renderOduLines = () => {
    const elements: React.ReactElement[] = [];
    const startX = size / 4;
    const startY = size / 4;
    const legSpacing = size / 4;
    const lineSpacing = size / 8;

    pattern.forEach((leg, legIndex) => {
      leg.forEach((mark, markIndex) => {
        const x = startX + (legIndex * legSpacing);
        const y = startY + (markIndex * lineSpacing);
        const lineWidth = mark ? size / 6 : size / 8;

        if (mark) {
          // Solid line for true values
          elements.push(
            <Rect
              key={`${legIndex}-${markIndex}`}
              x={x}
              y={y}
              width={lineWidth}
              height={4}
              rx={1}
              fill="url(#lineGradient)"
              stroke={primaryColor}
              strokeWidth="0.5"
            />
          );
        } else {
          // Broken line for false values (traditional Ifa style)
          const gapSize = 2;
          const segmentWidth = (lineWidth - gapSize) / 2;
          
          elements.push(
            <G key={`${legIndex}-${markIndex}`}>
              <Rect
                x={x}
                y={y}
                width={segmentWidth}
                height={4}
                rx={1}
                fill="url(#lineGradient)"
                stroke={primaryColor}
                strokeWidth="0.5"
              />
              <Rect
                x={x + segmentWidth + gapSize}
                y={y}
                width={segmentWidth}
                height={4}
                rx={1}
                fill="url(#lineGradient)"
                stroke={primaryColor}
                strokeWidth="0.5"
              />
            </G>
          );
        }
      });
    });

    return elements;
  };

  return (
    <View style={[styles.container, style]}>
      {/* Traditional Odu Sacred Image */}
      <View style={[
        styles.imageContainer,
        { 
          backgroundColor: primaryColor + '20',
          borderColor: primaryColor,
          shadowColor: primaryColor 
        }
      ]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            <RadialGradient id="oduGradient" cx="30%" cy="30%">
              <Stop offset="0%" stopColor={primaryColor + "40"} />
              <Stop offset="100%" stopColor={secondaryColor + "60"} />
            </RadialGradient>
            <LinearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={primaryColor} />
              <Stop offset="100%" stopColor={secondaryColor} />
            </LinearGradient>
          </Defs>

          {/* Background Circle with Sacred Geometry */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}
            fill="url(#oduGradient)"
            stroke={primaryColor}
            strokeWidth="2"
          />

          {/* Traditional Odu Pattern Lines */}
          <G>
            {renderOduLines()}
          </G>

          {/* Sacred Element Symbol */}
          <G>
            <Circle
              cx={size / 2}
              cy={size / 2 + size / 3}
              r={size / 12}
              fill={primaryColor + "80"}
              stroke={secondaryColor}
              strokeWidth="1"
            />
          </G>

          {/* Traditional Corner Markings */}
          {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = size/2 + Math.cos(rad) * (size/2 - 12);
            const y = size/2 + Math.sin(rad) * (size/2 - 12);
            
            return (
              <Circle
                key={i}
                cx={x}
                cy={y}
                r={2}
                fill={primaryColor}
                opacity={0.8}
              />
            );
          })}
        </Svg>
      </View>

      {/* Odu Information */}
      <View style={styles.infoContainer}>
        <Text style={[styles.oduName, { color: primaryColor }]}>
          {oduName}
        </Text>
        <Text style={[styles.oduMeaning, { color: secondaryColor }]}>
          {oduData.meaning}
        </Text>
        <Text style={styles.oduDescription}>
          {oduData.description}
        </Text>
        <View style={styles.tagsContainer}>
          <View style={[styles.elementTag, { backgroundColor: primaryColor }]}>
            <Text style={styles.elementText}>{oduData.element}</Text>
          </View>
          <Text style={styles.sacredLinesText}>
            {oduData.sacredLines} Sacred Lines
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  infoContainer: {
    marginTop: 12,
    alignItems: 'center',
    maxWidth: 200,
  },
  oduName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  oduMeaning: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
  oduDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 8,
  },
  elementTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  elementText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  sacredLinesText: {
    fontSize: 10,
    color: '#666',
  },
});