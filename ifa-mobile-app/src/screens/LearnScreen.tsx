import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { THEME_CONFIG } from '../constants/Config';

const learningTopics = [
  {
    id: 1,
    title: 'Introduction to Ifá',
    titleYoruba: 'Ìfihàn sí Ifá',
    description: 'Learn the basics of the Ifá tradition and divination system',
    icon: 'book-outline',
  },
  {
    id: 2,
    title: 'The 16 Major Odu',
    titleYoruba: 'Àwọn Odù Mélòókan Ṣe',
    description: 'Understanding the primary Odu patterns and their meanings',
    icon: 'grid-outline',
  },
  {
    id: 3,
    title: 'Sacred Symbols',
    titleYoruba: 'Àwọn Àmì Mímọ́',
    description: 'Explore the symbolic language of Ifá divination',
    icon: 'shapes-outline',
  },
  {
    id: 4,
    title: 'Daily Practice',
    titleYoruba: 'Àdá Òjúmọ́',
    description: 'How to incorporate Ifá wisdom into your daily life',
    icon: 'sunny-outline',
  },
];

export default function LearnScreen() {
  const renderTopicCard = (topic: typeof learningTopics[0]) => (
    <TouchableOpacity key={topic.id} style={styles.topicCard}>
      <View style={styles.topicIcon}>
        <Ionicons 
          name={topic.icon as keyof typeof Ionicons.glyphMap} 
          size={32} 
          color={THEME_CONFIG.COLORS.PRIMARY} 
        />
      </View>
      <View style={styles.topicContent}>
        <Text style={styles.topicTitle}>{topic.title}</Text>
        <Text style={styles.topicTitleYoruba}>{topic.titleYoruba}</Text>
        <Text style={styles.topicDescription}>{topic.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={THEME_CONFIG.COLORS.TEXT} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn Ifá Wisdom</Text>
          <Text style={styles.headerSubtitle}>Kọ́ Ọgbọ́n Ifá</Text>
          <Text style={styles.headerDescription}>
            Discover the ancient wisdom of Ifá through structured learning paths
          </Text>
        </View>

        <View style={styles.topicsContainer}>
          {learningTopics.map(renderTopicCard)}
        </View>

        <View style={styles.comingSoonContainer}>
          <Ionicons name="construct-outline" size={48} color={THEME_CONFIG.COLORS.SECONDARY} />
          <Text style={styles.comingSoonTitle}>More Content Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            We're preparing comprehensive learning materials including interactive lessons, 
            audio pronunciations, and cultural context explanations.
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
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginBottom: 12,
  },
  headerDescription: {
    fontSize: 16,
    color: THEME_CONFIG.COLORS.TEXT,
    textAlign: 'center',
    lineHeight: 22,
  },
  topicsContainer: {
    marginBottom: 32,
  },
  topicCard: {
    backgroundColor: THEME_CONFIG.COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topicIcon: {
    width: 48,
    height: 48,
    backgroundColor: THEME_CONFIG.COLORS.BACKGROUND,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 2,
  },
  topicTitleYoruba: {
    fontSize: 14,
    fontStyle: 'italic',
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: THEME_CONFIG.COLORS.TEXT,
    lineHeight: 18,
  },
  comingSoonContainer: {
    backgroundColor: THEME_CONFIG.COLORS.WHITE,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_CONFIG.COLORS.TEXT,
    marginTop: 16,
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 14,
    color: THEME_CONFIG.COLORS.TEXT,
    textAlign: 'center',
    lineHeight: 20,
  },
});