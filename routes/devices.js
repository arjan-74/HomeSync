const express = require("express");
const crypto = require("crypto");

const { readRecords, writeRecords } = require("../lib/storage");
const { checkText } = require("../lib/validate");

const router = express.Router();

// Return every device currently stored.
router.get("/", (req, res) => {
  res.json(readRecords("devices"));
});

// Add a new device. It always starts in the off state.
router.post("/", (req, res) => {
  const { name, room, type } = req.body;

  const error =
    checkText(name, "Device name", 40) ||
    checkText(room, "Room", 40) ||
    checkText(type, "Device type", 30);
  if (error) return res.status(400).json({ error });

  const devices = readRecords("devices");

  const device = {
    id: crypto.randomUUID(),
    name: name.trim(),
    room: room.trim(),
    type: type.trim(),
    isOn: false,
    createdAt: new Date().toISOString(),
  };

  devices.push(device);
  writeRecords("devices", devices);

  res.status(201).json(device);
});

// Toggle a device on or off. The body must include isOn as a boolean.
router.patch("/:id", (req, res) => {
  if (typeof req.body.isOn !== "boolean") {
    return res.status(400).json({ error: "isOn must be true or false" });
  }

  const devices = readRecords("devices");
  const device = devices.find((item) => item.id === req.params.id);

  if (!device) {
    return res.status(404).json({ error: "Device not found" });
  }

  device.isOn = req.body.isOn;
  writeRecords("devices", devices);

  res.json(device);
});

// Remove a device by its id.
router.delete("/:id", (req, res) => {
  const devices = readRecords("devices");
  const remaining = devices.filter((item) => item.id !== req.params.id);

  if (remaining.length === devices.length) {
    return res.status(404).json({ error: "Device not found" });
  }

  writeRecords("devices", remaining);
  res.status(204).end();
});

module.exports = router;
