import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LearnScreen from '../screens/LearnScreen';
import PrayersScreen from '../screens/PrayersScreen';
import SearchScreen from '../screens/SearchScreen';

import { THEME_CONFIG } from '../constants/Config';

export type RootTabParamList = {
  Home: undefined;
  History: undefined;
  Learn: undefined;
  Prayers: undefined;
  Search: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  OduDetail: { oduId: number };
  ReadingDetail: { date: string };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Learn') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Prayers') {
            iconName = focused ? 'flower' : 'flower-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else {
            iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: THEME_CONFIG.COLORS.PRIMARY,
        tabBarInactiveTintColor: THEME_CONFIG.COLORS.TEXT,
        tabBarStyle: {
          backgroundColor: THEME_CONFIG.COLORS.WHITE,
          borderTopColor: THEME_CONFIG.COLORS.BACKGROUND,
        },
        headerStyle: {
          backgroundColor: THEME_CONFIG.COLORS.PRIMARY,
        },
        headerTintColor: THEME_CONFIG.COLORS.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Daily Reading' }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen}
        options={{ title: 'History' }}
      />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen}
        options={{ title: 'Learn Ifá' }}
      />
      <Tab.Screen 
        name="Prayers" 
        component={PrayersScreen}
        options={{ title: 'Daily Prayers' }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ title: 'Search Problems' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={TabNavigator} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}