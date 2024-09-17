import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CurrentWeatherResponseData} from 'data_models/api_data_models';

export type CurrentWeatherState = {
  currentWeatherData: CurrentWeatherResponseData | undefined;
};

const initialState: CurrentWeatherState = {
  currentWeatherData: undefined,
};

export const currentWeatherSlice = createSlice({
  name: 'current_weather_slice',
  initialState,
  reducers: {
    updateCurrentWeatherData: (
      state,
      action: PayloadAction<CurrentWeatherResponseData | undefined>,
    ) => {
      state.currentWeatherData = action.payload;
    },
  },
});

export const {updateCurrentWeatherData} = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
