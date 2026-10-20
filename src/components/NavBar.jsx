import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'contact', label: 'Contact' },
];

function NavBar({ initials }) {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      let current = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button className="logo" onClick={() => goTo('home')} aria-label="Scroll to top">
          {initials}<span className="cursor">_</span>
        </button>
        <ul className="nav-list">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                className={active === s.id ? 'nav-item active' : 'nav-item'}
                onClick={() => goTo(s.id)}
              >
                <span className="nav-index">{String(i + 1).padStart(2, '0')}.</span> {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
