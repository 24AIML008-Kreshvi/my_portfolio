import { useEffect, useState } from 'react';
import Auth from './Auth';
import Tasks from './Tasks';
import { getToken, me, setToken, setUnauthorizedHandler } from '../api';
export default function TaskGate() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(Boolean(getToken()));
  useEffect(() => {
    let active = true;
    const reset = () => { if (active) setUser(null); };
    setUnauthorizedHandler(reset);
    if (getToken()) {
      me().then(profile => {if (active) setUser(profile);})
        .catch(() => { if (active) setToken(''); })
        .finally(() => { if (active) setChecking(false); });
    }
    return () => { active = false; setUnauthorizedHandler(() => {}); };
  }, []);
  if (checking) return <section id="tasks" className="section"><p>Verifying login...</p></section>;
  if (!user) return <Auth onLoggedIn={setUser}/>;
  return <><div className="auth-session"><span>Signed in: {user.email}</span><button type="button" onClick={() => {setToken('');setUser(null);}}>Log Out</button></div><Tasks /></>;
}
