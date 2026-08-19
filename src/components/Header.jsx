function Header({ name, role, tagline, location, stats }) {
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  return (
    <header id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-main">
          <p className="badge">
            <span className="badge-dot" /> Available for internships &middot; {location}
          </p>

          <h1 className="hero-name">
            <span className="line">{firstName}</span>
            <span className="line accent">{lastName}<span className="cursor">_</span></span>
          </h1>

          <p className="hero-role">{role}</p>
          <p className="hero-tagline">{tagline}</p>

          <div className="hero-cta">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See my work &rarr;
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in touch
            </button>
          </div>
        </div>

        <div className="hero-stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-cue">
        <span className="scroll-line" />
        scroll to explore
      </div>
    </header>
  );
}

export default Header;
