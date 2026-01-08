import EncryptedStorage from "react-native-encrypted-storage";

const TOKEN_KEY = "auth_token";

export const tokenStorage = {
  get: async (): Promise<string | null> => {
    return EncryptedStorage.getItem(TOKEN_KEY);
  },
  set: async (token: string): Promise<void> => {
    await EncryptedStorage.setItem(TOKEN_KEY, token);
  },
  clear: async (): Promise<void> => {
    await EncryptedStorage.removeItem(TOKEN_KEY);
  },
};
