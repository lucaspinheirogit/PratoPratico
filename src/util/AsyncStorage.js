import { AsyncStorage } from 'react-native';

export default {
  async setItem(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async getItem(key) {
    return AsyncStorage.getItem(key).then(result => JSON.parse(result));
  },
  async removeItem(key) {
    return AsyncStorage.removeItem(key);
  },
};
