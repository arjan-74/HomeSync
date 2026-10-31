const express = require("express");
const crypto = require("crypto");
const { readRecords, writeRecords } = require("../lib/storage");
const { checkText, checkEmail, checkPassword } = require("../lib/validate");
const { hashPassword, verifyPassword } = require("../lib/password");

const router = express.Router();

// Never send the password hash back to the browser.
function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

function findByEmail(users, email) {
  const wanted = email.trim().toLowerCase();
  return users.find((user) => user.email === wanted);
}

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const error = checkText(name, "Name", 60) || checkEmail(email) || checkPassword(password);
  if (error) return res.status(400).json({ error });

  const users = readRecords("users");
  if (findByEmail(users, email)) {
    return res.status(409).json({ error: "An account with this email already exists" });
  }

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeRecords("users", users);
  res.status(201).json(publicUser(user));
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (checkEmail(email) || typeof password !== "string" || !password) {
    return res.status(400).json({ error: "Enter your email and password" });
  }

  const user = findByEmail(readRecords("users"), email);
  const passwordMatches = user && (await verifyPassword(password, user.passwordHash));
  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json(publicUser(user));
});

// Changing the profile requires the current password, since there are no login sessions yet.
router.patch("/:id", async (req, res) => {
  const { name, email, currentPassword } = req.body;
  const error = checkText(name, "Name", 60) || checkEmail(email);
  if (error) return res.status(400).json({ error });

  const users = readRecords("users");
  const user = users.find((item) => item.id === req.params.id);
  if (!user) return res.status(404).json({ error: "Account not found" });

  if (typeof currentPassword !== "string" || !(await verifyPassword(currentPassword, user.passwordHash))) {
    return res.status(401).json({ error: "Current password is incorrect" });
  }

  const newEmail = email.trim().toLowerCase();
  const emailTaken = users.some((item) => item.email === newEmail && item.id !== user.id);
  if (emailTaken) {
    return res.status(409).json({ error: "An account with this email already exists" });
  }

  user.name = name.trim();
  user.email = newEmail;
  writeRecords("users", users);
  res.json(publicUser(user));
});

module.exports = router;
