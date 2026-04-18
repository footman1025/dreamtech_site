import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './Auth.css';

export default function Signup() {
  const { t } = useLang();
  const a = t.auth;
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{a.createAccount}</h1>
          <p>{a.joinSub}</p>
        </div>
        <form className="auth-form" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">{a.fullName}</label>
            <input id="name" name="name" type="text" required placeholder={a.namePlaceholder} />
          </div>
          <div className="form-group">
            <label htmlFor="email">{a.email}</label>
            <input id="email" name="email" type="email" required placeholder={a.emailPlaceholder} />
          </div>
          <div className="form-group">
            <label htmlFor="password">{a.password}</label>
            <input id="password" name="password" type="password" required placeholder="Min. 6 characters" />
          </div>
          <button type="submit" className="btn btn-primary auth-btn">{a.create}</button>
        </form>
        <p className="auth-switch">{a.hasAccount} <Link to="/login">{a.signInLink}</Link></p>
      </div>
    </main>
  );
}
