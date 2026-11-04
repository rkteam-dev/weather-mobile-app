export type WeatherVisual = 'clear-day' | 'clear-night' | 'cloudy' | 'rain';

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
