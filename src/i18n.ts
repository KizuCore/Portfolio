import i18n, { type BackendModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr.json';
import en from './locales/en.json';
// Le breton reste disponible sans alourdir les visites en français et en anglais.
const bretonBackend: BackendModule = {
  type: 'backend',
  init() { /* Les imports locaux ne nécessitent aucune configuration réseau. */ },
  read(language, _namespace, callback) {
    if (language !== 'bzh') {
      callback(new Error(`Langue non prise en charge : ${language}`), false);
      return;
    }
    void import('./locales/bzh.json').then(
      ({ default: translations }) => callback(null, translations),
      (error: unknown) => callback(error instanceof Error ? error : new Error(String(error)), false),
    );
  },
};

export const i18nReady = i18n.isInitialized ? Promise.resolve() : i18n
    .use(LanguageDetector)
    .use(bretonBackend)
    .use(initReactI18next)
    .init({
      resources: {
        fr: { translation: fr },
        en: { translation: en },
      },
      partialBundledLanguages: true,
      supportedLngs: ['fr', 'en', 'bzh'],
      fallbackLng: 'en',
      load: 'languageOnly',
      debug: import.meta.env.MODE === 'development',
      interpolation: { escapeValue: false },
      detection: {
        // Privilégie le préfixe de l’URL, puis le choix enregistré, puis la langue du navigateur.
        order: ['path', 'localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupFromPathIndex: 0, 
      },
      react: {
        useSuspense: false,
      },
    });

export default i18n;
