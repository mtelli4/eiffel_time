import React, {createContext, useEffect, useState} from 'react';
// import { storage } from '../storage/storage';
import MMKVStorage from "react-native-mmkv-storage";

// Crée le contexte
export const UserContext = createContext();

const storage = new MMKVStorage.Loader()
  .withInstanceID("userStorage")
  .initialize();
  
// Fournisseur du contexte
export const UserProvider = ({children}) => {
  // const [user, setUser] = useState({}); // Rôle par défaut
  const user = JSON.parse(storage.getString('user') || '{}');

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
