import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string | object) => {
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
    return response ? JSON.parse(response) : null;
  } catch (e) {
    return null;
  }
};

export const clearData = async () => {
  await AsyncStorage.removeItem(AsyncStorageKeys.WELCOME);
};

export const AsyncStorageKeys = {
  WELCOME: "@welcome",
};
