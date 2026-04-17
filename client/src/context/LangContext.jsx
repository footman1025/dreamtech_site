import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LangContext = createContext();

export const LANGUAGES = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'pt', label: 'Português',  flag: '🇵🇹' },
  { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
];

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('dt_lang') || 'en');
  const t = translations[lang] || translations.en;
  const changeLang = (code) => { setLang(code); localStorage.setItem('dt_lang', code); };
  return (
    <LangContext.Provider value={{ lang, t, changeLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
