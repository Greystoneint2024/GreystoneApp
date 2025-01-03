import i18n from 'i18next';
import en from './locales/en/translation.json';
import sp from './locales/sp/translation.json';
import ar from './locales/ar/translation.json';
import ru from './locales/ru/translation.json';
import fr from './locales/fr/translation.json';
import de from './locales/de/translation.json';
import nl from './locales/nl/translation.json';
import { initReactI18next } from 'react-i18next';

const locales = {
    en: { translation: en },
    Spanish: { translation: sp },
    Arabic: { translation: ar },
    Russian: { translation: ru },
    French: { translation: fr },
    German: { translation: de },
    Dutch: { translation: nl },
};

export const setLocale = (locale: string) => {
    if (locale) {
        i18n.changeLanguage(locale);
    }
};

export const getCurrentLocale = () => i18n.language;

i18n
    .use(initReactI18next)
    //@ts-ignore
    .init({
        lng: 'en',
        fallbackLng: 'en',
        compatibilityJSON: 'v3',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: locales,
        keySeparator: false,
        pluralSeparator: false,
    });

export default i18n;

