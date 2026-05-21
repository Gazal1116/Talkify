const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

// simple route
app.get("/", (req, res) => {
  res.send("Server running");
});

// create server
const server = http.createServer(app);

// websocket server
const wss = new WebSocket.Server({ server });

// 🔥 store users
let users = {}; // { username: socket }

wss.on("connection", (ws) => {
  console.log("User connected");

  ws.username = "";

  ws.on("message", (message) => {
    const msg = message.toString();

    // 🧱 STEP 1 — set username
    if (ws.username === "") {
      ws.username = msg;
      users[ws.username] = ws;

      console.log("Username set:", ws.username);
      return;
    }

    console.log("Received:", msg);

    // 🧱 STEP 2 — private message (format: B:hello)
    const [toUser, text] = msg.split(":");

    if (users[toUser]) {
      users[toUser].send(ws.username + ": " + text);
    } else {
      console.log("User not found:", toUser);
    }
  });

  // 🧱 STEP 3 — handle disconnect
  ws.on("close", () => {
    delete users[ws.username];
    console.log("User disconnected:", ws.username);
  });
});

// start server
server.listen(5000, () => {
  console.log("Server running on port 5000");
});