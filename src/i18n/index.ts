import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fa from './locales/fa.json'
import en from './locales/en.json'

export const RTL_LANGUAGES = ['fa', 'ar', 'he', 'ur']

i18n.use(initReactI18next).init({
  resources: {
    fa: { translation: fa },
    en: { translation: en },
  },
  lng: 'fa',
  fallbackLng: 'fa',
  interpolation: {
    escapeValue: false,
  },
})

export function applyDocumentDirection(language: string) {
  const dir = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr'
  document.documentElement.dir = dir
  document.documentElement.lang = language
}

i18n.on('languageChanged', applyDocumentDirection)

export default i18n
