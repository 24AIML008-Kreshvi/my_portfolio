# Kreshvi Donga — Student Portfolio (React + Vite)

Practical 1: Introduction to React and Component Architecture
(ITUE301 - Advanced Web Development Frameworks)

## Design
A single-page, dark, terminal-inspired portfolio: sticky numbered nav with
scrollspy, a hero with a status badge and stats panel, and monospace
"$ command" eyebrows introducing each section (About / Skills / Projects /
Contact) to tie the visual language to an AIML/engineering identity.

## Components (`src/components/`)
- `NavBar.jsx` — sticky nav, highlights the active section on scroll (supplementary)
- `Header.jsx` — hero section; receives `name`, `role`, `tagline`, `location`, `stats` as props
- `About.jsx` — receives `bio` as a prop
- `Skills.jsx` — receives `skillList` array as a prop, renders tags dynamically (supplementary)
- `Projects.jsx` — hardcoded list of 3 projects (assignment task)
- `Footer.jsx` — contact section; receives `name`, `email` as props

All shared data (name, stats, skills, bio, email) is owned by `App.jsx` and
passed down via props — satisfying the "props into a minimum of 2 components"
requirement (here it flows into Header, Skills, and Footer).

## How to run
```bash
npm install
npm run dev
```
Then open the printed local URL (usually http://localhost:5173).

## Project structure
```
src/
  components/
    NavBar.jsx
    Header.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    Footer.jsx
  App.jsx
  App.css
  main.jsx
  index.css
```

## Before submitting
- Update the GitHub/LinkedIn links in `Footer.jsx` and the email in `App.jsx`
  with your real ones.
- Edit the `projects` array in `Projects.jsx` with your actual projects.
- Push to a public GitHub repo named `portfolio-<rollno>` with a
  proper `.gitignore` (node_modules excluded — already set up by Vite)
  and a meaningful commit message.
