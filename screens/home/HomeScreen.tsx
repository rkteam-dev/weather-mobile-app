import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Modal,
  Pressable,
  View,
} from 'react-native';

import { AppCard } from '../../components/global/AppCard/AppCard';
import { AppScreen } from '../../components/global/AppScreen/AppScreen';
import { AppText } from '../../components/global/AppText/AppText';
import { getThemeColors } from '../../constants/theme';
import { useWeather } from '../../context/weather/WeatherContext';
import type { WeatherVisual } from '../../types/weather/weather';

const iconByCondition: Record<WeatherVisual, keyof typeof Ionicons.glyphMap> = {
  'clear-day': 'sunny',
  'clear-night': 'moon',
  cloudy: 'cloud',
  rain: 'rainy',
};

function formatLastUpdated(date: Date) {
  return new Intl.DateTimeFormat('hu-HU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);
  const {
    refreshCity,
    savedCities,
    selectCity,
    selectedCity,
    weatherByCityId,
  } = useWeather();
  const weather = weatherByCityId[selectedCity.id];
  const data = weather?.data ?? null;
  const error = weather?.error ?? null;
  const isLoading = weather?.isLoading ?? true;
  const isRefreshing = weather?.isRefreshing ?? false;
  const lastUpdatedAt = weather?.lastUpdatedAt ?? null;

  return (
    <AppScreen>
      <View className='gap-8'>
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center gap-3'>
            <View className='h-11 w-11 items-center justify-center rounded-control bg-primary-soft dark:bg-dark-primary-soft'>
              <Ionicons color={colors.primary} name='partly-sunny' size={24} />
            </View>
            <AppText
              className='text-secondary dark:text-dark-secondary'
              variant='bodyMedium'
            >
              Weatherly
            </AppText>
          </View>

          <Pressable
            accessibilityLabel={`Mentett város kiválasztása. Jelenleg ${selectedCity.name}.`}
            accessibilityRole='button'
            className='min-h-11 min-w-[33%] max-w-[52%] flex-row items-center gap-2 rounded-control border border-border bg-surface px-3 py-2 dark:border-dark-border dark:bg-dark-surface'
            onPress={() => setIsCityPickerVisible(true)}
          >
            <Ionicons color={colors.primary} name='location' size={18} />
            <AppText
              className='flex-1 text-secondary dark:text-dark-secondary'
              numberOfLines={1}
              style={{ fontSize: 14, lineHeight: 20 }}
              variant='bodyMedium'
            >
              {selectedCity.name}
            </AppText>
            <Ionicons color={colors.muted} name='chevron-down' size={17} />
          </Pressable>
        </View>

        <View className='gap-3'>
          <AppText
            className='text-primary dark:text-dark-primary'
            variant='caption'
          >
            AKTUÁLIS IDŐJÁRÁS
          </AppText>
          <AppText
            className='text-secondary dark:text-dark-secondary'
            variant='hero'
          >
            Üdvözöllek, David!
          </AppText>
          <AppText className='max-w-[340px] text-muted dark:text-dark-muted'>
            Nézd meg, milyen idő van most {selectedCity.name} városában.
          </AppText>
        </View>
      </View>

      <AppCard
        className='min-h-[260px] justify-between overflow-hidden'
        variant='primary'
      >
        <View className='absolute -right-10 -top-8 h-40 w-40 rounded-full bg-white/10' />
        <View className='absolute -bottom-14 -left-8 h-36 w-36 rounded-full bg-primary-dark/60' />

        {isLoading ? (
          <View className='flex-1 items-center justify-center gap-4'>
            <ActivityIndicator color='#FFFFFF' size='large' />
            <AppText className='text-white/80'>Időjárás betöltése...</AppText>
          </View>
        ) : error && !data ? (
          <View className='flex-1 items-center justify-center gap-4'>
            <Ionicons color='#FFFFFF' name='cloud-offline-outline' size={36} />
            <AppText className='text-center text-white'>{error}</AppText>
            <Pressable
              accessibilityRole='button'
              className='min-h-11 flex-row items-center gap-2 rounded-control bg-white/15 px-4'
              onPress={() => void refreshCity(selectedCity)}
            >
              <Ionicons color='#FFFFFF' name='refresh' size={19} />
              <AppText className='text-white' variant='bodyMedium'>
                Újrapróbálás
              </AppText>
            </Pressable>
          </View>
        ) : data ? (
          <>
            <View className='flex-row items-start justify-between gap-5'>
              <View className='gap-1'>
                <AppText
                  className='text-white'
                  style={{ fontSize: 62, lineHeight: 68 }}
                  variant='hero'
                >
                  {Math.round(data.temperatureCelsius)}°
                </AppText>
                <AppText className='text-white/80'>
                  Hőérzet {Math.round(data.apparentTemperatureCelsius)}°
                </AppText>
              </View>

              <View className='h-16 w-16 items-center justify-center rounded-full bg-white/15'>
                <Ionicons
                  color={data.condition === 'clear-day' ? colors.sun : '#FFFFFF'}
                  name={iconByCondition[data.condition]}
                  size={34}
                />
              </View>
            </View>

            <View className='gap-2'>
              <AppText className='text-white' variant='heading'>
                {data.conditionLabel}
              </AppText>
              <View className='flex-row items-center justify-between gap-4'>
                <AppText className='text-white/75'>
                  {data.isDay ? 'Nappal' : 'Éjszaka'} · {selectedCity.name}
                </AppText>
                <Pressable
                  accessibilityLabel='Időjárás frissítése'
                  accessibilityRole='button'
                  className='h-11 w-11 items-center justify-center rounded-full bg-white/15'
                  disabled={isRefreshing}
                  onPress={() => void refreshCity(selectedCity)}
                >
                  {isRefreshing ? (
                    <ActivityIndicator color='#FFFFFF' size='small' />
                  ) : (
                    <Ionicons color='#FFFFFF' name='refresh' size={21} />
                  )}
                </Pressable>
              </View>
            </View>
          </>
        ) : null}
      </AppCard>

      {data ? (
        <View className='gap-5'>
          <View className='flex-row items-center justify-between gap-4'>
            <AppText
              className='text-secondary dark:text-dark-secondary'
              variant='heading'
            >
              Részletek
            </AppText>
            {lastUpdatedAt ? (
              <AppText
                className='text-muted dark:text-dark-muted'
                style={{ fontSize: 13 }}
              >
                Frissítve: {formatLastUpdated(lastUpdatedAt)}
              </AppText>
            ) : null}
          </View>

          <View className='flex-row flex-wrap gap-4'>
            <AppCard className='min-w-[46%] flex-1 gap-3'>
              <Ionicons color={colors.primary} name='water-outline' size={22} />
              <AppText className='text-muted dark:text-dark-muted'>
                Páratartalom
              </AppText>
              <AppText
                className='text-secondary dark:text-dark-secondary'
                variant='heading'
              >
                {Math.round(data.humidityPercent)}%
              </AppText>
            </AppCard>

            <AppCard className='min-w-[46%] flex-1 gap-3'>
              <Ionicons color={colors.primary} name='leaf-outline' size={22} />
              <AppText className='text-muted dark:text-dark-muted'>Szél</AppText>
              <AppText
                className='text-secondary dark:text-dark-secondary'
                variant='heading'
              >
                {Math.round(data.windSpeedKmh)} km/h
              </AppText>
            </AppCard>

            <AppCard className='w-full gap-3'>
              <View className='flex-row items-center justify-between gap-4'>
                <View className='flex-row items-center gap-3'>
                  <Ionicons
                    color={colors.primary}
                    name='rainy-outline'
                    size={22}
                  />
                  <AppText className='text-muted dark:text-dark-muted'>
                    Aktuális csapadék
                  </AppText>
                </View>
                <AppText
                  className='text-secondary dark:text-dark-secondary'
                  variant='heading'
                >
                  {data.precipitationMm} mm
                </AppText>
              </View>
            </AppCard>
          </View>

          {error ? (
            <AppCard className='gap-3 border-danger bg-danger-soft dark:border-dark-danger dark:bg-dark-danger-soft'>
              <AppText className='text-danger dark:text-dark-danger'>
                {error} A korábbi adatok továbbra is láthatók.
              </AppText>
            </AppCard>
          ) : null}

          <Pressable
            accessibilityRole='link'
            onPress={() => void Linking.openURL('https://open-meteo.com/')}
          >
            <AppText
              className='text-center text-muted underline dark:text-dark-muted'
              style={{ fontSize: 12 }}
            >
              Időjárási adatok: Open-Meteo
            </AppText>
          </Pressable>
        </View>
      ) : null}

      <Modal
        animationType='fade'
        onRequestClose={() => setIsCityPickerVisible(false)}
        statusBarTranslucent
        transparent
        visible={isCityPickerVisible}
      >
        <Pressable
          accessibilityRole='button'
          className='flex-1 items-center justify-center bg-black/55 px-inner'
          onPress={() => setIsCityPickerVisible(false)}
        >
          <Pressable
            className='w-full max-w-[420px] gap-4 rounded-card border border-border bg-surface p-inner dark:border-dark-border dark:bg-dark-surface'
            onPress={(event) => event.stopPropagation()}
          >
            <View className='flex-row items-center justify-between gap-4'>
              <View className='flex-1 gap-1'>
                <AppText
                  className='text-secondary dark:text-dark-secondary'
                  variant='heading'
                >
                  Válassz várost
                </AppText>
                <AppText className='text-muted dark:text-dark-muted'>
                  A kezdőlap a kiválasztott város adatait mutatja.
                </AppText>
              </View>
              <Pressable
                accessibilityLabel='Városválasztó bezárása'
                className='h-11 w-11 items-center justify-center rounded-control bg-primary-soft dark:bg-dark-primary-soft'
                onPress={() => setIsCityPickerVisible(false)}
              >
                <Ionicons color={colors.primary} name='close' size={22} />
              </Pressable>
            </View>

            <View className='gap-2'>
              {savedCities.map((city) => {
                const isSelected = city.id === selectedCity.id;
                return (
                  <Pressable
                    accessibilityRole='button'
                    className={`min-h-14 flex-row items-center gap-3 rounded-control border px-4 py-3 ${
                      isSelected
                        ? 'border-primary bg-primary-soft dark:border-dark-primary dark:bg-dark-primary-soft'
                        : 'border-border dark:border-dark-border'
                    }`}
                    key={city.id}
                    onPress={() => {
                      selectCity(city.id);
                      setIsCityPickerVisible(false);
                    }}
                  >
                    <Ionicons color={colors.primary} name='location' size={21} />
                    <View className='flex-1'>
                      <AppText
                        className='text-secondary dark:text-dark-secondary'
                        variant='bodyMedium'
                      >
                        {city.name}
                      </AppText>
                      <AppText
                        className='text-muted dark:text-dark-muted'
                        style={{ fontSize: 13 }}
                      >
                        {city.country}
                      </AppText>
                    </View>
                    {isSelected ? (
                      <Ionicons
                        color={colors.primary}
                        name='checkmark-circle'
                        size={23}
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </AppScreen>
  );
}
