const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.get("/", (req, res) => {
    res.send("Server running");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 🔥 users object
let users = {};
let rooms = {};

wss.on("connection", (ws) => {
    console.log("User connected");

    ws.username = "";

    ws.on("message", (message) => {
        const msg = message.toString();

        // set username
        if (ws.username === "") {
            ws.username = msg;
            users[ws.username] = ws;
            console.log("Username set:", ws.username);
            return;
        }

        console.log("Received:", msg);

        // 🔥 private message
        const [toUser, text] = msg.split(":");

        if (users[toUser]) {
            users[toUser].send(ws.username + ": " + text);
        }
    });

    ws.on("close", () => {
        delete users[ws.username];
        console.log("User disconnected:", ws.username);
    });
});

server.listen(8000, () => {
    console.log("Server started on port 8000");
});