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

    // 🧱 STEP 1 — JOIN ROOM WITH USERNAME
    if (msg.startsWith("join:")) {
      const [, code, username] = msg.split(":");

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
    const [code, text] = msg.split(":");

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

server.listen(8000, () => {
  console.log("Server running on port 8000");
});