import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { THEME_CONFIG } from '../constants/Config';

const dailyPrayers = [
  {
    id: 1,
    dayName: 'Sunday',
    dayNameYoruba: 'Ọjọ́ Àìkú',
    title: 'Prayer for New Beginnings',
    titleYoruba: 'Ìwúre fún Ìbẹ̀rẹ̀ Tuntun',
    prayer: 'Grant me wisdom to begin this week with clarity and purpose. May my actions align with divine will.',
    prayerYoruba: 'Fún mi ní ọgbọ́n láti bẹ̀rẹ̀ ọ̀sẹ̀ yìí pẹ̀lú kedere àti ète. Kí àwọn ìṣe mi bá ìfẹ́ Ọlọ́run mu.',
  },
  {
    id: 2,
    dayName: 'Monday',
    dayNameYoruba: 'Ọjọ́ Ajé',
    title: 'Prayer for Prosperity',
    titleYoruba: 'Ìwúre fún Ọrọ̀',
    prayer: 'Bless my work and endeavors today. May abundance flow through honest effort and righteous paths.',
    prayerYoruba: 'Bùkún iṣẹ́ àti àwọn ìgbìyànjú mi lónìí. Kí ọpọ̀lọpọ̀ sàn nípasẹ̀ ìgbìyànjú òtítọ́ àti ọ̀nà òdodo.',
  },
];

export default function PrayersScreen() {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const todaysPrayer = dailyPrayers[today] || dailyPrayers[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="flower" size={48} color={THEME_CONFIG.COLORS.PRIMARY} />
          <Text style={styles.headerTitle}>Daily Prayers</Text>
          <Text style={styles.headerSubtitle}>Ìwúre Òjúmọ́</Text>
        </View>

        <View style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <Text style={styles.todayLabel}>Today's Prayer</Text>
            <Text style={styles.dayName}>{todaysPrayer.dayName}</Text>
            <Text style={styles.dayNameYoruba}>{todaysPrayer.dayNameYoruba}</Text>
          </View>

          <View style={styles.prayerContent}>
            <Text style={styles.prayerTitle}>{todaysPrayer.title}</Text>
            <Text style={styles.prayerTitleYoruba}>{todaysPrayer.titleYoruba}</Text>
            
            <View style={styles.prayerTextContainer}>
              <Text style={styles.prayerText}>{todaysPrayer.prayer}</Text>
            </View>
            
            <View style={styles.prayerTextContainer}>
              <Text style={styles.prayerTextYoruba}>{todaysPrayer.prayerYoruba}</Text>
            </View>
          </View>
        </View>

        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>How to Pray</Text>
          <Text style={styles.instructionsText}>
            Find a quiet moment in your day. Face the east if possible. 
            Speak these words with intention and gratitude. 
            Allow the wisdom to guide your actions throughout the day.
          </Text>
          
          <Text style={styles.instructionsTitle}>Báwo ni a ṣe máa gbàdúrà</Text>
          <Text style={styles.instructionsText}>
            Wá àkókò ìdákẹ́ jẹ́ẹ́ ní ọjọ́ rẹ. Dojú kọ ìlà-oòrùn bí ó bá ṣe é ṣe. 
            Sọ àwọn ọ̀rọ̀ wọ̀nyí pẹ̀lú ète àti ọpẹ́. 
            Jẹ́ kí ọgbọ́n náà ṣe amọ̀nà àwọn ìṣe rẹ ní gbogbo ọjọ́.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_CONFIG.COLORS.BACKGROUND,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME_CONFIG.COLORS.TEXT,
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginTop: 4,
  },
  todayCard: {
    backgroundColor: THEME_CONFIG.COLORS.WHITE,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todayHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  todayLabel: {
    fontSize: 14,
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginBottom: 8,
  },
  dayName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME_CONFIG.COLORS.TEXT,
  },
  dayNameYoruba: {
    fontSize: 16,
    fontStyle: 'italic',
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginTop: 4,
  },
  prayerContent: {
    alignItems: 'center',
  },
  prayerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_CONFIG.COLORS.TEXT,
    textAlign: 'center',
    marginBottom: 4,
  },
  prayerTitleYoruba: {
    fontSize: 16,
    fontStyle: 'italic',
    color: THEME_CONFIG.COLORS.SECONDARY,
    textAlign: 'center',
    marginBottom: 20,
  },
  prayerTextContainer: {
    backgroundColor: THEME_CONFIG.COLORS.BACKGROUND,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
  },
  prayerText: {
    fontSize: 16,
    lineHeight: 24,
    color: THEME_CONFIG.COLORS.TEXT,
    textAlign: 'center',
  },
  prayerTextYoruba: {
    fontSize: 16,
    lineHeight: 24,
    color: THEME_CONFIG.COLORS.SECONDARY,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  instructionsCard: {
    backgroundColor: THEME_CONFIG.COLORS.WHITE,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    lineHeight: 20,
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 16,
  },
});