# HomeSync

HomeSync is a smart home web app for managing rooms, devices and settings.

## Team

- Arjan Khandelwal (https://github.com/arjan-74/)
- Chahat Yadav (https://github.com/chahatyadav25cse-ship-it)
- Trisha Alankar (https://github.com/trishaalankar19)

## Running the backend

The backend saves everything to JSON files in the `data` folder, so it has to run on your own computer.

```
npm install
npm start
```

The server starts on http://localhost:3000. Two optional settings:

- `PORT`: the port to listen on (default 3000)
- `CLIENT_ORIGIN`: the website address allowed to call the API (default: any address)

Set `DATA_DIR` to store the JSON files somewhere else.

## API

All request and response bodies are JSON.

| Method | Route | What it does |
| --- | --- | --- |
| GET | /api/devices | List all devices |
| POST | /api/devices | Add a device (`name`, `room`, `type`) |
| PATCH | /api/devices/:id | Turn a device on or off (`isOn`) |
| DELETE | /api/devices/:id | Remove a device |
| GET | /api/rooms | List rooms with their device counts |
| POST | /api/rooms | Add a room (`name`) |
| DELETE | /api/rooms/:id | Remove a room |
| POST | /api/users/signup | Create an account (`name`, `email`, `password`) |
| POST | /api/users/login | Log in (`email`, `password`) |
| PATCH | /api/users/:id | Change name or email (`name`, `email`, `currentPassword`) |
| GET | /api/messages | List contact messages |
| POST | /api/messages | Send a contact message (`name`, `email`, `subject`, `message`) |

Errors come back as `{ "error": "message" }` with a matching status code.

## Notes

- Passwords are hashed with scrypt and are never returned by the API.
- Changing a profile requires the current password. Login sessions are not implemented yet.
