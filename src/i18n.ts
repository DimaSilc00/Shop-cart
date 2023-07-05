import i18n from 'i18next';
import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';
import { initReactI18next } from 'react-i18next';


export const defaultNS = 'translation';


i18n.use(initReactI18next)
.init({
    debug: true, //!!!
    lng: 'en',
    fallbackLng: 'en',
    defaultNS,
    resources: {
      en: {
        translation : enTranslation,
      },
      ru: {
        translation: ruTranslation,
        
      },
    },
  });

  export default i18n;