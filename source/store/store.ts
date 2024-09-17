import {configureStore} from '@reduxjs/toolkit';
import currentWeatherSlice from 'store/slices/current_weather_slice';
import userSearchHistorySlice from 'store/slices/user_search_slice';
import weatherForecastReducer from 'store/slices/weather_forecast_slice';

export const store = configureStore({
  reducer: {
    weather_forecast_slice: weatherForecastReducer,
    current_weather_slice: currentWeatherSlice,
    user_search_history_slice: userSearchHistorySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
