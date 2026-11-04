import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../constants/theme';

type AppScreenProps = {
  children: ReactNode;
};

export function AppScreen({ children }: AppScreenProps) {
  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <ScrollView
        className="flex-1"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-section px-inner pb-content-bottom pt-3">
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
