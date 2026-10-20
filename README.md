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


## AWDF Practical 6 — Full Stack Integration

This portfolio now has a **My Tasks** React section connected to the MongoDB-backed Express REST API from [task-manager-api-24AIML008](https://github.com/24AIML008-Kreshvi/task-manager-api-24AIML008).

1. Start MongoDB Community Server locally.
2. In the backend project, create `.env` with `MONGO_URI=mongodb://127.0.0.1:27017/awdf_tasks` and run `npm install`, `npm start` on port **5000**.
3. In this portfolio project, run `npm install`, then `npm run dev` and open **http://localhost:5173**.
4. Click **Tasks** in the navigation bar. The UI fetches tasks from the backend, with create/update/delete, optimistic creation, confirmations, loading states, and notifications.
5. To demonstrate an error, stop the backend and click **Retry** in the Tasks section.

If the API is at a different address, add a local `.env` with `VITE_API_URL=http://localhost:5000`. Do not put passwords or database credentials in frontend environment variables.

**Screenshot flow:** start both servers; show empty database; create task; add 3 more; mark 2 complete; show confirmation dialog; delete one and verify database; stop backend and show network error.
