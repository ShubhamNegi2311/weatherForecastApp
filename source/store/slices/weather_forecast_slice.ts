import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Forecastday} from 'data_models/api_data_models';

export type WeatherForecastState = {
  forecastDataList: Forecastday[];
};

const initialState: WeatherForecastState = {
  forecastDataList: [],
};

export const weatherForecastSlice = createSlice({
  name: 'weather_forecast_slice',
  initialState,
  reducers: {
    updateWeatherForecastList: (
      state,
      action: PayloadAction<Forecastday[]>,
    ) => {
      state.forecastDataList = action.payload;
    },
  },
});

export const {updateWeatherForecastList} = weatherForecastSlice.actions;

export default weatherForecastSlice.reducer;
