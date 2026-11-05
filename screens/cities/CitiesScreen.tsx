import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  TextInput,
  View,
} from 'react-native';

import { AppCard } from '../../components/global/AppCard/AppCard';
import { AppNoticeModal } from '../../components/global/AppNoticeModal/AppNoticeModal';
import { AppScreen } from '../../components/global/AppScreen/AppScreen';
import { AppText } from '../../components/global/AppText/AppText';
import { getThemeColors, theme } from '../../constants/theme';
import {
  MAX_SAVED_CITIES,
  useWeather,
} from '../../context/weather/WeatherContext';
import { searchWeatherLocations } from '../../services/weather/openMeteo';
import type {
  CityWeatherState,
  WeatherLocation,
  WeatherVisual,
} from '../../types/weather/weather';

const iconByCondition: Record<WeatherVisual, keyof typeof Ionicons.glyphMap> = {
  'clear-day': 'sunny',
  'clear-night': 'moon',
  cloudy: 'cloud',
  rain: 'rainy',
};

type NoticeState = {
  description: string;
  title: string;
  variant: 'error' | 'info' | 'warning';
};

type CityCardProps = {
  city: WeatherLocation;
  currentTime: Date;
  isOnlyCity: boolean;
  onDelete: (city: WeatherLocation) => void;
  onRefresh: (city: WeatherLocation) => void;
  weather: CityWeatherState | undefined;
};

function formatCityTime(date: Date, timezone: string) {
  return new Intl.DateTimeFormat('hu-HU', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  }).format(date);
}

function CityCard({
  city,
  currentTime,
  isOnlyCity,
  onDelete,
  onRefresh,
  weather,
}: CityCardProps) {
  const { colorScheme } = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const data = weather?.data;
  const conditionColor =
    data?.condition === 'clear-day' ? colors.sun : colors.primary;

  return (
    <AppCard className='gap-5'>
      <View className='flex-row items-start gap-4'>
        <View className='h-14 w-14 items-center justify-center rounded-control bg-primary-soft dark:bg-dark-primary-soft'>
          {weather?.isLoading || !weather ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Ionicons
              color={conditionColor}
              name={data ? iconByCondition[data.condition] : 'cloud-offline'}
              size={29}
            />
          )}
        </View>

        <View className='flex-1 gap-1'>
          <AppText
            className='text-secondary dark:text-dark-secondary'
            variant='heading'
          >
            {city.name}
          </AppText>
          <AppText
            className='text-muted dark:text-dark-muted'
            style={{ fontSize: 13, lineHeight: 19 }}
          >
            {city.country} · {formatCityTime(currentTime, city.timezone)}
          </AppText>
        </View>

        <Pressable
          accessibilityLabel={`${city.name} törlése`}
          accessibilityRole='button'
          className='h-11 w-11 items-center justify-center rounded-control bg-danger-soft dark:bg-dark-danger-soft'
          hitSlop={8}
          onPress={() => onDelete(city)}
        >
          <Ionicons
            color={isOnlyCity ? colors.muted : colors.danger}
            name='trash-outline'
            size={20}
          />
        </Pressable>
      </View>

      {data ? (
        <View className='flex-row items-end justify-between gap-4'>
          <View className='gap-1'>
            <AppText
              className='text-secondary dark:text-dark-secondary'
              style={{ fontSize: 38, lineHeight: 44 }}
              variant='hero'
            >
              {Math.round(data.temperatureCelsius)}°
            </AppText>
            <AppText className='text-muted dark:text-dark-muted'>
              {data.conditionLabel}
            </AppText>
          </View>

          <View className='items-end gap-3'>
            <View className='flex-row items-center gap-2'>
              <Ionicons color={colors.primary} name='water-outline' size={17} />
              <AppText
                className='text-secondary dark:text-dark-secondary'
                style={{ fontSize: 14 }}
                variant='bodyMedium'
              >
                {data.precipitationMm} mm
              </AppText>
            </View>
            <View className='flex-row items-center gap-2'>
              <Ionicons
                color={data.isDay ? colors.sun : colors.primary}
                name={data.isDay ? 'sunny-outline' : 'moon-outline'}
                size={17}
              />
              <AppText
                className='text-secondary dark:text-dark-secondary'
                style={{ fontSize: 14 }}
                variant='bodyMedium'
              >
                {data.isDay ? 'Nappal' : 'Éjszaka'}
              </AppText>
            </View>
          </View>
        </View>
      ) : weather?.error ? (
        <View className='gap-3'>
          <AppText className='text-danger dark:text-dark-danger'>
            {weather.error}
          </AppText>
          <Pressable
            accessibilityRole='button'
            className='min-h-11 flex-row items-center justify-center gap-2 rounded-control bg-primary-soft dark:bg-dark-primary-soft'
            onPress={() => onRefresh(city)}
          >
            <Ionicons color={colors.primary} name='refresh' size={19} />
            <AppText
              className='text-primary dark:text-dark-primary'
              variant='bodyMedium'
            >
              Újrapróbálás
            </AppText>
          </Pressable>
        </View>
      ) : (
        <View className='h-16 items-center justify-center'>
          <AppText className='text-muted dark:text-dark-muted'>
            Időjárás betöltése...
          </AppText>
        </View>
      )}

      {data && weather?.error ? (
        <AppText className='text-danger dark:text-dark-danger'>
          {weather.error} A korábbi adatok maradtak láthatók.
        </AppText>
      ) : null}

      {data ? (
        <Pressable
          accessibilityLabel={`${city.name} időjárásának frissítése`}
          accessibilityRole='button'
          className='min-h-11 flex-row items-center justify-center gap-2 rounded-control border border-border dark:border-dark-border'
          disabled={weather?.isRefreshing}
          onPress={() => onRefresh(city)}
        >
          {weather?.isRefreshing ? (
            <ActivityIndicator color={colors.primary} size='small' />
          ) : (
            <Ionicons color={colors.primary} name='refresh' size={18} />
          )}
          <AppText
            className='text-primary dark:text-dark-primary'
            variant='bodyMedium'
          >
            Frissítés
          </AppText>
        </Pressable>
      ) : null}
    </AppCard>
  );
}

export function CitiesScreen() {
  const { colorScheme } = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const {
    addCity,
    isSaved,
    refreshCity,
    removeCity,
    savedCities,
    weatherByCityId,
  } = useWeather();
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [isSearching, setIsSearching] = useState(false);
  const [notice, setNotice] = useState<NoticeState | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<WeatherLocation[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const searchController = useRef<AbortController | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    searchController.current?.abort();
    const searchTerm = searchValue.trim();

    if (searchTerm.length < 2) {
      setIsSearching(false);
      setSearchError(null);
      setSearchResults([]);
      return;
    }

    const controller = new AbortController();
    searchController.current = controller;
    setIsSearching(true);
    const timer = setTimeout(async () => {
      setSearchError(null);

      try {
        const results = await searchWeatherLocations(
          searchTerm,
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setSearchResults(results);
        }
      } catch (error: unknown) {
        if (!controller.signal.aborted) {
          setSearchError('Nem sikerült városokat keresni. Próbáld újra.');
          setSearchResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchValue]);

  function handleAddCity(location: WeatherLocation) {
    if (savedCities.length >= MAX_SAVED_CITIES) {
      setNotice({
        description:
          'Már elérted a három mentett városból álló limitet. Törölj egy várost, hogy másikat adhass hozzá.',
        title: 'Elérted a városlimitet',
        variant: 'warning',
      });
      return;
    }

    if (isSaved(location.id)) {
      setNotice({
        description: 'Ez a város már szerepel a mentett városaid között.',
        title: 'Már hozzáadtad',
        variant: 'info',
      });
      return;
    }

    addCity(location);
    setSearchValue('');
    setSearchResults([]);
  }

  function handleDeleteCity(city: WeatherLocation) {
    if (savedCities.length === 1) {
      setNotice({
        description: 'Legalább egy várost meg kell tartanod a kezdőképernyőhöz.',
        title: 'Az utolsó város nem törölhető',
        variant: 'warning',
      });
      return;
    }

    removeCity(city.id);
  }

  return (
    <AppScreen>
      <View className='gap-3'>
        <AppText
          className='text-primary dark:text-dark-primary'
          variant='caption'
        >
          HELYSZÍNEK
        </AppText>
        <AppText
          className='text-secondary dark:text-dark-secondary'
          variant='hero'
        >
          Mentett városok
        </AppText>
        <AppText className='text-muted dark:text-dark-muted'>
          Keress és ments el legfeljebb három várost, GPS használata nélkül.
        </AppText>
      </View>

      <View className='gap-5'>
        <View className='min-h-12 flex-row items-center gap-3 rounded-control border border-border bg-surface px-4 dark:border-dark-border dark:bg-dark-surface'>
          <Ionicons color={colors.muted} name='search' size={20} />
          <TextInput
            accessibilityLabel='Város keresése'
            autoCapitalize='words'
            className='flex-1 text-secondary dark:text-dark-secondary'
            keyboardAppearance={colorScheme === 'dark' ? 'dark' : 'light'}
            onChangeText={setSearchValue}
            placeholder='Keress várost...'
            placeholderTextColor={colors.muted}
            returnKeyType='search'
            style={{ fontFamily: theme.fonts.regular, fontSize: 15 }}
            value={searchValue}
          />
          {isSearching ? (
            <ActivityIndicator color={colors.primary} size='small' />
          ) : searchValue.length > 0 ? (
            <Pressable
              accessibilityLabel='Keresés törlése'
              hitSlop={8}
              onPress={() => setSearchValue('')}
            >
              <Ionicons color={colors.muted} name='close-circle' size={21} />
            </Pressable>
          ) : null}
        </View>

        {searchError ? (
          <AppText className='text-danger dark:text-dark-danger'>
            {searchError}
          </AppText>
        ) : null}

        {searchValue.trim().length >= 2 && !isSearching ? (
          <AppCard className='gap-2 p-2'>
            {searchResults.length > 0 ? (
              searchResults.map((location) => {
                const saved = isSaved(location.id);
                return (
                  <Pressable
                    accessibilityLabel={`${location.name} hozzáadása`}
                    accessibilityRole='button'
                    className='min-h-14 flex-row items-center gap-3 rounded-control px-3 py-2 active:bg-primary-soft dark:active:bg-dark-primary-soft'
                    key={location.id}
                    onPress={() => handleAddCity(location)}
                  >
                    <Ionicons color={colors.primary} name='location' size={21} />
                    <View className='flex-1'>
                      <AppText
                        className='text-secondary dark:text-dark-secondary'
                        variant='bodyMedium'
                      >
                        {location.name}
                      </AppText>
                      <AppText
                        className='text-muted dark:text-dark-muted'
                        style={{ fontSize: 13 }}
                      >
                        {location.country}
                      </AppText>
                    </View>
                    <Ionicons
                      color={saved ? colors.muted : colors.primary}
                      name={saved ? 'checkmark-circle' : 'add-circle'}
                      size={24}
                    />
                  </Pressable>
                );
              })
            ) : (
              <AppText className='p-3 text-center text-muted dark:text-dark-muted'>
                Nincs találat erre a keresésre.
              </AppText>
            )}
          </AppCard>
        ) : null}

        <View className='flex-row items-center justify-between'>
          <AppText
            className='text-secondary dark:text-dark-secondary'
            variant='bodyMedium'
          >
            Hozzáadott városok
          </AppText>
          <AppText
            className='text-muted dark:text-dark-muted'
            style={{ fontSize: 13 }}
          >
            {savedCities.length}/{MAX_SAVED_CITIES}
          </AppText>
        </View>

        <View className='gap-4'>
          {savedCities.map((city) => (
            <CityCard
              city={city}
              currentTime={currentTime}
              isOnlyCity={savedCities.length === 1}
              key={city.id}
              onDelete={handleDeleteCity}
              onRefresh={(location) => void refreshCity(location)}
              weather={weatherByCityId[city.id]}
            />
          ))}
        </View>

        <Pressable
          accessibilityRole='link'
          onPress={() => void Linking.openURL('https://open-meteo.com/')}
        >
          <AppText
            className='text-center text-muted underline dark:text-dark-muted'
            style={{ fontSize: 12 }}
          >
            Hely- és időjárási adatok: Open-Meteo
          </AppText>
        </Pressable>
      </View>

      <AppNoticeModal
        description={notice?.description ?? ''}
        onClose={() => setNotice(null)}
        title={notice?.title ?? ''}
        variant={notice?.variant}
        visible={notice !== null}
      />
    </AppScreen>
  );
}
