import type { ReactNode } from 'react';
import { useColorScheme } from 'nativewind';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getThemeColors } from '../../../constants/theme';

type AppScreenProps = {
  children: ReactNode;
};

export function AppScreen({ children }: AppScreenProps) {
  const { colorScheme } = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        className="flex-1"
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-section px-inner pb-content-bottom pt-3">
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
