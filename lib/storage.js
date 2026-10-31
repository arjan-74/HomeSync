const fs = require("fs");
const path = require("path");

const dataDir = process.env.DATA_DIR || path.join(__dirname, "..", "data");

function filePathFor(name) {
  return path.join(dataDir, `${name}.json`);
}

function readRecords(name) {
  const file = filePathFor(name);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Write to a temp file first so a crash mid-write cannot leave a broken JSON file.
function writeRecords(name, records) {
  fs.mkdirSync(dataDir, { recursive: true });
  const file = filePathFor(name);
  const tempFile = `${file}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(records, null, 2));
  fs.renameSync(tempFile, file);
}

module.exports = { readRecords, writeRecords };
