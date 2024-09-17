// Async Storage Utils for maintaining any operation and functions related to it.

import AsyncStorage from '@react-native-async-storage/async-storage';

export const SaveDataToAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // error in saving data to async storage.
  }
};

export const DeleteDataFromAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // error in deleting data from async storage.
  }
};

export const ReadDataFromAsyncStorage = async (key: string) => {
  let value: string | null = '';
  try {
    value = await AsyncStorage.getItem(key);
  } catch (error) {
    // error in getting data from async storage.
  }
  return value;
};

// Removes whole AsyncStorage data.
export const ClearDataFromAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    // error in deleting data from async storage.
  }
};
