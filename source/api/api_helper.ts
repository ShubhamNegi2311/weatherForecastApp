import axios, {CreateAxiosDefaults} from 'axios';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: 'https://api.weatherapi.com/v1/',
  timeout: 60000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const axiosInstance = axios.create(axiosConfig);
