import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './languageContextStore';
import { SUPPORTED_LANGUAGES, translations } from './translations';

const LANGUAGE_STORAGE_KEY = 'novatech-language';

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (SUPPORTED_LANGUAGES.includes(saved)) {
    return saved;
  }

  const browserLang = (window.navigator.language || 'en').slice(0, 2).toLowerCase();
  return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : 'en';
}

function getNestedValue(target, path) {
  return path.split('.').reduce((acc, segment) => {
    if (!acc || typeof acc !== 'object') {
      return undefined;
    }
    return acc[segment];
  }, target);
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', language);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language]);

  const setLanguage = useCallback((nextLanguage) => {
    if (SUPPORTED_LANGUAGES.includes(nextLanguage)) {
      setLanguageState(nextLanguage);
    }
  }, []);

  const t = useCallback((key, fallback = '') => {
    const localized = getNestedValue(translations[language], key);
    if (typeof localized === 'string') {
      return localized;
    }

    const english = getNestedValue(translations.en, key);
    if (typeof english === 'string') {
      return english;
    }

    return fallback || key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    isRtl: false,
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
