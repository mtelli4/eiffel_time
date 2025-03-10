import React, {createContext, useEffect, useState} from 'react';
import { storage } from '../storage/storage';

// Crée le contexte
export const UserContext = createContext();

// Fournisseur du contexte
export const UserProvider = ({children}) => {
  // const [user, setUser] = useState({}); // Rôle par défaut
  const user = JSON.parse(storage.getString('user') || '{statut: "student"}');

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

