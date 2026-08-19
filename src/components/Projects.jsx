function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Civic Voice',
      description:
        'Full-stack AI-powered civic issue reporting platform with an autonomous agent pipeline for duplicate detection, priority scoring, and dispatch notes.',
      tags: ['React', 'TypeScript', 'Express', 'Gemini API'],
    },
    {
      id: 2,
      title: 'VidSnap AI',
      description:
        'AI video reel generation tool that turns long-form input into short, captioned reels automatically — built during a summer internship.',
      tags: ['FastAPI', 'Flask', 'MongoDB Atlas', 'FFmpeg'],
    },
    {
      id: 3,
      title: 'Student Portfolio',
      description:
        'This site — a React + Vite portfolio built from independently structured, reusable components with props-based data flow.',
      tags: ['React', 'Vite', 'CSS'],
    },
  ];

  return (
    <section id="projects" className="section">
      <p className="eyebrow">$ cat ./projects.log</p>
      <h2 className="section-title">Projects</h2>
      <div className="project-grid">
        {projects.map((p) => (
          <article className="project-card" key={p.id}>
            <h3>
              <span className="prompt">&gt;</span> {p.title}
            </h3>
            <p>{p.description}</p>
            <div className="project-tags">
              {p.tags.map((t) => (
                <span className="project-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
