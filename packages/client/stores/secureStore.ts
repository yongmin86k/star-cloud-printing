import * as SecureStoreService from "expo-secure-store"

export enum SECURE_STORE_KEYS {
  TOKEN = "token",
}

export default class SecureStore {
  private static saveValueFor = async (key: SECURE_STORE_KEYS, value: string) =>
    SecureStoreService.setItemAsync(key, value)

  private static deleteValueFor = async (key: SECURE_STORE_KEYS) =>
    SecureStoreService.deleteItemAsync(key)

  static getValueFor = async (key: SECURE_STORE_KEYS) =>
    SecureStoreService.getItemAsync(key)

  static updateValueFor = async (key: SECURE_STORE_KEYS, value?: string) =>
    value
      ? SecureStore.saveValueFor(key, value)
      : SecureStore.deleteValueFor(key)
}
