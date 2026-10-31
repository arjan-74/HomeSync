const express = require("express");
const crypto = require("crypto");
const { readRecords, writeRecords } = require("../lib/storage");
const { checkText, checkEmail } = require("../lib/validate");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(readRecords("messages"));
});

router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;
  const error =
    checkText(name, "Name", 60) ||
    checkEmail(email) ||
    checkText(subject, "Subject", 100) ||
    checkText(message, "Message", 2000);
  if (error) return res.status(400).json({ error });

  const messages = readRecords("messages");
  const entry = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  messages.push(entry);
  writeRecords("messages", messages);
  res.status(201).json(entry);
});

module.exports = router;
