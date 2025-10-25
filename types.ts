export type WeatherCondition = '晴' | '多云' | '阴' | '雨' | '雪' | '雷阵雨';

export interface CurrentWeatherData {
  city: string;
  temperature: number;
  condition: WeatherCondition;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecastData {
  day: string;
  date: string;
  condition: WeatherCondition;
  high: number;
  low: number;
}

export interface WeatherData {
  current: CurrentWeatherData;
  forecast: DailyForecastData[];
}