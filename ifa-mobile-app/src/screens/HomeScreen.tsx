import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

import { apiService, DailyReading } from '../services/ApiService';
import { THEME_CONFIG } from '../constants/Config';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const { data: dailyReading, isLoading, error } = useQuery({
    queryKey: ['dailyReading', selectedDate],
    queryFn: () => apiService.getDailyReading(selectedDate),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);
    
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    
    // Don't allow future dates
    const today = new Date();
    if (newDate <= today) {
      setSelectedDate(newDate.toISOString().split('T')[0]);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={THEME_CONFIG.COLORS.PRIMARY} />
          <Text style={styles.loadingText}>Loading daily reading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={THEME_CONFIG.COLORS.SECONDARY} />
          <Text style={styles.errorText}>Unable to load daily reading</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => Alert.alert('Error', 'Please check your internet connection')}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Date Navigation */}
        <View style={styles.dateNavigation}>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => navigateDate('prev')}
          >
            <Ionicons name="chevron-back" size={24} color={THEME_CONFIG.COLORS.PRIMARY} />
          </TouchableOpacity>
          
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => navigateDate('next')}
            disabled={selectedDate === new Date().toISOString().split('T')[0]}
          >
            <Ionicons 
              name="chevron-forward" 
              size={24} 
              color={selectedDate === new Date().toISOString().split('T')[0] ? '#ccc' : THEME_CONFIG.COLORS.PRIMARY} 
            />
          </TouchableOpacity>
        </View>

        {/* Daily Reading Card */}
        {dailyReading && (
          <View style={styles.readingCard}>
            <View style={styles.oduHeader}>
              <Text style={styles.oduName}>{dailyReading.odu.name}</Text>
              <Text style={styles.oduNameYoruba}>{dailyReading.odu.nameYoruba}</Text>
            </View>

            {/* Odu Pattern Visualization */}
            <View style={styles.oduPattern}>
              {dailyReading.odu.pattern.map((leg: boolean[], legIndex: number) => (
                <View key={legIndex} style={styles.patternLeg}>
                  {leg.map((mark: boolean, markIndex: number) => (
                    <View
                      key={markIndex}
                      style={[
                        styles.patternMark,
                        { backgroundColor: mark ? THEME_CONFIG.COLORS.PRIMARY : THEME_CONFIG.COLORS.BACKGROUND }
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.messageContainer}>
              <Text style={styles.messageTitle}>Today's Message</Text>
              <Text style={styles.messageText}>{dailyReading.odu.message}</Text>
              
              <Text style={styles.messageTitle}>Ọ̀rọ̀ Òjúmọ́</Text>
              <Text style={styles.messageTextYoruba}>{dailyReading.odu.messageYoruba}</Text>
            </View>

            <View style={styles.reflectionContainer}>
              <Text style={styles.reflectionTitle}>Reflection</Text>
              <Text style={styles.reflectionText}>
                How can I apply this wisdom in my daily life? What actions can I take today to align with this guidance?
              </Text>
            </View>
          </View>
        )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: THEME_CONFIG.COLORS.TEXT,
    marginTop: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: THEME_CONFIG.COLORS.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: THEME_CONFIG.COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dateButton: {
    padding: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_CONFIG.COLORS.TEXT,
    textAlign: 'center',
    flex: 1,
  },
  readingCard: {
    backgroundColor: THEME_CONFIG.COLORS.WHITE,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  oduHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  oduName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME_CONFIG.COLORS.TEXT,
  },
  oduNameYoruba: {
    fontSize: 18,
    fontStyle: 'italic',
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginTop: 4,
  },
  oduPattern: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 16,
  },
  patternLeg: {
    flexDirection: 'column',
    gap: 6,
  },
  patternMark: {
    width: 24,
    height: 6,
    borderRadius: 3,
  },
  messageContainer: {
    marginBottom: 20,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 16,
  },
  messageTextYoruba: {
    fontSize: 16,
    lineHeight: 24,
    color: THEME_CONFIG.COLORS.SECONDARY,
    fontStyle: 'italic',
  },
  reflectionContainer: {
    backgroundColor: THEME_CONFIG.COLORS.BACKGROUND,
    padding: 16,
    borderRadius: 8,
  },
  reflectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 8,
  },
  reflectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: THEME_CONFIG.COLORS.TEXT,
    fontStyle: 'italic',
  },
});