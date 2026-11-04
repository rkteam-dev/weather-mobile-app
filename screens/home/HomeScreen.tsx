import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';

import { theme } from '../../constants/theme';
import { AppCard } from '../../components/global/AppCard/AppCard';
import { AppScreen } from '../../components/global/AppScreen/AppScreen';
import { AppText } from '../../components/global/AppText/AppText';

export function HomeScreen() {
  return (
    <AppScreen>
      <View className='gap-8'>
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center gap-3'>
            <View className='h-11 w-11 items-center justify-center rounded-control bg-primary-soft'>
              <Ionicons
                accessibilityElementsHidden
                color={theme.colors.primary}
                name='partly-sunny'
                size={24}
              />
            </View>
            <AppText className='text-secondary' variant='bodyMedium'>
              Weatherly
            </AppText>
          </View>

          <View className='h-10 w-10 items-center justify-center rounded-full border border-border bg-surface'>
            <Ionicons
              accessibilityElementsHidden
              color={theme.colors.secondary}
              name='person-outline'
              size={20}
            />
          </View>
        </View>

        <View className='gap-3'>
          <AppText className='text-primary' variant='caption'>
            A TE IDŐJÁRÁSOD
          </AppText>
          <AppText className='text-secondary' variant='hero'>
            Üdvözöllek, David!
          </AppText>
          <AppText className='max-w-[340px] text-muted'>
            Egy nyugodt hely, ahol hamarosan minden fontos időjárási
            információt megtalálsz.
          </AppText>
        </View>
      </View>

      <AppCard
        className='min-h-[245px] justify-between overflow-hidden'
        variant='primary'
      >
        <View className='absolute -right-10 -top-8 h-40 w-40 rounded-full bg-white/10' />
        <View className='absolute -bottom-14 -left-8 h-36 w-36 rounded-full bg-primary-dark/60' />

        <View className='h-14 w-14 items-center justify-center rounded-full bg-white/15'>
          <Ionicons
            accessibilityElementsHidden
            color={theme.colors.sun}
            name='sunny'
            size={30}
          />
        </View>

        <View className='gap-2'>
          <AppText className='text-white' variant='heading'>
            Ma még csak ismerkedünk
          </AppText>
          <AppText className='text-white/75'>
            A következő lépésben ide érkezik majd az aktuális hőmérséklet és az
            előrejelzés.
          </AppText>
        </View>
      </AppCard>

      <View className='gap-5'>
        <View className='flex-row items-center gap-2'>
          <Ionicons
            accessibilityElementsHidden
            color={theme.colors.primary}
            name='checkmark-circle'
            size={20}
          />
          <AppText className='text-primary' variant='bodyMedium'>
            Az alkalmazás készen áll
          </AppText>
        </View>

        <AppCard className='gap-3'>
          <AppText className='text-secondary' variant='heading'>
            Egyszerű. Gyors. Átlátható.
          </AppText>
          <AppText className='text-muted'>
            Úgy építjük fel, hogy egyetlen pillantással lásd, mire számíthatsz
            odakint.
          </AppText>
        </AppCard>
      </View>
    </AppScreen>
  );
}
