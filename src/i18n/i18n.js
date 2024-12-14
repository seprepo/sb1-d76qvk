   // src/i18n.js
   import i18n from 'i18next';
   import { initReactI18next } from 'react-i18next';

   // Importation des fichiers de traduction
   import translationEN from '../locales/en/translation.json';
   import translationFR from '../locales/fr/translation.json';

   i18n
     .use(initReactI18next)
     .init({
       resources: {
       
         fr: {
           translation: translationFR,
         },
         en: {
            translation: translationEN,
          },
       },
       lng: 'fr', // Langue par défaut
       fallbackLng: 'fr',
       interpolation: {
         escapeValue: false, // React échappe déjà par défaut
       },
     });

   export default i18n;