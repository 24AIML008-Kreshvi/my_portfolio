import './App.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  // Shared data lives here in App and flows down via props.
  const studentName = 'Kreshvi Donga';
  const email = 'kreshvi.donga@example.com';

  const heroStats = [
    { value: '6+', label: 'Projects Built' },
    { value: '2+', label: 'Hackathons' },
    { value: '1', label: 'Internship' },
  ];

  const skillList = [
    'React', 'JavaScript', 'Python', 'FastAPI', 'Flask', 'MongoDB',
    'Firebase', 'Gemini API', 'Claude API', 'Git & GitHub',
  ];

  const bio =
    "I'm an AIML student at CSPIT, CHARUSAT. I recently completed a summer internship at " +
    "Esparse Matrix Solutions, and alongside coursework I build full-stack, AI-powered projects " +
    "— from civic issue reporting platforms to RAG-based chatbots. I like the part of building " +
    "where a feature that was broken an hour ago finally renders correctly.";

  return (
    <div className="app">
      <NavBar initials="KD" />
      <Header
        name={studentName}
        role="AIML Engineer · Builder · Designer"
        tagline="Turning ideas into working AI products, one build at a time."
        location="Vadodara, India"
        stats={heroStats}
      />
      <main>
        <About bio={bio} />
        <Skills skillList={skillList} />
        <Projects />
      </main>
      <Footer name={studentName} email={email} />
    </div>
  );
}

export default App;
