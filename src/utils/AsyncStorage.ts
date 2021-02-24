import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string | unknown) => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    //
  }
};

export const getData = async (key: string) => {
  try {
    const response = await AsyncStorage.getItem(key);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response ? JSON.parse(response) : null;
  } catch (e) {
    return null;
  }
};

export const clearData = async () => {
  await AsyncStorage.removeItem(AsyncStorageKeys.WELCOME);
  await AsyncStorage.removeItem(AsyncStorageKeys.VEHICLE_LIST);
};

export const AsyncStorageKeys = {
  WELCOME: '@welcome',
  VEHICLE_LIST: '@vehicle-list',
};
