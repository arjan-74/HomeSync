# Project memory

## Product intent & audience

- HomeSync: smart home management web app (dashboard, rooms, devices, settings)
- Academic project with 2nd evaluation requirements: multiple linked pages, JS interactions (forms w/ validation, event handling, UX), form submission, saving data to local JSON files
- Must show commits from three different GitHub contributors

## Brand personality & voice

- Educational/explanatory tone: user wants to learn concepts as we build (line-by-line explanations)

## Visual design & UX direction

- Dark mode toggle and °C/°F unit toggle exist in UI but are non-functional (interaction wins to wire up)
- Shared sidebar navigation across all pages
- Shared style.css; contributors add styles in labelled blocks at bottom to avoid conflicts

## Decisions, constraints & rationale

- Current repo: single-page app (index.html) swapping 4 sections via JS + style.css; no backend, forms, or validation yet
- Plan: split into separate HTML pages (index, rooms, devices, settings, login, contact) with real `<a href>` nav — satisfies "additional pages linked together"
- Proposed structure: `js/` (common, devices, rooms, settings, auth, contact), `data/` (devices.json, rooms.json, users.json, messages.json, each starts as `[]`), `server.js` (Express), `package.json`
- **Unresolved:** Backend approach — local Node/Express (literal "local JSON" requirement, works only via local `npm start`) vs Supabase (works in Bolt preview, hosted DB). User must confirm course allows Node and decide. Currently leaning Node/Express per evaluation wording.
- Three-person split by file ownership to minimize conflicts:
  - A: server.js, data/*.json, page split, nav, common.js
  - B: devices.html/js, rooms.html/js (add device/room forms, validation, toggle, search/filter, delete w/ confirm)
  - C: login.html, settings.html, contact.html (auth forms w/ email regex + password strength, edit profile, contact form, wire up dark mode + °C/°F)
- Vercel deploy has read-only filesystem; JSON saving only works locally
- AI cannot make commits on behalf of teammates; each person works in own clone/branch

## Open questions & assumptions

- Is Node/Express allowed by the course, or restricted to plain HTML/CSS/JS?
- Names and GitHub handles of the three contributors not yet provided
- Backend choice (local Node server vs Supabase) pending user decision
- Assumes instructor will accept local-only demo for JSON file saving