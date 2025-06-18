import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

import { apiService, DailyReading } from '../services/ApiService';
import { THEME_CONFIG } from '../constants/Config';
import OduTraditionalImage from '../components/OduTraditionalImage';

export default function HistoryScreen() {
  const { data: readings, isLoading } = useQuery({
    queryKey: ['readingHistory'],
    queryFn: () => apiService.getReadingHistory(20),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderReadingItem = ({ item }: { item: DailyReading }) => (
    <TouchableOpacity style={styles.readingItem}>
      <View style={styles.readingHeader}>
        <Text style={styles.readingDate}>{formatDate(item.date)}</Text>
        <Ionicons name="chevron-forward" size={20} color={THEME_CONFIG.COLORS.TEXT} />
      </View>
      
      <View style={styles.readingContent}>
        <View style={styles.oduImageWrapper}>
          <OduTraditionalImage
            oduName={item.odu.name}
            pattern={item.odu.pattern}
            size={60}
          />
        </View>
        <View style={styles.oduTextContent}>
          <Text style={styles.oduName}>{item.odu.name}</Text>
          <Text style={styles.oduNameYoruba}>{item.odu.nameYoruba}</Text>
          <Text style={styles.readingPreview} numberOfLines={2}>
            {item.odu.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={THEME_CONFIG.COLORS.PRIMARY} />
          <Text style={styles.loadingText}>Loading reading history...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={readings}
        renderItem={renderReadingItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_CONFIG.COLORS.BACKGROUND,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: THEME_CONFIG.COLORS.TEXT,
  },
  listContainer: {
    padding: 16,
  },
  readingItem: {
    backgroundColor: THEME_CONFIG.COLORS.WHITE,
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
  readingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  readingDate: {
    fontSize: 14,
    color: THEME_CONFIG.COLORS.SECONDARY,
    fontWeight: '500',
  },
  readingContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  oduImageWrapper: {
    flexShrink: 0,
  },
  oduTextContent: {
    flex: 1,
  },
  oduName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 4,
  },
  oduNameYoruba: {
    fontSize: 12,
    fontStyle: 'italic',
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginBottom: 8,
  },
  readingPreview: {
    fontSize: 14,
    color: THEME_CONFIG.COLORS.TEXT,
    lineHeight: 20,
  },
});