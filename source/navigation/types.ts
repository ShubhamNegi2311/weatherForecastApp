import {SearchCityData} from 'data_models/api_data_models';

export type MainStackParamList = {
  HomeScreen: undefined;
  CitySearchScreen: undefined;
  WeatherDetailsScreen: {cityData: SearchCityData};
};
