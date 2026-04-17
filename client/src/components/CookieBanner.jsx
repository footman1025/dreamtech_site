import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import './CookieBanner.css';

export default function CookieBanner() {
  const { t } = useLang();
  const c = t.cookie;
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    if (!localStorage.getItem('dt_cookie_consent')) {
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const save = (type) => {
    localStorage.setItem('dt_cookie_consent', type);
    setVisible(false);
    setShowSettings(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      {showSettings ? (
        <div className="cookie-settings">
          <div className="cookie-settings-content">
            <h3>{c.settingsTitle}</h3>
            <p>{c.settingsSub}</p>
            <div className="cookie-option">
              <div>
                <strong>{c.necessary}</strong>
                <p>{c.necessaryDesc}</p>
              </div>
              <span className="cookie-toggle-on">{c.alwaysOn}</span>
            </div>
            <div className="cookie-option">
              <div>
                <strong>{c.analytics}</strong>
                <p>{c.analyticsDesc}</p>
              </div>
              <label className="cookie-switch">
                <input type="checkbox" checked={prefs.analytics}
                  onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))} />
                <span className="cookie-slider" />
              </label>
            </div>
            <div className="cookie-option">
              <div>
                <strong>{c.marketing}</strong>
                <p>{c.marketingDesc}</p>
              </div>
              <label className="cookie-switch">
                <input type="checkbox" checked={prefs.marketing}
                  onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))} />
                <span className="cookie-slider" />
              </label>
            </div>
            <div className="cookie-settings-actions">
              <button className="cookie-btn cookie-btn-outline" onClick={() => setShowSettings(false)}>{c.back}</button>
              <button className="cookie-btn cookie-btn-primary" onClick={() => save('custom')}>{c.savePrefs}</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cookie-bar">
          <p className="cookie-text">
            {c.text.split('Privacy Policy').map((part, i, arr) =>
              i < arr.length - 1
                ? <span key={i}>{part}<a href="#">Privacy Policy</a></span>
                : <span key={i}>{part}</span>
            )}
          </p>
          <div className="cookie-actions">
            <button className="cookie-btn cookie-btn-ghost" onClick={() => save('mandatory')}>{c.mandatory}</button>
            <button className="cookie-btn cookie-btn-outline" onClick={() => setShowSettings(true)}>{c.settings}</button>
            <button className="cookie-btn cookie-btn-primary" onClick={() => save('all')}>{c.allowAll}</button>
          </div>
        </div>
      )}
    </div>
  );
}
