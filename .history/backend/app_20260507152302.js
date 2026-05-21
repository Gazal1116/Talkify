const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.get("/", (req, res) => {
  res.send("Server running");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 🔥 rooms with username
let rooms = {}; 
// { ROOM1: [ { ws, username } ] }

wss.on("connection", (ws) => {
  console.log("User connected");

  ws.room = null;
  ws.username = "";

  ws.on("message", (message) => {
    const msg = message.toString();

    //JOIN ROOM WITH USERNAME
    if (msg.startsWith("join:")) {
      const [, rawCode, rawUsername] = msg.split(":");
      const code = rawCode.trim();
      const username = rawUsername.trim();

      if (!rooms[code]) {
        rooms[code] = [];
      }

      ws.room = code;
      ws.username = username;

      rooms[code].push({ ws, username });

      console.log(username + " joined " + code);

      return;
    }

    // 🧱 STEP 2 — SEND MESSAGE
    const [rawCode, ...textParts] = msg.split(":");
    const code = rawCode.trim();
    const text = textParts.join(":");

    if (rooms[code]) {
      rooms[code].forEach((client) => {
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.send(ws.username + ": " + text);
        }
      });
    }
  });

  // 🧱 STEP 3 — HANDLE DISCONNECT
  ws.on("close", () => {
    if (ws.room && rooms[ws.room]) {
      rooms[ws.room] = rooms[ws.room].filter(
        (client) => client.ws !== ws
      );

      if (rooms[ws.room].length === 0) {
        delete rooms[ws.room];
      }

      console.log("User left:", ws.username);
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});