import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

import { getThemeColors, theme as designTheme } from '../constants/theme';
import { CitiesScreen } from '../screens/cities/CitiesScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';

type AppTabParamList = {
  Home: undefined;
  Cities: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabs() {
  const { colorScheme } = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const baseNavigationTheme =
    colorScheme === 'dark' ? NavigationDarkTheme : NavigationLightTheme;
  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      background: colors.background,
      border: colors.border,
      card: colors.surface,
      primary: colors.primary,
      text: colors.secondary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontFamily: designTheme.fonts.medium,
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarIcon: ({ color, focused, size }) => {
            const iconName =
              route.name === 'Home'
                ? focused
                  ? 'home'
                  : 'home-outline'
                : route.name === 'Cities'
                  ? focused
                    ? 'location'
                    : 'location-outline'
                  : focused
                    ? 'settings'
                    : 'settings-outline';

            return <Ionicons color={color} name={iconName} size={size} />;
          },
        })}
      >
        <Tab.Screen
          component={HomeScreen}
          name='Home'
          options={{ tabBarLabel: 'Kezdőlap' }}
        />
        <Tab.Screen
          component={CitiesScreen}
          name='Cities'
          options={{ tabBarLabel: 'Városok' }}
        />
        <Tab.Screen
          component={SettingsScreen}
          name='Settings'
          options={{ tabBarLabel: 'Beállítások' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
