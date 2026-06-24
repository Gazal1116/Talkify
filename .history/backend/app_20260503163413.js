const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.get("/", (req, res) => {
    res.send("Server running");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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

        // 🔥 JOIN ROOM
        if (msg.startsWith("join:")) {
            const room = msg.split(":")[1];

            if (!rooms[room]) {
                rooms[room] = [];
            }

            rooms[room].push(ws.username);

            console.log(ws.username + " joined " + room);
            return;
        }

        // 🔥 ROOM MESSAGE
        if (msg.includes(":")) {
            const [room, text] = msg.split(":");

            if (rooms[room]) {
                rooms[room].forEach(user => {
                    if (users[user]) {
                        users[user].send(ws.username + ": " + text);
                    }
                });
            }
        }
    });

    ws.on("close", () => {
        delete users[ws.username];

        // remove user from rooms
        for (let room in rooms) {
            rooms[room] = rooms[room].filter(u => u !== ws.username);
        }

        console.log("User disconnected:", ws.username);
    });
});

server.listen(8000, () => {
    console.log("Server started on port 8000");
});