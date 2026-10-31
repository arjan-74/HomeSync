# Project memory

## Product intent & audience

- HomeSync: smart home management web app (dashboard, rooms, devices, settings)
- Academic project with 2nd evaluation requirements: multiple linked pages, JS interactions (forms w/ validation, event handling, UX), form submission, saving data to local JSON files
- Must show commits from three different GitHub contributors

## Brand personality & voice

- Educational/explanatory tone: user wants to learn concepts as we build (line-by-line explanations)
- User prefers code that reads as human-written ("less AI"); keep it plain and short

## Visual design & UX direction

- Dark mode toggle and °C/°F unit toggle exist in UI but are non-functional (interaction wins to wire up)
- Shared sidebar navigation across all pages
- Shared style.css; contributors add styles in labelled blocks at bottom to avoid conflicts

## Decisions, constraints & rationale

- JSON file saving is a mandatory requirement (confirmed)
- AI assistant built backend; only user's name goes on backend commits; teammates handle their own work
- Deploy target: Render (user chose Render over Vercel)
- Render free tier has read-only filesystem on restart/redeploy → JSON saving won't persist without paid persistent disk; acceptable for demo
- Backend stack: Express + cors; dependencies installed (package.json, package-lock.json)
- Backend files: server.js, data/*.json (devices, rooms, users, messages), helpers (storage, validation, password)
- Password hashing: Node built-in scrypt; JSON never stores readable passwords
- All endpoints tested locally: signup, login, devices CRUD, rooms CRUD, contact messages, profile edits
- Profile edits require current password (no sessions yet); sessions + login rate limiting = next security step
- CORS origin configurable via `CLIENT_ORIGIN` env var on Render
- Three-person split by file ownership:
  - A (backend, AI-assisted, user's commits only): server.js, data/*.json, package.json
  - B: devices.html/js, rooms.html/js (forms, validation, toggle, search/filter, delete w/ confirm)
  - C: login.html, settings.html, contact.html (auth forms, edit profile, contact form, wire up dark mode + °C/°F)
- Record fields:
  - Devices: name, room, type, on/off status
  - Rooms: name, number of devices
  - Users: name, email, hashed password
  - Contact messages: name, email, subject, message

## Open questions & assumptions

- Express allowed by course (assumed yes; user did not object)
- Names and GitHub handles of the three contributors not yet provided
- User's name needed for commit attribution and deploy docs
- Render service URL needed to write deploy steps
- Persistent disk on Render needed for long-term data retention (free tier resets)
- Frontend not yet split into separate HTML pages (frontend team's task)
- Assumes instructor will accept demo where JSON saving works but may reset on Render restart