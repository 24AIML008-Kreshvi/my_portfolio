function Skills({ skillList }) {
  return (
    <section id="skills" className="section">
      <p className="eyebrow">$ ls ./skills</p>
      <h2 className="section-title">Skills</h2>
      <div className="skill-tags">
        {skillList.map((skill) => (
          <span className="skill-tag" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;
