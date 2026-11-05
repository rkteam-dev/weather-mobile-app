export type WeatherVisual = 'clear-day' | 'clear-night' | 'cloudy' | 'rain';

export type WeatherLocation = {
  country: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  timezone: string;
};

export type CurrentWeather = {
  apparentTemperatureCelsius: number;
  condition: WeatherVisual;
  conditionLabel: string;
  humidityPercent: number;
  isDay: boolean;
  observedAt: string;
  precipitationMm: number;
  temperatureCelsius: number;
  windSpeedKmh: number;
};

export type CityWeatherState = {
  data: CurrentWeather | null;
  error: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  lastUpdatedAt: Date | null;
};

export type SavedCityWeather = {
  condition: WeatherVisual;
  conditionLabel: string;
  country: string;
  id: string;
  isDay: boolean;
  name: string;
  precipitationMm: number;
  temperatureCelsius: number;
  timezone: string;
};
