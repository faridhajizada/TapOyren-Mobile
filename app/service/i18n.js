
import i18n from 'i18next';
import az from '../assets/locales/az/translation.json'
import en from '../assets/locales/en/translation.json'
import ru from '../assets/locales/ru/translation.json'

i18n.init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      'en': {
        translation: en
      },
      'az': {
        translation: az
      },
      'ru': {
        translation: ru
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
