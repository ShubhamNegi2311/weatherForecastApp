import moment from 'moment';
import {Alert} from 'react-native';

export function formatDateForDetailsScreen(date: string) {
  const newDate = new Date(date);
  return moment(newDate).format('DD-MM');
}

export function formatIimageURL(url: string) {
  let newURL = '';
  if (url.includes('//')) {
    newURL = 'https://' + url.split('//')[1];
  }

  return newURL;
}

export const showAlert = (message: string, header?: string) => {
  Alert.alert(header ?? 'WeatherApp', message, [{text: 'OK'}]);
};
