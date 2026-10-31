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
- AI assistant built backend; only Arjan's name goes on backend commits; teammates handle their own work
- Deploy target: Vercel (frontend currently live at homesync-lovat.vercel.app); Render no longer used
- Vercel limitation: cannot persist JSON file writes between visits; live site cannot save data as-is
- For evaluation: backend must run locally with `npm start`; website points at local backend
- Backend stack: Express + cors; dependencies installed (package.json, package-lock.json)
- Backend files: server.js, data/*.json (devices, rooms, users, messages), helpers (storage, validation, password)
- Password hashing: Node built-in scrypt; JSON never stores readable passwords
- All endpoints tested locally: signup, login, devices CRUD, rooms CRUD, contact messages, profile edits
- Profile edits require current password (no sessions yet); sessions + login rate limiting = next security step
- CORS origin configurable via `CLIENT_ORIGIN` env var
- README written with team names, run instructions, full API route list
- Three-person split:
  - Arjan Khandelwal (github.com/arjan-74): backend, AI-assisted, his commits only — server.js, data/*.json, package.json
  - Chahat Yadav (github.com/chahatyadav25cse-ship-it): frontend (specific pages TBD)
  - Trisha Alankar (github.com/trishaalankar19): frontend (specific pages TBD)
- Original planned split for frontend: B = devices.html/js, rooms.html/js; C = login.html, settings.html, contact.html — unconfirmed who takes which
- Record fields:
  - Devices: name, room, type, on/off status
  - Rooms: name, number of devices
  - Users: name, email, hashed password
  - Contact messages: name, email, subject, message

## Open questions & assumptions

- Express allowed by course (assumed yes; user did not object)
- Which teammate (Chahat or Trisha) takes devices/rooms vs accounts/settings — not yet confirmed
- Whether evaluator requires the live Vercel site to save data (if so, need different storage option)
- Persistent storage on Vercel needed for long-term data retention (free tier resets)
- Frontend not yet split into separate HTML pages (frontend team's task)
- Assumes instructor will accept demo where JSON saving works locally but not on Vercel
- Sessions + login rate limiting deferred ("later")