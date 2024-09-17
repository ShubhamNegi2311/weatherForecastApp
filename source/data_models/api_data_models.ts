export type CurrentWeatherResponseData = {
  location: CurrentWeatherLocation;
  current: CurrentWeather;
};

export type CurrentWeatherLocation = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

export type CurrentWeather = {
  temp_c: number;
  is_day: number;
  condition: CurrentWeatherCondition;
  wind_kph: number;
  precip_mm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  uv: number;
};

export type CurrentWeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

export type SearchCityResponse = SearchCityData[];

export type SearchCityData = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

export type ForecastResponse = {
  forecast: Forecast;
};

export type Forecast = {
  forecastday: Forecastday[];
};

export type Forecastday = {
  date: string;
  date_epoch: number;
  day: Day;
};

export interface Day {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  condition: Condition;
  uv: number;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}
