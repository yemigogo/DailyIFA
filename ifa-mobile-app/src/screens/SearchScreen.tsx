import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

import { apiService, Odu } from '../services/ApiService';
import { THEME_CONFIG } from '../constants/Config';

const commonProblems = [
  'relationship issues',
  'financial difficulties',
  'career guidance',
  'health concerns',
  'family conflicts',
  'spiritual growth',
  'decision making',
  'protection',
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['oduSearch', selectedProblem],
    queryFn: () => apiService.searchOduByProblem(selectedProblem),
    enabled: !!selectedProblem,
  });

  const handleProblemSelect = (problem: string) => {
    setSelectedProblem(problem);
    setSearchQuery(problem);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSelectedProblem(searchQuery.trim());
    }
  };

  const renderProblemChip = (problem: string) => (
    <TouchableOpacity
      key={problem}
      style={[
        styles.problemChip,
        selectedProblem === problem && styles.selectedChip
      ]}
      onPress={() => handleProblemSelect(problem)}
    >
      <Text style={[
        styles.problemChipText,
        selectedProblem === problem && styles.selectedChipText
      ]}>
        {problem}
      </Text>
    </TouchableOpacity>
  );

  const renderOduResult = ({ item }: { item: Odu }) => (
    <TouchableOpacity style={styles.oduCard}>
      <View style={styles.oduHeader}>
        <Text style={styles.oduName}>{item.name}</Text>
        <Text style={styles.oduNameYoruba}>{item.nameYoruba}</Text>
      </View>
      
      <Text style={styles.oduSubtitle}>{item.subtitle}</Text>
      <Text style={styles.oduSubtitleYoruba}>{item.subtitleYoruba}</Text>
      
      <Text style={styles.oduMessage} numberOfLines={3}>
        {item.message}
      </Text>
      
      <View style={styles.oduFooter}>
        <Text style={styles.readMoreText}>Tap to read full guidance</Text>
        <Ionicons name="chevron-forward" size={16} color={THEME_CONFIG.COLORS.SECONDARY} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="What guidance do you seek?"
            placeholderTextColor={THEME_CONFIG.COLORS.TEXT + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={20} color={THEME_CONFIG.COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        <View style={styles.problemsContainer}>
          <Text style={styles.problemsTitle}>Common Life Situations:</Text>
          <View style={styles.problemsGrid}>
            {commonProblems.map(renderProblemChip)}
          </View>
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={THEME_CONFIG.COLORS.PRIMARY} />
          <Text style={styles.loadingText}>Searching for guidance...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={THEME_CONFIG.COLORS.SECONDARY} />
          <Text style={styles.errorText}>Unable to search at this time</Text>
        </View>
      )}

      {searchResults && searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={renderOduResult}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {searchResults && searchResults.length === 0 && selectedProblem && (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={48} color={THEME_CONFIG.COLORS.SECONDARY} />
          <Text style={styles.noResultsText}>No specific guidance found for this topic</Text>
          <Text style={styles.noResultsSubtext}>Try a different search term or browse daily readings</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_CONFIG.COLORS.BACKGROUND,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: THEME_CONFIG.COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: THEME_CONFIG.COLORS.BACKGROUND,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: THEME_CONFIG.COLORS.TEXT,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: THEME_CONFIG.COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  problemsContainer: {
    marginTop: 8,
  },
  problemsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 12,
  },
  problemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  problemChip: {
    backgroundColor: THEME_CONFIG.COLORS.BACKGROUND,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME_CONFIG.COLORS.PRIMARY + '40',
  },
  selectedChip: {
    backgroundColor: THEME_CONFIG.COLORS.PRIMARY,
  },
  problemChipText: {
    fontSize: 12,
    color: THEME_CONFIG.COLORS.TEXT,
  },
  selectedChipText: {
    color: THEME_CONFIG.COLORS.WHITE,
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: THEME_CONFIG.COLORS.TEXT,
    marginTop: 16,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginTop: 8,
    textAlign: 'center',
  },
  resultsContainer: {
    padding: 16,
  },
  oduCard: {
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
  oduHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  oduName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME_CONFIG.COLORS.TEXT,
  },
  oduNameYoruba: {
    fontSize: 14,
    fontStyle: 'italic',
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginTop: 2,
  },
  oduSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 2,
  },
  oduSubtitleYoruba: {
    fontSize: 14,
    fontStyle: 'italic',
    color: THEME_CONFIG.COLORS.SECONDARY,
    marginBottom: 12,
  },
  oduMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: THEME_CONFIG.COLORS.TEXT,
    marginBottom: 12,
  },
  oduFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 12,
    color: THEME_CONFIG.COLORS.SECONDARY,
    fontStyle: 'italic',
  },
});