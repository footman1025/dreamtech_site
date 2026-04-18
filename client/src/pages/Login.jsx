import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './Auth.css';

export default function Login() {
  const { t } = useLang();
  const a = t.auth;
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{a.welcomeBack}</h1>
          <p>{a.signInSub}</p>
        </div>
        <form className="auth-form" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">{a.email}</label>
            <input id="email" name="email" type="email" required placeholder={a.emailPlaceholder} />
          </div>
          <div className="form-group">
            <label htmlFor="password">{a.password}</label>
            <input id="password" name="password" type="password" required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary auth-btn">{a.signIn}</button>
        </form>
        <p className="auth-switch">{a.noAccount} <Link to="/signup">{a.signUp}</Link></p>
      </div>
    </main>
  );
}
