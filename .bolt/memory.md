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

- JSON file saving is a mandatory requirement (confirmed)
- AI assistant is building backend only; the three people are handling the frontend
- Current repo: single-page app (index.html) swapping 4 sections via JS + style.css; frontend team will split into separate HTML pages
- Proposed backend structure: `server.js` (Express), `data/` (devices.json, rooms.json, users.json, messages.json, each starts as `[]`), `package.json`
- Three-person split by file ownership to minimize conflicts:
  - A (backend, AI-assisted): server.js, data/*.json, package.json
  - B: devices.html/js, rooms.html/js (forms, validation, toggle, search/filter, delete w/ confirm)
  - C: login.html, settings.html, contact.html (auth forms, edit profile, contact form, wire up dark mode + °C/°F)
- Vercel deploy has read-only filesystem; JSON saving only works locally via `npm start`
- AI cannot make commits on behalf of teammates; each person works in own clone/branch
- Proposed record fields (pending user confirmation):
  - Devices: name, room, type, on/off status
  - Rooms: name, number of devices
  - Users: name, email, hashed password
  - Contact messages: name, email, subject, message
- Password hashing recommended (default: yes) so JSON never holds readable passwords

## Open questions & assumptions

- Is Node.js with Express allowed by the course, or must it be plain Node without installs? (default proposed: Express)
- Names and GitHub handles of the three contributors not yet provided
- Where should backend code live — Bolt project synced to GitHub, or local clone? (default proposed: Bolt project → main)
- Record field schemas pending user confirmation (defaults proposed above)
- Password hashing approach pending user confirmation (default: yes)
- Assumes instructor will accept local-only demo for JSON file saving