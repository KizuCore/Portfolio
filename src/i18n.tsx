import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Initialisation d'i18next
i18n
  .use(Backend)

  .use(LanguageDetector) // Détection de la langue navigateur
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Langue par défaut si non détectée
    load: 'languageOnly', // Charger uniquement la langue sans le pays (ex: 'en' au lieu de 'en-US')
    debug: import.meta.env.MODE === 'development',

    backend: {
      loadPath: '/locale/{{lng}}.json',
    },

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
