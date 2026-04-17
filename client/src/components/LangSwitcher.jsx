import { useRef, useState, useEffect } from 'react';
import { useLang, LANGUAGES } from '../context/LangContext';
import './LangSwitcher.css';

export default function LangSwitcher() {
  const { lang, changeLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-btn"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span className="lang-flag">{current.flag}</span>
        <span className="lang-code">{current.code.toUpperCase()}</span>
        <span className="lang-chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className="lang-dropdown" role="listbox">
          {LANGUAGES.map(l => (
            <li
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              className={`lang-option ${l.code === lang ? 'active' : ''}`}
              onClick={() => { changeLang(l.code); setOpen(false); }}
            >
              <span className="lang-flag">{l.flag}</span>
              <span className="lang-label">{l.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
