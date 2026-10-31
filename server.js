const express = require("express");
const cors = require("cors");
const devicesRouter = require("./routes/devices");
const roomsRouter = require("./routes/rooms");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({ status: "HomeSync API is running" });
});

app.use("/api/devices", devicesRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", usersRouter);
app.use("/api/messages", messagesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Request body must be valid JSON" });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request is too large" });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(port, () => {
  console.log(`HomeSync API listening on port ${port}`);
});
