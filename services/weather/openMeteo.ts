import type {
  CurrentWeather,
  DailyForecast,
  WeatherLocation,
  WeatherVisual,
} from '../../types/weather/weather';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const CURRENT_FIELDS = [
  'temperature_2m',
  'apparent_temperature',
  'relative_humidity_2m',
  'precipitation',
  'weather_code',
  'is_day',
  'wind_speed_10m',
].join(',');
const DAILY_FIELDS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
].join(',');

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function readNumber(record: UnknownRecord, key: string) {
  const value = record[key];

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`Missing or invalid weather field: ${key}`);
  }

  return value;
}

function readArray(record: UnknownRecord, key: string) {
  const value = record[key];

  if (!Array.isArray(value)) {
    throw new Error(`Missing or invalid weather field: ${key}`);
  }

  return value;
}

function getCondition(
  weatherCode: number,
  isDay: boolean,
): { label: string; visual: WeatherVisual } {
  if (weatherCode === 0) {
    return {
      label: isDay ? 'Tiszta, napos idő' : 'Tiszta éjszaka',
      visual: isDay ? 'clear-day' : 'clear-night',
    };
  }

  if (weatherCode === 1) {
    return {
      label: 'Többnyire derült',
      visual: isDay ? 'clear-day' : 'clear-night',
    };
  }

  if ([2, 3].includes(weatherCode)) {
    return { label: 'Felhős', visual: 'cloudy' };
  }

  if ([45, 48].includes(weatherCode)) {
    return { label: 'Ködös', visual: 'fog' };
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return { label: 'Szitálás', visual: 'rain' };
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return { label: 'Havazás', visual: 'snow' };
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return { label: 'Zivatar', visual: 'storm' };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return { label: 'Esős', visual: 'rain' };
  }

  return { label: 'Változó idő', visual: 'cloudy' };
}

function mapDailyForecast(value: UnknownRecord): DailyForecast[] {
  const dates = readArray(value, 'time');
  const weatherCodes = readArray(value, 'weather_code');
  const maximumTemperatures = readArray(value, 'temperature_2m_max');
  const minimumTemperatures = readArray(value, 'temperature_2m_min');
  const precipitation = readArray(value, 'precipitation_sum');

  return dates.map((date, index) => {
    const weatherCode = weatherCodes[index];
    const maximumTemperature = maximumTemperatures[index];
    const minimumTemperature = minimumTemperatures[index];
    const precipitationMm = precipitation[index];

    if (
      typeof date !== 'string' ||
      typeof weatherCode !== 'number' ||
      typeof maximumTemperature !== 'number' ||
      typeof minimumTemperature !== 'number' ||
      typeof precipitationMm !== 'number' ||
      !Number.isFinite(weatherCode) ||
      !Number.isFinite(maximumTemperature) ||
      !Number.isFinite(minimumTemperature) ||
      !Number.isFinite(precipitationMm)
    ) {
      throw new Error('The weather service returned invalid daily data.');
    }

    const condition = getCondition(weatherCode, true);

    return {
      condition: condition.visual,
      conditionLabel: condition.label,
      date,
      maximumTemperatureCelsius: maximumTemperature,
      minimumTemperatureCelsius: minimumTemperature,
      precipitationMm,
    };
  });
}

function mapCurrentWeather(value: unknown): CurrentWeather {
  if (
    !isRecord(value) ||
    !isRecord(value.current) ||
    !isRecord(value.daily)
  ) {
    throw new Error('The weather service returned an invalid response.');
  }

  const current = value.current;
  const observedAt = current.time;

  if (typeof observedAt !== 'string' || observedAt.length === 0) {
    throw new Error('Missing or invalid weather field: time');
  }

  const isDay = readNumber(current, 'is_day') === 1;
  const condition = getCondition(readNumber(current, 'weather_code'), isDay);

  return {
    apparentTemperatureCelsius: readNumber(
      current,
      'apparent_temperature',
    ),
    condition: condition.visual,
    conditionLabel: condition.label,
    dailyForecast: mapDailyForecast(value.daily),
    humidityPercent: readNumber(current, 'relative_humidity_2m'),
    isDay,
    observedAt,
    precipitationMm: readNumber(current, 'precipitation'),
    temperatureCelsius: readNumber(current, 'temperature_2m'),
    windSpeedKmh: readNumber(current, 'wind_speed_10m'),
  };
}

export async function fetchCurrentWeather(
  location: WeatherLocation,
  signal?: AbortSignal,
) {
  const query = new URLSearchParams({
    current: CURRENT_FIELDS,
    daily: DAILY_FIELDS,
    forecast_days: '7',
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    timezone: location.timezone,
  });
  const response = await fetch(`${FORECAST_URL}?${query}`, { signal });

  if (!response.ok) {
    throw new Error(`Weather request failed with status ${response.status}.`);
  }

  return mapCurrentWeather(await response.json());
}

export async function searchWeatherLocations(
  searchTerm: string,
  signal?: AbortSignal,
) {
  const query = new URLSearchParams({
    count: '6',
    language: 'hu',
    name: searchTerm.trim(),
  });
  const response = await fetch(`${GEOCODING_URL}?${query}`, { signal });

  if (!response.ok) {
    throw new Error(`Location request failed with status ${response.status}.`);
  }

  const value: unknown = await response.json();

  if (!isRecord(value)) {
    throw new Error('The location service returned an invalid response.');
  }

  if (value.results === undefined) {
    return [];
  }

  if (!Array.isArray(value.results)) {
    throw new Error('The location service returned invalid results.');
  }

  return value.results.flatMap((result): WeatherLocation[] => {
    if (!isRecord(result)) {
      return [];
    }

    const { country, id, latitude, longitude, name, timezone } = result;

    if (
      typeof id !== 'number' ||
      typeof name !== 'string' ||
      typeof country !== 'string' ||
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      typeof timezone !== 'string'
    ) {
      return [];
    }

    return [
      {
        country,
        id: String(id),
        latitude,
        longitude,
        name,
        timezone,
      },
    ];
  });
}
