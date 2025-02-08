import React, {createContext, useEffect, useState} from 'react';

// Crée le contexte
export const UserContext = createContext();

// Fournisseur du contexte
export const UserProvider = ({children}) => {
  const [user, setUser] = useState({role: 'student'}); // Rôle par défaut

  // Exemple de récupération des données utilisateur (simulateur)
  useEffect(() => {
    const fetchUserRole = async () => {
      // Simule une requête réseau pour récupérer les informations utilisateur
      const simulatedUser = {
        id: 1,
        name: 'John Doe',
        role: 'admin', // Changez pour 'student', 'teacher', ou 'admin'
      };
      setUser(simulatedUser);
    };

    fetchUserRole();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
