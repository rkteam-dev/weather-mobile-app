import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';

import { AppCard } from '../../components/global/AppCard/AppCard';
import { AppScreen } from '../../components/global/AppScreen/AppScreen';
import { AppText } from '../../components/global/AppText/AppText';
import { theme } from '../../constants/theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type SettingsButtonProps = {
  danger?: boolean;
  description: string;
  icon: IoniconName;
  label: string;
};

function SettingsButton({
  danger = false,
  description,
  icon,
  label,
}: SettingsButtonProps) {
  const color = danger ? theme.colors.danger : theme.colors.primary;

  return (
    <Pressable
      accessibilityRole='button'
      accessibilityState={{ disabled: true }}
      className='flex-row items-center gap-4 rounded-control border border-border bg-surface p-inner'
      disabled
    >
      <View
        className={`h-12 w-12 items-center justify-center rounded-control ${danger ? 'bg-danger-soft' : 'bg-primary-soft'}`}
      >
        <Ionicons color={color} name={icon} size={23} />
      </View>

      <View className='flex-1 gap-1'>
        <AppText
          className={danger ? 'text-danger' : 'text-secondary'}
          variant='bodyMedium'
        >
          {label}
        </AppText>
        <AppText className='text-muted' style={{ fontSize: 13, lineHeight: 19 }}>
          {description}
        </AppText>
      </View>

      <Ionicons color={theme.colors.muted} name='chevron-forward' size={20} />
    </Pressable>
  );
}

export function SettingsScreen() {
  return (
    <AppScreen>
      <View className='gap-3'>
        <AppText className='text-primary' variant='caption'>
          WEATHERLY
        </AppText>
        <AppText className='text-secondary' variant='hero'>
          Beállítások
        </AppText>
        <AppText className='text-muted'>
          Itt találod majd az alkalmazással és az adataiddal kapcsolatos
          lehetőségeket.
        </AppText>
      </View>

      <View className='gap-4'>
        <AppText className='text-secondary' variant='heading'>
          Kapcsolatok
        </AppText>

        <SettingsButton
          description='Hivatalos információk és frissítések'
          icon='globe-outline'
          label='Weboldal'
        />

        <AppCard className='gap-5'>
          <View className='gap-1'>
            <AppText className='text-secondary' variant='bodyMedium'>
              Kövess minket
            </AppText>
            <AppText className='text-muted' style={{ fontSize: 13 }}>
              Közösségi oldalaink hamarosan elérhetők lesznek.
            </AppText>
          </View>

          <View className='flex-row gap-3'>
            {(['logo-facebook', 'logo-instagram', 'logo-linkedin'] as const).map(
              (icon) => (
                <Pressable
                  accessibilityRole='button'
                  accessibilityState={{ disabled: true }}
                  className='h-12 w-12 items-center justify-center rounded-full bg-primary-soft'
                  disabled
                  key={icon}
                >
                  <Ionicons color={theme.colors.primary} name={icon} size={22} />
                </Pressable>
              ),
            )}
          </View>
        </AppCard>
      </View>

      <View className='gap-4'>
        <AppText className='text-secondary' variant='heading'>
          Alkalmazás
        </AppText>

        <SettingsButton
          description='Hogyan kezeljük és védjük az adataidat'
          icon='shield-checkmark-outline'
          label='Adatvédelmi tájékoztató'
        />
        <SettingsButton
          description='Segítség és kapcsolatfelvétel'
          icon='help-circle-outline'
          label='Támogatás'
        />
        <SettingsButton
          description='Verzió és alkalmazásinformációk'
          icon='information-circle-outline'
          label='Az alkalmazásról'
        />
        <SettingsButton
          danger
          description='Az alkalmazásban tárolt adatok végleges eltávolítása'
          icon='trash-outline'
          label='Adatok törlése'
        />
      </View>
    </AppScreen>
  );
}
