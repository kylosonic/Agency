import { useContext } from 'react';
import { LanguageContext } from './languageContextStore';

export function useLanguage() {
  return useContext(LanguageContext);
}
