import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

// Déclaration des options de langues
const languagesSelectOptions: { value: string; label: string }[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'Anglais' },
];

type Language = (typeof languagesSelectOptions)[number]['value'];

export const useLanguage = (initialLanguage?: Language) => {
  const [language, setLanguage] = useState<Language>();

  // Fonction pour récupérer la langue initiale en fonction de l'environnement
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Si on est en environnement Web, utiliser localStorage
      const savedLanguage = localStorage.getItem('language') as Language;
      setLanguage(initialLanguage || savedLanguage || 'fr');
    } else {
      import('react-native-mmkv').then(({ MMKV }) => {
        // Si on est en React Native, utiliser MMKV
        const storage = new MMKV();
        const savedLanguage = storage.getString('language') as Language | null;
        setLanguage(initialLanguage || savedLanguage || 'fr');
      });
    }
  }, []);

  // Effet pour appliquer les modifications de langue
  useEffect(() => {
    if (Platform.OS === 'web') {
      localStorage.setItem('language', language || localStorage.getItem('language') || 'fr');
    } else {
      import('react-native-mmkv').then(({ MMKV }) => {
        const storage = new MMKV();
        storage.set('language', language || storage.getString('language') || 'fr');
      });
    }
  }, [language]);

  return { language, setLanguage, languagesSelectOptions };
};
