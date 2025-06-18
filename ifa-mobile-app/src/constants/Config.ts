import Constants from 'expo-constants';

// API Configuration
export const API_CONFIG = {
  BASE_URL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5000',
  ENDPOINTS: {
    READINGS: '/api/readings',
    ODU: '/api/odu',
    PRAYERS: '/api/prayers',
    SEARCH: '/api/search'
  }
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'Ifá Daily Readings',
  VERSION: Constants.expoConfig?.version || '1.0.0',
  IS_DEV: __DEV__,
  PLATFORM: Constants.platform
};

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: '#f59e0b',
    SECONDARY: '#d97706',
    BACKGROUND: '#fef3c7',
    TEXT: '#92400e',
    WHITE: '#ffffff',
    BLACK: '#000000'
  },
  FONTS: {
    REGULAR: 'System',
    BOLD: 'System'
  }
};