const express = require("express");
const crypto = require("crypto");
const { readRecords, writeRecords } = require("../lib/storage");
const { checkText } = require("../lib/validate");

const router = express.Router();

router.get("/", (req, res) => {
  const devices = readRecords("devices");
  const rooms = readRecords("rooms").map((room) => ({
    ...room,
    deviceCount: devices.filter((device) => device.room === room.name).length,
  }));
  res.json(rooms);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const error = checkText(name, "Room name", 40);
  if (error) return res.status(400).json({ error });

  const rooms = readRecords("rooms");
  const trimmed = name.trim();
  if (rooms.some((room) => room.name.toLowerCase() === trimmed.toLowerCase())) {
    return res.status(409).json({ error: "A room with this name already exists" });
  }

  const room = {
    id: crypto.randomUUID(),
    name: trimmed,
    createdAt: new Date().toISOString(),
  };
  rooms.push(room);
  writeRecords("rooms", rooms);
  res.status(201).json({ ...room, deviceCount: 0 });
});

router.delete("/:id", (req, res) => {
  const rooms = readRecords("rooms");
  const remaining = rooms.filter((room) => room.id !== req.params.id);
  if (remaining.length === rooms.length) {
    return res.status(404).json({ error: "Room not found" });
  }

  writeRecords("rooms", remaining);
  res.status(204).end();
});

module.exports = router;
