function Footer({ name, email }) {
  return (
    <footer id="contact" className="footer">
      <p className="eyebrow">$ contact --init</p>
      <h2 className="section-title">Contact</h2>
      <p className="footer-text">Open to internships, hackathon teams, and interesting side projects.</p>

      <div className="footer-links">
        <a href={`mailto:${email}`} className="footer-link">
          &#9993; Email
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer-link">
          GitHub
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="footer-link">
          LinkedIn
        </a>
      </div>

      <p className="footer-copy">
        &copy; {new Date().getFullYear()} {name} &middot; CSPIT, CHARUSAT &middot; Built with React + Vite
      </p>
    </footer>
  );
}

export default Footer;
