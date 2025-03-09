import MMKVStorage from "react-native-mmkv-storage";

export const storage = new MMKVStorage.Loader()
  .withInstanceID("userStorage")
  .initialize();