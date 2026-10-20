import { useState } from 'react';
import { login, register, setToken } from '../api';
export default function Auth({ onLoggedIn }) {
  const [mode, setMode] = useState('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setBusy(true); setError(''); setInfo('');
    try {
      const credentials = { email, password };
      if (mode === 'register') {
        await register(credentials);
        setInfo('Registration successful! Log in to access your tasks.');
        setMode('login');
        setPassword('');
      } else {
        const result = await login(credentials);
        setToken(result.token);
        onLoggedIn(result.user);
      }
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <section id="tasks" className="section auth-section">
    <p className="eyebrow">$ auth --jwt</p>
    <h2 className="section-title">{mode === 'register' ? 'Register' : 'Log In'}</h2>
    <form className="auth-form" onSubmit={submit}>
      <label htmlFor="auth-email">Email</label>
      <input id="auth-email" type="email" autoComplete="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="auth-password">Password</label>
      <input id="auth-password" type="password" minLength="8" maxLength="128" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder="Password (min 8 characters)" required value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Please wait...' : mode === 'register' ? 'Register' : 'Log In'}</button>
      {error && <p className="auth-error" role="alert">{error}</p>}
      {info && <p className="auth-info" role="status">{info}</p>}
    </form>
    <p className="auth-switch">{mode === 'register' ? 'Already have an account?' : "Don't have an account?"} <button type="button" onClick={() => {setMode(mode === 'register' ? 'login' : 'register');setError('');setInfo('');}}>{mode === 'register' ? 'Log In' : 'Register'}</button></p>
  </section>;
}
