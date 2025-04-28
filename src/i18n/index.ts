import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const resources = {
  en: {
    translation: {
      // SPLASH SCREEN
      select_language: 'Select Language',
      english: 'English',
      arabic: 'Arabic',
      continue: 'Continue',
    },
  },
  ar: {
    translation: {
      // SPLASH SCREEN
      select_language: 'اختار اللغة',
      english: 'إنجليزي',
      arabic: 'عربي',
      continue: 'يكمل',
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: I18nManager.isRTL ? 'ar' : 'en',

  interpolation: {
    escapeValue: true,
  },
});

const changeLan = async () => {
  const language = await AsyncStorage.getItem('lan');
  if (language != null) {
    i18n.changeLanguage('ar').then(() => {
      console.log('confiiiil;aggg', i18n);
    });
  }
};

changeLan();
