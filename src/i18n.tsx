import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locale/fr.json';
import en from './locale/en.json';
import es from './locale/es.json';
import bzh from './locale/bzh.json';

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        fr: { translation: fr },
        en: { translation: en },
        es: { translation: es },
        bzh: { translation: bzh },
      },
      supportedLngs: ['fr', 'en', 'es','bzh'],
      fallbackLng: 'en',
      load: 'languageOnly',
      debug: import.meta.env.MODE === 'development',
      interpolation: { escapeValue: false },
      detection: {
        order: ['path', 'localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupFromPathIndex: 0, 
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
