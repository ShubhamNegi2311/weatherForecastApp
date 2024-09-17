import {API_KEY} from 'utils/constants';
import {axiosInstance} from './api_helper';
import {CURRENT_WEATHER, IP_LOOKUP, SEARCH, WEATHER_FORECAST} from './api_url';

export const getDeviceIP = async (ipAddress: string) => {
  const response = await axiosInstance.get(IP_LOOKUP, {
    params: {
      q: ipAddress,
      key: API_KEY,
    },
  });

  return response.data;
};

export const currentWeather = async (cityName: string) => {
  const response = await axiosInstance.get(CURRENT_WEATHER, {
    params: {
      q: cityName,
      key: API_KEY,
    },
  });

  return response.data;
};

export const searchCity = async (searchText: string) => {
  const response = await axiosInstance.get(SEARCH, {
    params: {
      q: searchText,
      key: API_KEY,
    },
  });

  return response.data;
};

export const searchCityLatLng = async (lat: number, lng: number) => {
  const response = await axiosInstance.get(SEARCH, {
    params: {
      q: `${lat},${lng}`,
      key: API_KEY,
    },
  });

  return response.data;
};

// export const futureWeather = async () => {
//   const response = await axiosInstance.get(FUTURE_WEATHER, {
//     params: {
//       key: API_KEY,
//     },
//   });

//   return response.data;
// };

export const weatherForecast = async (cityName: string) => {
  const response = await axiosInstance.get(WEATHER_FORECAST, {
    params: {
      q: cityName,
      days: 5,
      key: API_KEY,
    },
  });

  return response.data;
};
