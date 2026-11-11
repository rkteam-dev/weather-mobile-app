export type WeatherVisual =
  | 'clear-day'
  | 'clear-night'
  | 'cloudy'
  | 'fog'
  | 'rain'
  | 'snow'
  | 'storm';

export type WeatherLocation = {
  country: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  timezone: string;
};

export type DailyForecast = {
  condition: WeatherVisual;
  conditionLabel: string;
  date: string;
  maximumTemperatureCelsius: number;
  minimumTemperatureCelsius: number;
  precipitationMm: number;
};

export type CurrentWeather = {
  apparentTemperatureCelsius: number;
  condition: WeatherVisual;
  conditionLabel: string;
  dailyForecast: DailyForecast[];
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
