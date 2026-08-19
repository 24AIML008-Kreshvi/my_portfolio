function About({ bio }) {
  return (
    <section id="about" className="section">
      <p className="eyebrow">$ whoami</p>
      <h2 className="section-title">About</h2>
      <p className="about-text">{bio}</p>
    </section>
  );
}

export default About;
