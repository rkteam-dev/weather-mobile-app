import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { AppCard } from '../../components/global/AppCard/AppCard';
import { AppNoticeModal } from '../../components/global/AppNoticeModal/AppNoticeModal';
import { AppScreen } from '../../components/global/AppScreen/AppScreen';
import { AppText } from '../../components/global/AppText/AppText';
import { getThemeColors, theme } from '../../constants/theme';
import type {
  SavedCityWeather,
  WeatherVisual,
} from '../../types/weather/weather';

const MAX_SAVED_CITIES = 3;

const initialCities: SavedCityWeather[] = [
  {
    condition: 'clear-day',
    conditionLabel: 'Napos',
    country: 'Magyarország',
    id: 'miskolc',
    isDay: true,
    name: 'Miskolc',
    precipitationMm: 0,
    temperatureCelsius: 17,
    timezone: 'Europe/Budapest',
  },
  {
    condition: 'cloudy',
    conditionLabel: 'Felhős',
    country: 'Magyarország',
    id: 'budapest',
    isDay: true,
    name: 'Budapest',
    precipitationMm: 0.2,
    temperatureCelsius: 14,
    timezone: 'Europe/Budapest',
  },
  {
    condition: 'rain',
    conditionLabel: 'Esős',
    country: 'Magyarország',
    id: 'szeged',
    isDay: false,
    name: 'Szeged',
    precipitationMm: 2.4,
    temperatureCelsius: 11,
    timezone: 'Europe/Budapest',
  },
];

const iconByCondition: Record<WeatherVisual, keyof typeof Ionicons.glyphMap> = {
  'clear-day': 'sunny',
  'clear-night': 'moon',
  cloudy: 'cloud',
  rain: 'rainy',
};

type NoticeState = {
  description: string;
  title: string;
  variant: 'info' | 'warning';
};

type CityCardProps = {
  city: SavedCityWeather;
  currentTime: Date;
  onDelete: (cityId: string) => void;
};

function formatCityTime(date: Date, timezone: string) {
  return new Intl.DateTimeFormat('hu-HU', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  }).format(date);
}

function CityCard({ city, currentTime, onDelete }: CityCardProps) {
  const { colorScheme } = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const conditionColor =
    city.condition === 'clear-day' ? colors.sun : colors.primary;

  return (
    <AppCard className='gap-5'>
      <View className='flex-row items-start gap-4'>
        <View className='h-14 w-14 items-center justify-center rounded-control bg-primary-soft dark:bg-dark-primary-soft'>
          <Ionicons
            color={conditionColor}
            name={iconByCondition[city.condition]}
            size={29}
          />
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
          onPress={() => onDelete(city.id)}
        >
          <Ionicons color={colors.danger} name='trash-outline' size={20} />
        </Pressable>
      </View>

      <View className='flex-row items-end justify-between gap-4'>
        <View className='gap-1'>
          <AppText
            className='text-secondary dark:text-dark-secondary'
            style={{ fontSize: 38, lineHeight: 44 }}
            variant='hero'
          >
            {city.temperatureCelsius}°
          </AppText>
          <AppText className='text-muted dark:text-dark-muted'>
            {city.conditionLabel}
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
              {city.precipitationMm} mm
            </AppText>
          </View>
          <View className='flex-row items-center gap-2'>
            <Ionicons
              color={city.isDay ? colors.sun : colors.primary}
              name={city.isDay ? 'sunny-outline' : 'moon-outline'}
              size={17}
            />
            <AppText
              className='text-secondary dark:text-dark-secondary'
              style={{ fontSize: 14 }}
              variant='bodyMedium'
            >
              {city.isDay ? 'Nappal' : 'Éjszaka'}
            </AppText>
          </View>
        </View>
      </View>
    </AppCard>
  );
}

export function CitiesScreen() {
  const { colorScheme } = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [cities, setCities] = useState(initialCities);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [notice, setNotice] = useState<NoticeState | null>(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30_000);

    return () => clearInterval(timer);
  }, []);

  function handleAddCity() {
    if (cities.length >= MAX_SAVED_CITIES) {
      setNotice({
        description:
          'Már elérted a három mentett városból álló limitet. Törölj egy várost, hogy másikat adhass hozzá.',
        title: 'Elérted a városlimitet',
        variant: 'warning',
      });
      return;
    }

    setNotice({
      description:
        'A városkeresés az Open-Meteo API bekötése után lesz használható.',
      title: 'Hamarosan elérhető',
      variant: 'info',
    });
  }

  function handleDeleteCity(cityId: string) {
    setCities((currentCities) =>
      currentCities.filter((city) => city.id !== cityId),
    );
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
          Legfeljebb három kedvenc várost tarthatsz kéznél, GPS használata nélkül.
        </AppText>
      </View>

      <View className='gap-5'>
        <View className='flex-row gap-3'>
          <View className='min-h-12 flex-1 flex-row items-center gap-3 rounded-control border border-border bg-surface px-4 dark:border-dark-border dark:bg-dark-surface'>
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
          </View>

          <Pressable
            accessibilityLabel='Város hozzáadása'
            accessibilityRole='button'
            className='h-12 w-12 items-center justify-center rounded-control bg-primary dark:bg-dark-primary-dark'
            onPress={handleAddCity}
          >
            <Ionicons color='#FFFFFF' name='add' size={25} />
          </Pressable>
        </View>

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
            {cities.length}/{MAX_SAVED_CITIES}
          </AppText>
        </View>

        <View className='gap-4'>
          {cities.map((city) => (
            <CityCard
              city={city}
              currentTime={currentTime}
              key={city.id}
              onDelete={handleDeleteCity}
            />
          ))}

          {cities.length === 0 ? (
            <AppCard className='items-center gap-3 py-10'>
              <Ionicons color={colors.muted} name='location-outline' size={30} />
              <AppText
                className='text-secondary dark:text-dark-secondary'
                variant='bodyMedium'
              >
                Még nincs mentett városod
              </AppText>
              <AppText className='text-center text-muted dark:text-dark-muted'>
                Később a fenti keresőből adhatsz hozzá új helyszínt.
              </AppText>
            </AppCard>
          ) : null}
        </View>
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
