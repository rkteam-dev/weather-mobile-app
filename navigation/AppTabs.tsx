import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { theme } from '../constants/theme';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';

type AppTabParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.muted,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontFamily: theme.fonts.medium,
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarIcon: ({ color, focused, size }) => {
            const iconName =
              route.name === 'Home'
                ? focused
                  ? 'home'
                  : 'home-outline'
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
          component={SettingsScreen}
          name='Settings'
          options={{ tabBarLabel: 'Beállítások' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
